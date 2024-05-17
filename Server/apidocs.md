# Fashionate

## Product
### get /products
**Description: get all product data by limit (for infinite scroll)**


_request header_
```JSON
{
  "access_token": "Bearer <your access token>"
}
```

_request body_
```
not needed
```

_response (200)_
```JSON
{
    "totalItems": integer,
    "totalPages": integer,
    "currentPage": integer,
    "data": [
        {
            "id": integer,
            "name": string,
            "description": string,
            "price": integer,
            "weight": integer,
            "imgUrl": string,
            "CategoryId": integer,
            "sizes": array,
            "createdAt": date,
            "updatedAt": date,
            "Category": {
                "name": strings
            }
        },
    ...
    ]
}
```

### get /products/:id
**Description: get product by id**


_request header_
```JSON
{
  "access_token": "Bearer <your access token>"
}
```

_request body_
```
not needed
```

_response (200)_
```JSON
{
    "id": INTEGER,
    "name": STRING,
    "description": STRING,
    "price": INTEGER,
    "weight": INTEGER,
    "imgUrl": STRING,
    "CategoryId": INTEGER,
    "sizes": ARRAY,
    "createdAt": DATE,
    "updatedAt": DATE
}
```

### post /products
**Description: add new product for admin only**


_request header_
```JSON
{
  "access_token": "Bearer <your access token>"
}
```

_request body_
```JSON
{ 
    "name": STRING, 
    "description": STRING, 
    "price": INTEGER, 
    "weight": INTEGER, 
    "imgUrl": STRING, 
    "CategoryId": INTEGER
}
```

_response (201)_
```JSON
{
    "message": "New product has been added"
}
```

### put /products:id
**Description: add new product for admin only**


_request header_
```JSON
{
  "access_token": "Bearer <your access token>"
}
```

_request body_
```JSON
{ 
    "name": STRING, 
    "description": STRING, 
    "price": INTEGER, 
    "weight": INTEGER, 
    "imgUrl": STRING, 
    "CategoryId": INTEGER
}
```

_response (201)_
```JSON
{
    "message": "Product has been successfully edited"
}
```


### delete /products:id
**Description: add new product for admin only**


_request header_
```JSON
{
  "access_token": "Bearer <your access token>"
}
```

_request body_
```
none
```

_response (201)_
```JSON
{
    "message": "Product has been successfully deleted"
}
```

