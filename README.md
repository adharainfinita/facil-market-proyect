# Facil Market

This proyect is a Marketplace app. Here, we ofert a platform for the buyer and sellers can get your bussiness so easy and accessible for. In this repository you find the source code and the documentation asociated with the development and funcionalities of the app.

## Equipo

The team of Facil Market is integred for the next members:

- [Mariano Alvarez](https://github.com/Cachilox)
- [Alejandro Vargas](https://github.com/dether)
- [Ricardo Ferreyra](https://github.com/glutix)
- [Hector Cardoso](https://github.com/Hector141)
- [Laura Pérez](https://github.com/LaucataPe)
- [Benjamín Szodo](https://github.com/BenjaminSzodo)
- [Adhara Redruello](https://github.com/adharainfinita)

## Features

- Product Catalogs: Users can browse different categories and explore the products available in the catalog.
- Google Authentication: Allows users to log into the app using their Google accounts.
- Image upload with Cloudinary: Users can upload product images using Cloudinary as a storage service.
- Shopping cart: Users can add products to the shopping cart and proceed to the purchase process.
- Stock control: The system manages the inventory and keeps track of the available stock for each product.
- Filtering and ordering of products: Users can apply filters and order products according to different criteria.
- Search by match: Users can search for products using search terms and get relevant results.
- User profiles: Each user has a personalized profile where they can view and update their information.
- CRUD of products and users: Administrators have the ability to create, read, update and delete products and users.
- Dashboard admin: Provides a control panel for administrators with summary information and sales graphs.

### Used technology 🛠️

- [React](https://reactjs.org/) - Javascript framework
- [PostgreSQL](https://www.postgresql.org/) - Server and Database in the cloud
- [Sequelize](https://sequelize.org/) - ORM for PostgreSQL
- [Scss](https://sass-lang.com/) - Css preprocessor
- [Typescript](https://www.typescriptlang.org/) - Principal lenguage
- [Express](https://expressjs.com/) - Backend framework
- [Node](https://nodejs.org/es) - Development enviroment
- [Redux Toolkit](https://redux-toolkit.js.org/) - Global state

### Dependencies 📋

_front end packages:_

```
react-router-dom
react-icons
react-toastify
sass
react-redux
redux-toolkit
sweetalert
jwt-decode
chart.js
react-chartjs-2
react-dropzone
react-oauth/google
reduxjs/toolkit
@types/chart.js
axios

```

_back end packages:_

```
pg-hstore
pg
nodemailer
morgan
mercadopago
jsonwebtoken
express-validator
express
dotenv
cors
bcryptjs
sequelize
```

## Installation

Clone the repository:

```bash
git clone https://github.com/adharainfinita/facil-market-proyect.git
```

Search `facil-market-proyect`

Install the api:

```bash
    cd api
    npm install

```

Install the client:

```bash
    cd client
    npm install

```

In the api folder create `.env` archive.

Here, you need provide the enviroment variables for the database conection.

**_Database enviroment_**

- DB_NAME= \*database name 'for example: facilmarket'
- DB_USER= here you user of postgres
- DB_PASSWORD= here your password of postgres
- DB_HOST= here the host of postgres
- DB_PORT= '\*Not same of the server'
- PORT= here of the server

**_mercadopago api_**

You need create a mercadopago account.
See this tutorial about the mercadopago API.
https://www.mercadopago.com.ar/developers/es/docs/checkout-api/landing

Your token for using with false credential.

- TOKEN=

**_Nodemailer_**

- MAIL= Owner mail for user
- CREDENTIAL_MAIL= Your credential

**_Encrypt_**

- JWT_SECRET = Anything, you choose.

**_URLS_**

- URL_HOST= The direction of the front end
- URL_NGROK= If you wanna using the mercadopago payments in the localhost, need create a account in a Ngrok page.

In the client folder create `.env` archive.

**_API URL_**

- VITE_HOST=here

**_Google_**

- VITE_GOOGLE_CLIENT_ID='credential of the google library'

When you finish the configuration, the app have listen for you can prove.

```bash
cd api
npm start
```

Same for the client.

## Documentation

[Mercadopago api](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/landing)

[Cloudinary](https://cloudinary.com/)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
