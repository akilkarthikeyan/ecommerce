# E-Commerce API

This is an E-Commerce API built with Node.js, Express, TypeScript, and MySQL. It provides endpoints for managing users, products, and shopping carts.

## Features

- User authentication and authorization using JWT
- Password hashing with bcrypt
- Product management (CRUD operations)
- Shopping cart management
- Checkout process with Stripe integration
- API documentation with Swagger
- Caching with Redis

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Redis
- Stripe account

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/akilkarthikeyan/ecommerce.git
    cd ecommerce
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add the following environment variables:**

    ```env
    PORT=3000
    HOST=http://localhost
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    REDIS_HOST=your_redis_host
    REDIS_PORT=6379
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **Set up the database:**

    - Create the database and tables by running the SQL script in `db_scripts/schema.sql`:

    ```sh
    mysql -u your_db_user -p your_db_name < db_scripts/schema.sql
    ```

5. **Run the development server:**

    ```sh
    npm run dev
    ```

6. **Access the API documentation:**

    Open your browser and navigate to `http://localhost:3000/api-docs` to view the Swagger documentation.

## Scripts

- `npm run dev`: Start the development server with nodemon
- `npm run build`: Compile TypeScript to JavaScript
- `npm run start`: Start the production server

## License

This project is licensed under the MIT License.
