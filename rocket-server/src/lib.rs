#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
extern crate rocket_cors;
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate validator_derive;

mod api;
mod config;
mod db;
mod errors;
mod models;
mod schema;
mod services;

use rocket::{Rocket, Route, http::Method};
use rocket_contrib::json::JsonValue;
use rocket_cors::{AllowedOrigins, AllowedHeaders};
use validator;

#[catch(404)]
fn not_found() -> JsonValue {
    json!({
        "status": "error",
        "reason": "Resource was not found."
    })
}

fn rocket_instance(mounts: Vec<(&str, Vec<Route>)>) -> Rocket {
    let mut instance = rocket::ignite();

    for (path, methods) in mounts {
        instance = instance.mount(path, methods);
    }

    instance
        .attach(db::Conn::fairing())
        .attach(cors())
        .register(catchers![not_found])
}

fn mounts() -> Vec<(&'static str, Vec<Route>)> {
    vec![("/api/v1", api::v1::routes())]
}

fn cors() -> rocket_cors::Cors {
    let (allowed_origins, _failed_origins) = AllowedOrigins::some(&["https://localhost:8080", "https://192.168.0.*:8080"]);

    // You can also deserialize this
    rocket_cors::Cors {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept", "Content-Type"]),
        allow_credentials: true,
        ..Default::default()
    }
}

pub fn rocket() -> rocket::Rocket {
    rocket_instance(mounts())
}
