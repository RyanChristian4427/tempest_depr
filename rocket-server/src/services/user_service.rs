use crate::db::{user_options_repository, Conn};
use crate::models::user_options::UserOptions;

pub fn get_options(user_id: i32, conn: Conn) -> Option<UserOptions> {
    user_options_repository::get_options(user_id, conn)
}
