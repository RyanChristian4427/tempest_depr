pub mod auth_controller;

use rocket::Route;

pub fn routes() -> Vec<Route> {
    routes![
        auth_controller::index,
        auth_controller::post_users_login,
        auth_controller::post_users_register,
    ]
}
