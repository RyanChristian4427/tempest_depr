use crate::db::Conn;
use crate::models::user::User;
use crate::schema::{users, user_options};

use crypto::scrypt::{scrypt_check, scrypt_simple, ScryptParams};
use diesel::prelude::*;
use diesel::result::{DatabaseErrorKind, Error};

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub email: &'a str,
    pub hashed_password: &'a str,
}

#[derive(Insertable)]
#[table_name = "user_options"]
pub struct NewUserOptions<'a> {
    pub user_id: &'a i32,
    pub emails_per_page: &'a i32,
}

pub enum UserCreationError {
    DuplicatedEmail,
}

impl From<Error> for UserCreationError {
    fn from(err: Error) -> UserCreationError {
        if let Error::DatabaseError(DatabaseErrorKind::UniqueViolation, info) = &err {
            match info.constraint_name() {
                Some("unique_email") => return UserCreationError::DuplicatedEmail,
                _ => {}
            }
        }
        panic!("Error creating user: {:?}", err)
    }
}

pub fn register(
    first_name: &str,
    last_name: &str,
    email: &str,
    password: &str,
    conn: Conn,
) -> Result<User, UserCreationError> {
    let hashed_password =
        &scrypt_simple(password, &ScryptParams::new(14, 8, 1)).expect("hash error");

    let new_user = &NewUser {
        first_name,
        last_name,
        email,
        hashed_password,
    };

    conn.transaction(|| {
        let inserted_user = diesel::insert_into(users::table)
            .values(new_user)
            .get_result::<User>(&*conn)?;

        let new_user_options = &NewUserOptions {
            user_id: &inserted_user.id,
            emails_per_page: &50,
        };

        diesel::insert_into(user_options::table)
            .values(new_user_options)
            .execute(&*conn)?;

        users::table
            .filter(users::id.eq(inserted_user.id))
            .get_result::<User>(&*conn)
            .map_err(Into::into)
    })
}

pub fn login(email: &str, password: &str, conn: Conn) -> Option<User> {
    let user = users::table
        .filter(users::email.eq(email))
        .get_result::<User>(&*conn)
        .map_err(|err| eprintln!("login_user: {}", err))
        .ok()?;

    let password_matches = scrypt_check(password, &user.hashed_password)
        .map_err(|err| eprintln!("login_user: scrypt_check: {}", err))
        .ok()?;

    if password_matches {
        Some(user)
    } else {
        eprintln!(
            "login attempt for '{}' failed: password doesn't match",
            email
        );
        None
    }
}
