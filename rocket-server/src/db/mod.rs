use rocket_contrib::databases::diesel;

pub mod user_options_repository;
pub mod users_repository;

#[database("diesel_postgres_pool")]
pub struct Conn(diesel::PgConnection);
