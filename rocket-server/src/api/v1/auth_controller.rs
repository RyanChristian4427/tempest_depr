use crate::db::{self, users_repository::UserCreationError};
use crate::errors::{Errors, FieldValidator};
use crate::services::auth_service::{login, register};

use rocket_contrib::json::{Json, JsonValue};
use serde::Deserialize;
use validator::Validate;


#[derive(Deserialize)]
pub struct NewUser {
    user: NewUserData,
}

#[derive(Deserialize, Validate)]
struct NewUserData {
    first_name: Option<String>,
    last_name: Option<String>,
    #[validate(email)]
    email: Option<String>,
    #[validate(length(min = "8"))]
    password: Option<String>,
}

#[post("/users/register", format = "json", data = "<new_user>")]
pub fn users_register(new_user: Json<NewUser>, conn: db::Conn) -> Result<JsonValue, Errors> {
    let new_user = new_user.into_inner().user;

    let mut extractor = FieldValidator::validate(&new_user);
    let first_name = extractor.extract("first_name", new_user.first_name);
    let last_name = extractor.extract("last_name", new_user.last_name);
    let email = extractor.extract("email", new_user.email);
    let password = extractor.extract("password", new_user.password);

    extractor.check()?;

    register(&first_name, &last_name, &email, &password, &conn)
        .map(|user| json!({ "user": user.to_user_auth() }))
        .map_err(|error| {
            let _field = match error {
                UserCreationError::DuplicatedEmail => "email",
            };
            Errors::new(&[(_field, "has already been taken")])
        })
}

#[derive(Deserialize)]
pub struct LoginUser {
    user: LoginUserData,
}

#[derive(Deserialize)]
struct LoginUserData {
    email: Option<String>,
    password: Option<String>,
}

#[post("/users/login", format = "json", data = "<user>")]
pub fn users_login(user: Json<LoginUser>, conn: db::Conn) -> Result<JsonValue, Errors> {
    let user = user.into_inner().user;

    let mut extractor = FieldValidator::default();
    let email = extractor.extract("email", user.email);
    let password = extractor.extract("password", user.password);
    extractor.check()?;

    login(&email, &password, &conn)
        .map(|user| json!({ "user": user.to_user_auth() }))
        .ok_or_else(|| Errors::new(&[("email or password", "is invalid")]))
}