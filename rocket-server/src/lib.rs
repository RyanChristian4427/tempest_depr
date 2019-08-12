#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;

mod api;
mod auth;
mod db;
mod config;
mod models;
mod schema;
mod services;

use rocket::{Rocket, Route};
use rocket_contrib::json::JsonValue;

#[catch(404)]
fn not_found() -> JsonValue {
    json!({
        "status": "error",
        "reason": "Resource was not found."
    })
}

pub(crate) fn rocket_instance(mounts: Vec<(&str, Vec<Route>)>) -> Rocket {
    let mut instance = rocket::ignite();

    for (path, methods) in mounts {
        instance = instance.mount(path, methods);
    }
    instance.attach(db::Conn::fairing())
            .attach(rocket_cors::Cors::default())
            .register(catchers![not_found])
}

fn mounts() -> Vec<(&'static str, Vec<Route>)> {
    vec![("/api/v1", api::v1::routes())]
}

pub fn rocket() -> rocket::Rocket {
    rocket_instance(mounts())
}