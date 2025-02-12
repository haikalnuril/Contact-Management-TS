# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Request Body :

```Json
{
    "street" : "Mangli st.",
    "city" : "Jember",
    "province" : "East Java",
    "country" : "Indonesia",
    "postal_code" : "68331"
}
```

Response Body (Success) :

```Json
{
    "message" : "Create Address Success",
    "data" : {
        "id" : 1,
        "street" : "Mangli st.",
        "city" : "Jember",
        "province" : "East Java",
        "country" : "Indonesia",
        "postal_code" : "68331"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Success to Get Address",
    "data" : {
        "id" : 1,
        "street" : "Mangli st.",
        "city" : "Jember",
        "province" : "East Java",
        "country" : "Indonesia",
        "postal_code" : "68331"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddresses

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Request Body :

```Json
{
    "street" : "Mangli st.",
    "city" : "Jember",
    "province" : "East Java",
    "country" : "Indonesia",
    "postal_code" : "68331"
}
```

Response Body (Success) :

```Json
{
    "message" : "Update Address Success",
    "data" : {
        "id" : 1,
        "street" : "Mangli st.",
        "city" : "Jember",
        "province" : "East Java",
        "country" : "Indonesia",
        "postal_code" : "68331"
    }
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddresses

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Delete Address Success",
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```

## List Address

Endpoint : GET /api/contacts/:idContact/addresses

Request Header :

-Bearer Token : jsonwebtoken (JWT)

Response Body (Success) :

```Json
{
    "message" : "Create Address Success",
    "data" : [
        {
            "id" : 1,
            "street" : "Mangli st.",
            "city" : "Jember",
            "province" : "East Java",
            "country" : "Indonesia",
            "postal_code" : "68331"
        },
        {
            ...
        }, ....
    ],
}
```

Response Body (Failed):

```Json
{
    "message": "unauthorized, ...."
}
```