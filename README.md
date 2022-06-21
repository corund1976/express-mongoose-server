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
npm install
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

| Path                 | Method | Description   | Access        |
| -------------------- | ------ | ------------- | ------------- |
| /auth/signup         | POST   | SignUp        | Public route  |
| /auth/login          | POST   | LogIn         | Public route  |
| /auth/logout         | GET    | LogOut        | Private route |
| /auth/refresh-tokens | POST   | RefreshTokens | Private route |

#### /users

| Path                                  | Method | Description                | Access        |
| ------------------------------------- | ------ | -------------------------- | ------------- |
| /users                                | GET    | ListUsers                  | Admin         |
| /users/current                        | GET    | GetCurrentUser             | Authenticated |
| /users/:id                            | GET    | GetUserById                | Admin         |
| /users                                | POST   | CreateUser                 | Authenticated |
| /users/subscription                   | PATCH  | UpdateCurrUserSubscription | Authenticated |
| /users/:id                            | PATCH  | UpdateUserById             | Admin         |
| /users/                               | DELETE | RemoveCurrentUser          | Authenticated |
| /users/:id                            | DELETE | RemoveUserById             | Admin         |
| /users/change-password                | POST   | ChangePassword             |
| /users/send-reset-password-email      | POST   | SendResetPasswordEmail     |
| /users/reset-password                 | POST   | ResetPassword              |
| /users/confirm-registration           | POST   | ConfirmRegistration        |
| /users/change-email                   | POST   | ChangeEmail                |
| /users/confirm-email                  | POST   | ConfirmEmail               |
| /users/resend-confirm-new-email-token | POST   | ResendConfirmNewEmailToken |
| /users/cancel-email-changing          | POST   | CancelEmailChanging        |

#### /contacts

| Path          | Method | Description    | Access        |
| ------------- | ------ | -------------- | ------------- |
| /contacts     | GET    | ListContacts   | Private route |
| /contacts/:id | GET    | GetContactById | Private route |
| /contacts     | POST   | CreateContact  | Private route |
| /contacts/:id | PATCH  | UpdateContact  | Private route |
| /contacts/:id | DELETE | RemoveContact  | Private route |
