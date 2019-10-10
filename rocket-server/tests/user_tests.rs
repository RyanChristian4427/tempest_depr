//! Test individual user functions and data request

mod common;

use common::{login, response_json_value, test_client, token_header};
use rocket::local::LocalResponse;

#[test]
/// Try retrieving user options for an existing user
fn test_get_user_options() {
    let client = test_client();
    let token = login(&client);
    let response = &mut client
        .get("/api/v1/user/options")
        .header(token_header(token))
        .dispatch();

    check_user_options_response(response)
}

/// Assert that body contains "user" response with expected fields.
fn check_user_options_response(response: &mut LocalResponse) {
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
