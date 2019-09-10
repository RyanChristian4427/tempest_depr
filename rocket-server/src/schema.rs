table! {
    user_options (user_id) {
        user_id -> Int4,
        emails_per_page -> Int4,
    }
}

table! {
    users (id) {
        id -> Int4,
        first_name -> Text,
        last_name -> Text,
        email -> Text,
        hashed_password -> Text,
    }
}

joinable!(user_options -> users (user_id));

allow_tables_to_appear_in_same_query!(
    user_options,
    users,
);
