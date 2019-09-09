use crate::config;
use crate::db::{Conn, auth_repository::{self, UserCreationError}};
use crate::models::user::User;

use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::Outcome;
use serde::{Deserialize, Serialize};

use frank_jwt as jwt;
use serde_json;

pub fn register(
    first_name: &str,
    last_name: &str,
    email: &str,
    password: &str,
    conn: Conn,
) -> Result<User, UserCreationError> {
    auth_repository::register(&first_name, &last_name, &email, &password, conn)
}

pub fn login(email: &str, password: &str, conn: Conn) -> Option<User> {
    auth_repository::login(&email, &password, conn)
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Auth {
    pub id: i32,
    pub email: String,
    pub exp: i64,
}

impl Auth {
    pub fn token(&self) -> String {
        let headers = json!({});
        let payload = json!(self);
        jwt::encode(
            headers.0,
            &config::SECRET.to_string(),
            &payload,
            jwt::Algorithm::HS256,
        )
        .expect("jwt")
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for Auth {
    type Error = ();

    /// Extract Auth token from the "Authorization" header.
    ///
    /// Handlers with Auth guard will fail with 503 error.
    /// Handlers with Option<Auth> will be called with None.
    fn from_request(request: &'a Request<'r>) -> request::Outcome<Auth, Self::Error> {
        if let Some(auth) = extract_auth_from_request(request) {
            Outcome::Success(auth)
        } else {
            Outcome::Failure((Status::Forbidden, ()))
        }
    }
}

fn extract_auth_from_request(request: &Request) -> Option<Auth> {
    request
        .headers()
        .get_one("authorization")
        .and_then(extract_token_from_header)
        .and_then(decode_token)
}

fn extract_token_from_header(header: &str) -> Option<&str> {
    if header.starts_with(config::TOKEN_PREFIX) {
        Some(&header[config::TOKEN_PREFIX.len()..])
    } else {
        None
    }
}

/// Decode token into `Auth` struct. If any error is encountered, log it
/// and return None.
fn decode_token(token: &str) -> Option<Auth> {
    jwt::decode(token, &config::SECRET.to_string(), jwt::Algorithm::HS256)
        .map(|(_, payload)| {
            serde_json::from_value::<Auth>(payload)
                .map_err(|err| {
                    eprintln!("Auth serde decode error: {:?}", err);
                })
                .ok()
        })
        .unwrap_or_else(|err| {
            eprintln!("Auth decode error: {:?}", err);
            None
        })
}
