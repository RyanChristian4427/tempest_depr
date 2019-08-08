use rocket::{
    self,
    Route,
};

mod auth;

pub fn routes() -> Vec<Route> {
    routes![
        auth::index,
    ]
}

