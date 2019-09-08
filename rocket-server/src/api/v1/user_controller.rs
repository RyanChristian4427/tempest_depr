use crate::db::Conn;
use crate::errors::Errors;
use crate::services::auth_service::Auth;
use crate::services::user_service;

use rocket_contrib::json::JsonValue;

#[get("/user/options")]
pub fn get_user_options(auth: Option<Auth>, conn: Conn) -> Result<JsonValue, Errors> {
    let user_id = auth
        .map(|auth| auth.id)
        .unwrap_or(-1);
    user_service::get_options(user_id, conn)
        .map(|user_options| json!({ "user_options": user_options.to_user_options_response() }))
        .ok_or_else(|| Errors::new(&[("options for that user", "don't exist")]))
}
