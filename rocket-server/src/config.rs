use chrono::{DateTime, Duration, Utc};

pub const DATE_FORMAT: &str = "%Y-%m-%dT%H:%M:%S%.3fZ";
pub const SECRET: &str = "secret123";
pub const TOKEN_PREFIX: &str = "Bearer ";

pub fn token_expire_time() -> DateTime<Utc> {
    Utc::now() + Duration::days(60)
}
