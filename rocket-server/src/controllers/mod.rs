use rocket::{config::Config, Rocket, Route};

pub mod api;

pub(crate) fn rocket_instance(
    mounts: Vec<(&str, Vec<Route>)>,
    cfg: Option<Config>,
) -> Rocket {
    let r = match cfg {
        Some(cfg) => rocket::custom(cfg),
        None => rocket::ignite(),
    };

    let mut instance = r;

    for (path, methods) in mounts {
        instance = instance.mount(path, methods);
    }
    instance
}

fn mounts() -> Vec<(&'static str, Vec<Route>)> {
    vec![("/api/v1", api::v1::routes())]
}

pub fn run() {
    rocket_instance( mounts(), None).launch();
}