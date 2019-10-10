//! Test individual user functions and data request

mod common;

use crate::common::get_valid_token_of_invalid_user;
use common::{login, response_json_value, test_client, token_header};
use rocket::http::Status;

#[test]
/// Try retrieving user options for an existing user
fn test_get_user_options() {
    let client = test_client();
    let token = login(&client);
    let response = &mut client
        .get("/api/v1/user/options")
        .header(token_header(token))
        .dispatch();

    assert_eq!(response.status(), Status::Ok);

    let value = response_json_value(response);
    let options = value
        .get("user_options")
        .expect("must have a 'user_options' field");
    let expected_result: i32 = 50;

    assert_eq!(
        options
            .get("emails_per_page")
            .expect("must have a 'emails_per_page' field"),
        expected_result
    );
}

#[test]
/// Try retrieving user options for a non-existent user
fn test_invalid_get_user_options() {
    let client = test_client();
    let response = &mut client
        .get("/api/v1/user/options")
        .header(token_header(get_valid_token_of_invalid_user()))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = response_json_value(response);

    let inbox_error = value
        .get("errors")
        .expect("must have a 'errors' field")
        .get("options for that user")
        .expect("must have 'options for that user' errors")
        .get(0)
        .expect("must have non empty 'options for that user' errors")
        .as_str();

    assert_eq!(inbox_error, Some("don't exist"));
}
