use crate::db::user_options_repository;
use crate::models::user_options::UserOptions;

use diesel::pg::PgConnection;

pub fn get_options(user_id: i32, conn: &PgConnection) -> Option<UserOptions> {
    user_options_repository::get_options(user_id, &conn)
}
