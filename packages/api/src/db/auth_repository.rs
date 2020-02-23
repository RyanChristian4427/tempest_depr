use crate::db::Conn;
use crate::models::user::User;
use crate::schema::users;

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

pub enum UserCreationError {
    DuplicatedEmail,
}

impl From<Error> for UserCreationError {
    fn from(err: Error) -> UserCreationError {
        if let Error::DatabaseError(DatabaseErrorKind::UniqueViolation, info) = &err {
            if let Some("unique_email") = info.constraint_name() {
                return UserCreationError::DuplicatedEmail;
            }
        }
        panic!("Error creating user: {:?}", err)
    }
}

pub fn register(
    first_name: &str,
    last_name: &str,
    email: &str,
    hashed_password: &str,
    conn: Conn,
) -> Result<User, UserCreationError> {
    diesel::insert_into(users::table)
        .values(NewUser {
            first_name,
            last_name,
            email,
            hashed_password,
        })
        .get_result::<User>(&*conn)
        .map_err(Into::into)
}

pub fn login(email: &str, conn: Conn) -> Option<User> {
    users::table
        .filter(users::email.eq(email))
        .get_result::<User>(&*conn)
        .ok()
}
