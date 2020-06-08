use crate::api::auth_middleware::Auth;
use crate::db::Conn;
use crate::errors::Errors;
use crate::services::user_service;

use rocket::http::Status;
use rocket_contrib::json::JsonValue;

#[get("/user/options")]
pub fn get_user_options(auth: Option<Auth>, conn: Conn) -> Result<JsonValue, Errors> {
    let user_id = auth.map(|auth| auth.id).unwrap_or(-1);
    user_service::get_options(user_id, conn)
        .map(|user_options| json!({ "user_options": user_options.to_user_options_response() }))
        // 204 is arguable instead of 404, but that would be harder to handle on the front end
        .ok_or_else(|| {
            Errors::new(
                Status::NotFound,
                "options for that user don't exist".to_owned(),
            )
        })
}

#[get("/user/inbox")]
pub fn get_user_inbox(auth: Option<Auth>, conn: Conn) -> Result<JsonValue, Errors> {
    let user_id = auth.map(|auth| auth.id).unwrap_or(-1);
    user_service::get_inbox(user_id, conn)
        .map(|emails| json!({ "inbox": emails }))
        // 204 is arguable instead of 404, but that would be harder to handle on the front end
        .ok_or_else(|| Errors::new(Status::NotFound, "inbox for user doesn't exist".to_owned()))
}
