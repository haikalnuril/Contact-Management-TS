# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Request Body :

```Json
{
    "first_name" : "Jetro",
    "last_name" : "Sulthan",
    "email" : "jetro@example.com",
    "phone" : "08510101012"
}
```

Response Body (Success) :

```Json
{
    "message" : "Create Contact Success",
    "data" : {
        "id" : 1,
        "first_name" : "Jetro",
        "last_name" : "Sulthan",
        "email" : "jetro@example.com",
        "phone" : "08510101012"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Create Contact Success",
    "data" : {
        "id" : 1,
        "first_name" : "Jetro",
        "last_name" : "Sulthan",
        "email" : "jetro@example.com",
        "phone" : "08510101012"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Request Body :

```Json
{
    "first_name" : "Jetro",
    "last_name" : "Sulthan",
    "email" : "jetro@example.com",
    "phone" : "08510101012"
}
```

Response Body (Success) :

```Json
{
    "message" : "Create Contact Success",
    "data" : {
        "id" : 1,
        "first_name" : "Jetro",
        "last_name" : "Sulthan",
        "email" : "jetro@example.com",
        "phone" : "08510101012"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Delete Contact Success",
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Search Contact

Endpoint : GET /api/contacts

Query params :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size  : number, default 10

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Create Contact Success",
    "data" : [
        {
            "id" : 1,
            "first_name" : "Jetro",
            "last_name" : "Sulthan",
            "email" : "jetro@example.com",
            "phone" : "08510101012"
        },
        {
            ...
        }, ....
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```
