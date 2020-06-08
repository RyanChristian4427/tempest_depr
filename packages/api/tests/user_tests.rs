//! Test individual user functions and data request

mod common;

use rocket::http::Status;

#[test]
/// Try retrieving user options for an existing user
fn test_get_user_options() {
    let client = common::test_client();
    let token = common::login(&client);
    let response = &mut client
        .get("/api/v1/user/options")
        .header(common::token_header(token))
        .dispatch();

    assert_eq!(Status::Ok, response.status());

    let value = common::response_json_value(response);

    assert_eq!(
        Some(50),
        value
            .get("user_options")
            .and_then(|user_options| user_options.get("emails_per_page"))
            .and_then(|emails_per_page| emails_per_page.as_i64())
    );
}

#[test]
/// Try retrieving user options for a non-existent user
fn test_invalid_get_user_options() {
    let client = common::test_client();
    let response = &mut client
        .get("/api/v1/user/options")
        .header(common::token_header(
            common::get_valid_token_of_invalid_user(),
        ))
        .dispatch();

    assert_eq!(Status::NotFound, response.status());

    let value = common::response_json_value(response);
    let success = value.get("success").and_then(|success| success.as_bool());
    let message = value.get("message").and_then(|message| message.as_str());

    assert_eq!(Some(false), success);
    assert_eq!(Some("options for that user don't exist"), message);
}

#[test]
/// Try retrieving an inbox for an existing user
fn test_get_user_inbox() {
    let client = common::test_client();
    let token = common::login(&client);
    let response = &mut client
        .get("/api/v1/user/inbox")
        .header(common::token_header(token))
        .dispatch();

    assert_eq!(Status::Ok, response.status());

    let value = common::response_json_value(response);
    let inbox_size = value
        .get("inbox")
        .and_then(|inbox| inbox.as_array())
        .map(|inbox| inbox.len())
        .expect("must have 'inbox' field");
    let expected_inbox_size = 2;

    assert_eq!(expected_inbox_size, inbox_size);
}

#[test]
/// Try retrieving an inbox for a non-existent user
fn test_invalid_get_user_inbox() {
    let client = common::test_client();
    let response = &mut client
        .get("/api/v1/user/inbox")
        .header(common::token_header(
            common::get_valid_token_of_invalid_user(),
        ))
        .dispatch();

    assert_eq!(Status::NotFound, response.status());

    let value = common::response_json_value(response);

    let success = value.get("success").and_then(|success| success.as_bool());
    let message = value.get("message").and_then(|message| message.as_str());

    assert_eq!(Some(false), success);
    assert_eq!(Some("inbox for user doesn't exist"), message);
}
