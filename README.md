# dev-challenge-2021

Backend task for final of the engineering contest https://devchallenge.it/ in 2021.

This task had been completed offline during 8 hours of coding. All the commits have been pushed in real-time during the coding process.

In a nutshell, the task was to write some sort of Firebase in 8 hours using any technologies and wrap it in Docker image with persistence layer.

[The detailed description of the task](task/BackendFinalDEVChallengeXVIII.md).

The task from the previous online round: https://github.com/irenlian/dev-challenge-2021

# Winner

According to the judges and automated tests, I took the first place among 19 finalists 
who used different programming languages from allover Ukraine in the Backend Hard nomination.

![Winner photo](task/images/photo.jpeg)

The criteria:
- Implementation of the task
- Code style and structure
- Test coverage
- Reliability and stability of solution
- Error messages for the enormous amount of edge cases
- Highload and concurrency

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
