# Node.js API boilerplate

Piece of my thoughts about Node.js architecture.

## Highlights:

- Modular RESTful API
- ES10 (ECMAScript 2019)
- Service based
- NoSQL based (MongoDB)
- Auth (JWT/Access-token/Refresh-token)
- Cookie support
- Role based access control
- Request validation
- CRUD(users, posts resources)
- Automated API documentation
- Full authentication/authorization and user registration flow implemented
- Tests(e2e)

## Key points:

### 0. Monolith first

Its about monolith first approach. But this does not prevent you from using it in a microservice architecture as well.

### 1. Controller layer

Each entity have own controller function. It's a slim layer representing resource mapping(routing)

### 2. Service layer

It's a function encapsulated request validation, permission verification and business logic. One file, one function, one REST operation, one use case.

### 3. DAO layer

Implement data access methods.

### 4. Model layer

Represent models schemas and validation rules. There is no other logic **only model fields and validation rules**.

## Development:

### Install global dependencies:

```
npm i
```

### Go ahead...

```
cd /express-mongoose-server
```

- `cp .env.example .env`
- Set required credential in `.env`

Run server

```
npm run start // prod mode
npm run dev // dev mode
```

### Implemented endpoints:

#### /auth

| Path                 | Method | Description   |
| -------------------- | ------ | ------------- |
| /auth/signup         | POST   | SignUp        |
| /auth/login          | POST   | LogIn         |
| /auth/logout         | GET    | LogOut        |
| /auth/refresh-tokens | POST   | RefreshTokens |

#### /users

| Path                                  | Method | Description                |
| ------------------------------------- | ------ | -------------------------- |
| /users                                | GET    | ListUsers                  |
| /users/current                        | GET    | GetCurrentUser             |
| /users/:id                            | GET    | GetUserById                |
| /users                                | POST   | CreateUser                 |
| /users                                | PATCH  | UpdateUser                 |
| /users/:id                            | DELETE | RemoveUser                 |
| /users/change-password                | POST   | ChangePassword             |
| /users/send-reset-password-email      | POST   | SendResetPasswordEmail     |
| /users/reset-password                 | POST   | ResetPassword              |
| /users/confirm-registration           | POST   | ConfirmRegistration        |
| /users/change-email                   | POST   | ChangeEmail                |
| /users/confirm-email                  | POST   | ConfirmEmail               |
| /users/resend-confirm-new-email-token | POST   | ResendConfirmNewEmailToken |
| /users/cancel-email-changing          | POST   | CancelEmailChanging        |

#### /posts

| Path          | Method | Description    |
| ------------- | ------ | -------------- |
| /contacts     | GET    | ListContacts   |
| /contacts/:id | GET    | GetContactById |
| /contacts     | POST   | CreateContact  |
| /contacts/:id | PATCH  | UpdateContact  |
| /contacts/:id | DELETE | RemoveContact  |
