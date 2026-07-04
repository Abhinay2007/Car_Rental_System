# Car Rental System

A full-stack car rental web application with a Spring Boot REST API, MySQL persistence, JWT-based authentication, and a React/Vite frontend. Customers can register, log in, browse available vehicles, book rentals, and view their rental history. Admin users can manage vehicles, locations, vehicle types, and view dashboard analytics.

## Features

- User registration and login with BCrypt password hashing
- JWT-protected API routes
- Customer vehicle browsing with location-based filtering
- Vehicle detail and rental booking flow
- Date-overlap validation to prevent double booking
- Current-user rental history
- Rental return flow
- Payment records and revenue reporting
- Admin dashboard with totals, revenue chart data, and rental status chart data
- Admin management screens for vehicles, locations, and vehicle types

## Tech Stack

### Backend

- Java 21
- Spring Boot 4.0.5
- Spring Web
- Spring Data JPA
- MySQL Connector/J
- JJWT
- BCrypt password hashing
- Maven Wrapper

### Frontend

- React 19
- Vite 8
- React Router 7
- Axios
- Recharts
- Framer Motion
- Tailwind CSS
- React Icons

## Project Structure

```text
.
|-- README.md
|-- Car_Rental_System/          # Spring Boot backend
|   |-- pom.xml
|   `-- src/
|       |-- main/java/com/example/car_rental_system/
|       |   |-- controller/     # REST controllers
|       |   |-- model/          # JPA entities
|       |   |-- repository/     # Spring Data repositories
|       |   |-- security/       # JWT filter and utilities
|       |   `-- service/        # Business logic
|       `-- main/resources/
|           `-- application.properties
`-- car-rental-frontend/        # React frontend
    |-- package.json
    |-- vite.config.js
    `-- src/
        |-- components/
        |-- context/
        |-- pages/
        |-- services/
        `-- CSS/
```

## Prerequisites

Install these before running the project:

- Java 21
- Node.js and npm
- MySQL Server
- Maven is optional because the backend includes `mvnw`

## Database Setup

Create a MySQL database named `carrental`:

```sql
CREATE DATABASE carrental;
```

The backend currently uses these values in `Car_Rental_System/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/carrental
spring.datasource.username=root
spring.datasource.password=Abhinay@2007
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Update the username and password to match your local MySQL setup before starting the backend. With `ddl-auto=update`, Hibernate creates and updates the required tables automatically from the JPA entities.

## Running the Backend

From the backend directory:

```bash
cd Car_Rental_System
./mvnw spring-boot:run
```

The API runs on:

```text
http://localhost:8080
```

Run backend tests with:

```bash
cd Car_Rental_System
./mvnw test
```

## Running the Frontend

From the frontend directory:

```bash
cd car-rental-frontend
npm install
npm run dev
```

Vite will print the local frontend URL, usually:

```text
http://localhost:5173
```

The frontend API client is configured in `car-rental-frontend/src/services/api.js` and points to:

```text
http://localhost:8080/api
```

## Frontend Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page |
| `/register` | Public | Create a new account |
| `/login` | Public | Log in and store JWT token |
| `/vehicles` | Authenticated | Browse vehicles |
| `/vehicles/:id` | Authenticated | View vehicle details and book |
| `/my-rentals` | Authenticated | View current user's rentals |
| `/dashboard` | Authenticated | Basic dashboard placeholder |
| `/admin/dashboard` | Admin | Admin analytics dashboard |
| `/admin/vehicles` | Admin screen | Manage vehicles |
| `/admin/locations` | Admin screen | Manage locations |
| `/admin/types` | Admin screen | Manage vehicle types |

## API Overview

All endpoints are prefixed with `/api`. The JWT filter protects API routes except URLs containing `/login` or `/register`. Protected requests should include:

```http
Authorization: Bearer <token>
```

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/users/register` | Register a user |
| `POST` | `/api/users/login` | Log in and receive a JWT |
| `GET` | `/api/users/me` | Get the current user from the JWT |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/{id}` | Get a user by ID |
| `DELETE` | `/api/users/{id}` | Delete a user |

### Vehicles

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/vehicles` | Create a vehicle |
| `GET` | `/api/vehicles` | Get all vehicles |
| `GET` | `/api/vehicles?locationId={id}` | Get vehicles by location |
| `GET` | `/api/vehicles/{id}` | Get a vehicle by ID |
| `PUT` | `/api/vehicles/{id}` | Update a vehicle |
| `DELETE` | `/api/vehicles/{id}` | Delete a vehicle |

### Rentals

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/rentals/book?vehicleId={id}` | Book a vehicle for the current user |
| `GET` | `/api/rentals/my` | Get current user's rentals |
| `GET` | `/api/rentals` | Get all rentals |
| `PUT` | `/api/rentals/{id}/return` | Mark a rental as returned |

### Locations

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/locations` | Create a location |
| `GET` | `/api/locations` | Get all locations |
| `GET` | `/api/locations/{id}` | Get a location by ID |
| `DELETE` | `/api/locations/{id}` | Delete a location |

### Vehicle Types

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/vehicle-types` | Create a vehicle type |
| `GET` | `/api/vehicle-types` | Get all vehicle types |
| `GET` | `/api/vehicle-types/{id}` | Get a vehicle type by ID |
| `DELETE` | `/api/vehicle-types/{id}` | Delete a vehicle type |

### Payments

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/payments?rentalId={id}` | Process a payment for a rental |
| `GET` | `/api/payments` | Get all payments |
| `GET` | `/api/payments/revenue` | Get revenue report data |

### Admin

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/admin/stats` | Get total vehicles, rentals, users, and revenue |
| `GET` | `/api/admin/revenue-chart` | Get monthly revenue chart data |
| `GET` | `/api/admin/status-chart` | Get rental status chart data |

## Main Entities

- `User`: customer/admin account with name, email, password hash, phone, license number, role, and creation time
- `Vehicle`: registration number, model, year, vehicle type, location, status, and image URL
- `VehicleType`: type name and daily, weekly, and monthly rates
- `Location`: branch name, address, city, phone, and active flag
- `Rental`: user, vehicle, start date, end date, actual return date, status, and total amount
- `Payment`: rental, amount, method, status, and transaction date

## Auth Notes

- Passwords are stored using BCrypt.
- Login returns a JWT string.
- The frontend stores the JWT in `localStorage` under `token`.
- Axios automatically attaches the token to API requests.
- The JWT secret is generated in memory on backend startup, so old tokens become invalid after restarting the backend.
- User roles are stored as `customer` or `admin`.

## CORS Notes

The project contains CORS configuration for local development. Some controllers explicitly allow `http://localhost:5174`, while the frontend dev server may run on `http://localhost:5173` unless Vite chooses another port. If browser requests are blocked by CORS, make sure the allowed origin matches the Vite URL shown in the terminal.

## Useful Commands

```bash
# Backend
cd Car_Rental_System
./mvnw spring-boot:run
./mvnw test

# Frontend
cd car-rental-frontend
npm install
npm run dev
npm run build
npm run lint
```

## Development Notes

- Start MySQL before running the backend.
- Start the backend before using frontend features that call the API.
- Create at least one `Location` and one `VehicleType` before adding vehicles.
- A vehicle must reference an existing location and vehicle type.
- Booking calculates `totalAmount` from the selected vehicle type's daily rate and the number of days between `startDate` and `endDate`.
- Rental date overlap checks include rentals with `active` or `pending` status.
