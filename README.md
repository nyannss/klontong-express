<div align='center'>

[![Tech Stack](https://skillicons.dev/icons?i=nodejs,typescript,express,prisma)](#tech-stack)

<h2>klontong.</h2>
<h3 align="center">Rest API for klontong app!</h3>

[Demo](https://klontong-express.vercel.app/) · [Related Projects](#related-projects)

<h3 align="center">Powered by Vercel ⚡</h3>
</div><br>

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Instalation \& Environments](#instalation--environments)
- [Postman Documentation](#postman-documentation)
- [Table Structure](#table-structure)
- [Related Projects](#related-projects)
- [Contributors](#contributors)
- [License](#license)
- [Report](#report)

## Overview

klontong. REST API is a backend server implementation designed for a online shop using the Express framework. It provides a robust and scalable solution for managing various aspects of a coffee shop's operations, such as products and categories.

The REST API follows the principles of Representational State Transfer (REST), which enables easy integration with various clients, including web and mobile applications. It utilizes the HTTP protocol for communication, allowing clients to perform operations such as retrieving, creating, updating, and deleting resources.

### Features

- Authorization & Authentication
- Upload Images
- CRUD (Products, Categories, User)
- Whitelisting JWT
- Error Handling & Validation

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) (connect database)
- [ImageKit](https://imagekit.io/) (for storing images)
- [JSON Web Token](https://jwt.io/) (authorization)
- [Vercel](https://vercel.com/) (for deploying)
- and other packages (you can see in package.json)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [RDBMS Database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
- [ImageKit](https://imagekit.io/)

### Instalation & Environments

1. Clone this repository to your local

   ```bash
   git clone https://github.com/nyannss/klontong-express.git
   ```

2. Install dependencies

   ```bash
   cd klontong-express && npm install
   ```

3. Setup environments (you can see in `.env.example`)

   - Relational database management system such as MySQL, PostgreSQL, etc ([see more instructions](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql))

     ```env
     DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
     ```

   - JSON Web Token Secret Key (prefer using random string) [[see more information]](<https://jwt.io/introduction>)

     ```env
     JWT_SECRET_KEY = (put your secret key)
     ```

   - Image server using ImageKit [[you can create account in here]](<https://imagekit.io/>). Get them from dashboard

     ```env
     IMAGEKIT_ENDPOINT=(imagekit endpoint)
     IMAGEKIT_PUBLIC_KEY=(imagekit public key)
     IMAGEKIT_PRIVATE_KEY=(imagekit private key)
     ```


4. Last, run the app

   ```bash
   npm run start
   ```

## Postman Documentation

You can see the documentation from [Postman](https://www.postman.com/digital-squad-fw14/workspace/public/collection/26209677-9f569683-7ef7-4571-94a7-3ba07dc6bb9b?action=share&creator=26209677)

If you using json file, just open your postman and click import.

## Table Structure

You can see just in [this link](/prisma/schema.prisma).

Run this to start migrate database

   ```bash
   npx prisma migrate deploy
   ```

## Related Projects

- [kelontong-vite](https://github.com/nyannss/kelontong-vite) - Vite React

## Contributors

- [nyannss](https://github.com/nyannss)

## License

This project using ISC License

## Report

Any error report you can pull request
or contact: <nyannss@proton.me>
