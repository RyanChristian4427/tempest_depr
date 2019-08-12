table! {
    users (id) {
        id -> Int4,
        first_name -> Text,
        last_name -> Text,
        email -> Text,
        hashed_password -> Text,
        activated -> Bool,
        authentication_token -> Nullable<Text>,
        expiry_datetime -> Nullable<Timestamp>,
    }
}
