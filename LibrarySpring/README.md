# Library Spring Application

This project is part of the semester work from the subject NNPIA.

## Database model

![DBModel](../docu_images/data_model.png)

## Authorization and authentication

| Roles   | Description   |
|:--------|:--------------|
| `ADMIN` | Admin user    |
| `USER`  | Standard user |

Every registered user has at least one role. When the user is created, the USER role is assigned to him.
Every user with USER role can create, update or delete own libraries and books. He can also edit his profile.
Every user with ADMIN role can create or delete genres.
Password is encrypted with BCrypt.

## API Reference

### USERS

#### Get all users

```http
  GET /api/v1/users
```

#### Get user according to username

```http
  GET /api/v1/users/${username}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |

#### Register new user

```http
  POST /api/v1/register
```
#### Authenticate user

```http
  POST /api/v1/authenticate
```
#### Update user

```http
  PUT /api/v1/users/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |

#### Delete user

```http
  DELETE /api/v1/users/${username}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of user to fetch |

### LIBRARY

#### Get all libraries
```http
  GET /api/v1/libraries
```

#### Get library according to id

```http
  GET /api/v1/libraries/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of library to fetch |


#### Create library
```http
  POST /api/v1/libraries
```

#### Update library

```http
  PUT /api/v1/libraries/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of library to fetch |

#### Delete library

```http
  DELETE /api/v1/libraries/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of library to fetch |

### BOOKS

#### Get all books in library
```http
  GET /api/v1/libraries/${libraryId}/books
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `libraryId` | `int` | **Required**. Id of library to fetch |

#### Get book according to id

```http
  GET /api/v1/libraries/${libraryId}/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `libraryId` | `int` | **Required**. Id of library to fetch |
| `id`      | `int` | **Required**. Id of book to fetch |


#### Create book in library
```http
  POST /api/v1/libraries/${libraryId}/books
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `libraryId` | `int` | **Required**. Id of library |

#### Update book

```http
  PUT /api/v1/libraries/${libraryId}/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `libraryId` | `int` | **Required**. Id of library |
| `id`      | `int` | **Required**. Id of book to update |

#### Delete book

```http
  DELETE /api/v1/libraries/${libraryId}/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `libraryId` | `int` | **Required**. Id of library |
| `id`      | `int` | **Required**. Id of book to delete |

### GENRES

#### Get all genres
```http
  GET /api/v1/genres
```

#### Get genre according to id

```http
  GET /api/v1/genres/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of genre to fetch |


#### Create genre
```http
  POST /api/v1/genres
```

#### Update genre

```http
  PUT /api/v1/genres/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of genre to fetch |

#### Delete genre

```http
  DELETE /api/v1/genres/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of genre to fetch |