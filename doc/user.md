# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```Json
{
    "username": "nuril",
    "password" : "rahasia",
    "name" : "Haikal Nuril"
}
```
Response Body (Success) :

```Json
{
    "message" : "Register Success",
    "data" : {
        "username" : "nuril",
        "name" : "Haikal Nuril"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "username, password, or name is required, ...."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```Json
{
    "username": "nuril",
    "password" : "rahasia",
}
```
Response Body (Success) :

```Json
{
    "message" : "Login Success",
    "data" : {
        "username" : "nuril",
        "name" : "Haikal Nuril",
        "token" : "jsonwebtoken (JWT)"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "username and password is required, ...."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header:

- Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Success to get data user",
    "data" : {
        "username" : "nuril",
        "name" : "Haikal Nuril",
    }
}
```

Response Body (Failed):

```Json
{
    "message": "Unauthorized, ...."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- Bearer Token : jsonwebtoken (JWT)

Request Body :

```Json
{
    "password" : "rahasia", // tidak wahib
    "name": "Haikal Nuril A", // tidak wajib
}
```
Response Body (Success) :

```Json
{
    "message" : "Update User Success",
    "data" : {
        "username" : "nuril",
        "name" : "Haikal Nuril A",
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Logout User Success",
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```