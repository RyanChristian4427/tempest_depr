use chrono::{DateTime, Duration, Utc};
use rocket::config::{Config, Environment, Value};
use rocket::fairing::AdHoc;
use std::collections::HashMap;
use std::env;

pub const DATE_FORMAT: &str = "%Y-%m-%dT%H:%M:%S%.3fZ";

/// Debug only secret for JWT encoding & decoding.
#[cfg(debug_assertions)]
pub const SECRET: &str = "XK6EH:M<G~k8l[iYw/1=0*RznX*P$7WU";

pub const TOKEN_PREFIX: &str = "Bearer ";

pub fn token_expire_time() -> DateTime<Utc> {
    Utc::now() + Duration::days(60)
}

pub struct AppState {
    pub secret: Vec<u8>,
}

impl AppState {
    pub fn manage() -> AdHoc {
        AdHoc::on_attach("Manage config", |rocket| {
            let secret = env::var("SECRET_KEY").unwrap_or_else(|err| {
                if cfg!(debug_assertions) {
                    SECRET.to_string()
                } else {
                    panic!("No SECRET_KEY environment variable found: {:?}", err)
                }
            });

            Ok(rocket.manage(AppState {
                secret: secret.into_bytes(),
            }))
        })
    }
}

/// Create rocket config from environment variables
pub fn from_env() -> Config {
    let environment = Environment::active().expect("No environment found");

    let port = env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse::<u16>()
        .expect("PORT environment variable should parse to an integer");

    let mut database_config = HashMap::new();
    let mut databases = HashMap::new();
    let database_url =
        env::var("DATABASE_URL").expect("No DATABASE_URL environment variable found");
    database_config.insert("url", Value::from(database_url));
    databases.insert("diesel_postgres_pool", Value::from(database_config));

    Config::build(environment)
        .environment(environment)
        .port(port)
        .extra("databases", databases)
        .finalize()
        .unwrap()
}
