use crate::db::{email_repository, user_options_repository, Conn};
use crate::models::email::EmailJson;
use crate::models::user_options::UserOptions;

pub fn get_options(user_id: i32, conn: Conn) -> Option<UserOptions> {
    user_options_repository::get_options(user_id, conn)
}

pub fn get_inbox(user_id: i32, conn: Conn) -> Option<Vec<EmailJson>> {
    let email_list = email_repository::get_emails(user_id, conn).unwrap();
    if !email_list.is_empty() {
        Some(
            email_list
                .into_iter()
                .map(|email| email.to_email_json())
                .collect(),
        )
    } else {
        None
    }
}
