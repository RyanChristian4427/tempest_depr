# Tempest Rocket Server

This is the server for what will eventually become Tempest, a web-based email client.

This server is written in [Rocket](https://rocket.rs), a simple, fast, and type-safe web framework for Rust. The Database used is PostgreSQL, with [Diesel](http://diesel.rs), a safe, extensible ORM and query builder for Rust, acting as the bridge between Rocket and the database. Diesel also provides all migration management for this project.

This Rocket Server will be updated in conjunction with the Vue Client.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Rust 1.39 nightly
Cargo
Docker - optional
Diesel-cli - necessary only if Docker is not used
```

### Running

To get the server running locally, I have provided a Docker Compose file for the database and the CLI tool used to manage said database. From project root, run:

```
docker-compose up --build -d
```

This will start the Postgres DB in the background. To populate the database, run:

```
docker run --rm \
    -v "$PWD:/volume" \
    -w /volume \
    --network="rocket-server_default" \
    -it ryanchristian4427/diesel-cli migration run
```

The Docker image built for diesel-cli will run "Diesel" without any arguments, making the container act like a normal CLI. However, that very large command is necessary upon every use. I therefore recommend creating an alias "docker ... /diesel-cli" to "diesel-cli" in a .bashrc or .zshrc, so the tool can be just called with "diesel-cli [command]".

If you'd like to avoid Docker, a local Postgres database is necessary. Make sure to edit the [.env](.env) file and [Rocket.toml](Rocket.toml) file to match your connection URL. You will also need to install the diesel-cli, and run it with:

```
diesel migration run
```

The server can then be ran using:

```
cargo run
```

## Running the tests

The unit tests and integration tests can all be ran using:

```
cargo test
```

The unit tests are found in the same file as the code they test, while the integration tests are found in ~/tests.

### Code Style

All formatting is done with the lovely Rustfmt, which can be ran with:

```
cargo fmt
```

The linter Clippy is also used and often its suggestions are often used, but there are some exceptions. Clippy can be ran with

```
cargo clippy
```
