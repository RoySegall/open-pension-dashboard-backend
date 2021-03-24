# open_pension_dashboard_backend
Todo:
* [X] Typescript
* [X] GraphQL - apollo
* [ ] Kafka
* [ ] Queue - typescript
* [X] Mongo
* [X] Sockets - pusher


## Models:

### User
id
username
password - encrypted
email
created at
updated
profile_picture_storage_id
present name


### files
name
file_storage_id
process_status - stored, processed, processed with errors, processed

### token
user
token
refresh_token
expires
