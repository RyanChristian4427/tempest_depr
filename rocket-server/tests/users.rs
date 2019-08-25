//! Test registration and login

mod common;

use common::*;
use rocket::http::{ContentType, Status};
use rocket::local::LocalResponse;

#[test]
/// Try registering a new user
fn test_register() {
    let client = test_client();
    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"first_name": FIRST_NAME, "last_name": LAST_NAME, "email": EMAIL, "password": PASSWORD}}))
        .dispatch();

    let status = response.status();
    // If user was already created we should get an UnprocessableEntity or Ok otherwise.
    //
    // As tests are ran in an independent order `login()` probably has already created smoketest user.
    // And so we gracefully handle "user already exists" error here.
    match status {
        Status::Ok => check_user_response(response),
        Status::UnprocessableEntity => check_user_validation_errors(response),
        _ => panic!("Got status: {}", status),
    }
}

#[test]
/// Registration with the same email must fail
fn test_register_with_duplicated_email() {
    let client = test_client();
    register(client, FIRST_NAME, LAST_NAME, "original@example.com", PASSWORD);

    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({
            "user": {
                "first_name": "new_clone_name",
                "last_name": "new_clone_last_name",
                "email": "original@example.com",
                "password": PASSWORD,
            },
        }))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = response_json_value(response);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("email"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("has already been taken"))
}

#[test]
/// Try logging in, and assure response token is valid
fn test_login() {
    let client = test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": EMAIL, "password": PASSWORD}}))
        .dispatch();

    check_user_response(response)
}

#[test]
/// Login with wrong password must fail.
fn test_incorrect_login() {
    let client = test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": EMAIL, "password": "foo"}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = response_json_value(response);
    let login_error = value
        .get("errors")
        .expect("must have a 'errors' field")
        .get("email or password")
        .expect("must have 'email or password' errors")
        .get(0)
        .expect("must have non empty 'email or password' errors")
        .as_str();

    assert_eq!(login_error, Some("is invalid"));
}


// Utility

/// Assert that body contains "user" response with expected fields.
fn check_user_response(response: &mut LocalResponse) {
    let value = response_json_value(response);
    let user = value.get("user").expect("must have a 'user' field");

    assert_eq!(user.get("email").expect("user has email"), EMAIL);
    assert_eq!(user.get("first_name").expect("user has a first name"), FIRST_NAME);
    assert_eq!(user.get("last_name").expect("user has a last name"), LAST_NAME);
    assert!(user.get("token").is_some());
}

/// Catches the registration test, if the email has already been used in the database
fn check_user_validation_errors(response: &mut LocalResponse) {
    let value = response_json_value(response);
    let email_error = value
        .get("errors")
        .expect("must have a 'errors' field")
        .get("email")
        .expect("must have 'email' errors")
        .get(0)
        .expect("must have non-empty 'email' errors")
        .as_str();

    assert_eq!(email_error, Some("has already been taken"))
}