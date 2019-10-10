use crate::db::Conn;
use crate::models::email::{Email, EmailJson};
use crate::schema::mailbox_messages;

use diesel::prelude::*;

pub fn get_emails(user_id: i32, conn: Conn) -> Option<Vec<EmailJson>> {
    let result = mailbox_messages::table
        .filter(mailbox_messages::mailbox_id.eq(user_id))
        .get_results::<Email>(&*conn)
        .expect("Cannot find inbox for user");

    if !result.is_empty() {
        Some(
            result
                .into_iter()
                .map(|email| email.to_email_json())
                .collect(),
        )
    } else {
        None
    }
}
