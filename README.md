# dev-challenge-2021

Backend task for final of devchallenge.it in 2021.

## How to run the service

To start the service in the Docker:
```
docker-compose up
```

To start the service locally:
```
docker-compose -f docker-compose-db.yml up
npm ci
npm run dev
```

### Tests

In the Docker:
```
docker-compose -f docker-compose.test.yml up
```

Locally:
```
docker-compose -f docker-compose-db.yml up
npm test
```

## Description

The core decisions:
- DB is selected to store the persistent data
- Persistent layer in Docker relies on volumes
- Selected MongoDB is selected in order to store the mixed types and to be able to change the flexible custom schemas in the runtime
- Fields for the schema are stored in order to support additional verification like what fields and queryable

The possible improvements:
- Handle more edge cases for the schemas creations
- Add more tests
- Store schema versions

## API

```
// POST /api/resources
{
 "schema": "users",
 "fields": [
   {
     "name": "email", // назва поля
     "type": "string", // тип даних для серіалізації. Підтримуємо: string, integer та boolean
     "required": true, // чи поле є обов'язковим при створенні ресурсу або оновленні. За замовчуванням false
     "unique": true, // чи поле повинно бути унікальним при створенні ресурсу або оновленні. За замовчуванням false
     "queryable": true, // чи поле повинно бути доступним для фільтрування на списку ресурсів. За замовчуванням false
     "readonly": true // чи поле повинно бути доступним тільки для створення але не можливим для оновлення. За замовчуванням false
   },
   {
     "name": "fullName",
     "type": "string",
     "required": true,
     "queryable": true
   },
   {
     "name": "yearsOfExperience",
     "type": "integer",
     "default": 0 // значення, що задається за замовчуванням якщо не було передано або NULL
   },
   {
     "name": "availabeForHiring",
     "type": "boolean",
     "default": false
   }
 ]
}

```

```
// GET /api/resources - отримуємо список ресурсів без пагінації
{
 "resources": [
   {
     "schema": "users",
     "endpoint": "/api/v1/users"
   }
 ]
}

```

```
PUT /api/resources/users
DELETE /api/resources/users
```
