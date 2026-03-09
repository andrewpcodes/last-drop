# Last Drop v2

Last Drop is a simple, easy to use API full of tasty recipes for your favorite drinks. It allows you to search for recipes, view details, and manage your drink collection.

## Api Documentation

All endpoints require a valid OAuth2 JWT bearer token from Auth0 with the appropriate scope.

| Method | Path       | Scope Required        | Description                               |
|--------|------------|-----------------------|-------------------------------------------|
| GET    | `/drink`   | `read.drinks`         | Retrieve a single drink by `id` (UUID)    |
| GET    | `/drinks`  | `read.drinks`         | List or search drinks by optional `name`  |
| POST   | `/drink`   | `create.drinks`       | Create a new drink (JSON body)            |
| PUT    | `/drink`   | `update.drinks`       | Update an existing drink (JSON body)      |
| DELETE | `/drink`   | `delete.drinks`       | Delete a drink by `id` (UUID)             |

### Example: Search drinks by name

```
GET /drinks?name=mojito
Authorization: Bearer <token>
```

### Example: Create a drink

```json
POST /drink
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mojito",
  "description": "A refreshing Cuban cocktail",
  "ingredients": [],
  "instructions": []
}
```

### Error Responses

All error responses follow a consistent JSON format:

```json
{
  "message": "Descriptive error message"
}
```

| Status | Meaning                                |
|--------|----------------------------------------|
| 400    | Validation error (missing required fields) |
| 401    | Missing or invalid authentication token |
| 403    | Insufficient permissions (wrong scope) |
| 404    | Drink not found                        |
| 500    | Unexpected server error                |

## How to Run

### Prerequisites

- Java 21+
- Docker & Docker Compose

### Run with Docker Compose (recommended)

```bash
cp .env.example .env
docker compose up --build
```

The API will be available at `http://localhost:8080`.

### Run locally (requires PostgreSQL on localhost:5432)

```bash
export SPRING_PROFILES_ACTIVE=local
./gradlew bootRun
```

### Run tests

```bash
./gradlew test
```

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request
