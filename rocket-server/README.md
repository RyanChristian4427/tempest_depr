# Tempest Rocket Server

This is the server for what will eventually become Tempest, a web-based email client.

This server is written in [Rocket](https://rocket.rs), a simple, fast, and type-safe web framework for Rust. The Database used is PosgreSQL, with [Diesel](http://diesel.rs), a safe, extensible ORM and query builder for Rust, acting as the connection between the two, as well as providing all migration support.

This Rocket Server will be updated in conjunction with the Vue Client.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites


```
Rust 1.38 nightly
Cargo
Docker - optional
Diesel-cli - necessary only if Docker is not used
```

### Running

To get the server running locally, I have provided a Docker Compose file for the database and the CLI tool used to manage said database. From project root, run:

```
docker-compose up --build -d
```

This will start the PostgreSQL DB in the background, as well as create the image used for Diesel-CLI. To populate the database, run:

```
docker run --rm \
    -v "$PWD:/volume" \
    -w /volume \
    --network="rocket-server_default" \
    -it ryanchristian4427/diesel-cli migration run
```

The Docker image built for diesel-cli will run "Diesel" without any arguments, making the container act like a normal CLI, however, that requires the entire run command on every use. I therefore recommend binding "docker ... /diesel-cli" to "diesel-cli" in a .bashrc or .zshrc, so the tool can be just called with "diesel-cli migration run".

If you'd like to avoid Docker, a local Postgres database is necessary. Make sure to edit the [.env](.env) file and [Rocket.toml](Rocket.toml) file to match your connection URL. You will also need to install the diesel-cli, and run it with:

```
diesel migration run
```

The server can then be ran using:

```
cargo run
```
