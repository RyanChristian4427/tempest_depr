#![feature(proc_macro_hygiene, decl_macro)]

mod controllers;
#[macro_use] extern crate rocket;

fn main() {
    controllers::run();
}