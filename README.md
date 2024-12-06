# last-drop

The drinks api. Good to the last drop.

## Contributing

### Recieps

To keep last-drop full of the tastiest drink recieps we need you! If you have an idea for a recipe that you dont see yet create an issue on our github repository. Please fill out all fields that are included in the [Recipe template](https://github.com/andrewpcodes/last-drop/issues/new?assignees=&labels=recipe&projects=&template=recipe.md&title=Recipe%3A+).

## Endpoints

### GET /recipes/

Get all recipes

```json
[
    {
        "_id": "1234",
        "name": "Rum and Coke",
        "ingredients": [
            {
                "ingredient": "Rum",
                "quantity": "2",
                "unit": "oz"
            },
            {
                "ingredient": "Cola",
                "quantity": "6",
                "unit": "oz"
            }
        ],
        "instructions": [
            "In a glass pour 2oz of rum followed by 6oz of your favorite cola"
        ],
        "categories": [
            "Rum"
        ]
    },
    ...
]
```

### GET /recipes/:id

Get a recipe by Id

```json
{
    "_id": "1234",
    "name": "Rum and Coke",
    "ingredients": [
        {
            "ingredient": "Rum",
            "quantity": "2",
            "unit": "oz"
        },
        {
            "ingredient": "Cola",
            "quantity": "6",
            "unit": "oz"
        }
    ],
    "instructions": [
        "In a glass pour 2oz of rum followed by 6oz of your favorite cola"
    ],
    "categories": [
        "Rum"
    ]
}
```

### POST /recipes/name

get recipes by name

Exmaple Request

```json
{
    "name": "Rum and"
}
```

Exmaple Response

```json
[
    {
        "_id": "1234",
        "name": "Rum and Coke",
        "ingredients": [
            {
                "ingredient": "Rum",
                "quantity": "2",
                "unit": "oz"
            },
            {
                "ingredient": "Cola",
                "quantity": "6",
                "unit": "oz"
            }
        ],
        "instructions": [
            "In a glass pour 2oz of rum followed by 6oz of your favorite cola"
        ],
        "categories": [
            "Rum"
        ]
    },
    ...
]
```

### POST /recipes/categories

Request

```json
{
    "categoriges": [ "causal" ]
}
```

Response

```json
[
    {
        "_id": "1234",
        "name": "Rum and Coke",
        "ingredients": [
            {
                "ingredient": "Rum",
                "quantity": "2",
                "unit": "oz"
            },
            {
                "ingredient": "Cola",
                "quantity": "6",
                "unit": "oz"
            }
        ],
        "instructions": [
            "In a glass pour 2oz of rum followed by 6oz of your favorite cola"
        ],
        "categories": [
            "casual"
        ]
    },
    ...
]
```

### POST /recipes/ingreidents

get recipes by ingreidients

Request

```json
{
    "ingreidents": [ "rum" ]
}
```

Response

```json
[
    {
        "_id": "1234",
        "name": "Rum and Coke",
        "ingredients": [
            {
                "ingredient": "Rum",
                "quantity": "2",
                "unit": "oz"
            },
            {
                "ingredient": "Cola",
                "quantity": "6",
                "unit": "oz"
            }
        ],
        "instructions": [
            "In a glass pour 2oz of rum followed by 6oz of your favorite cola"
        ],
        "categories": [
            "Rum"
        ]
    },
    ...
]
```
