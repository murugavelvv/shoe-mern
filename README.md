# Shoe-MERN E-Commerce Website

A full-stack **shoe selling e-commerce website** built using the **MERN stack** with **Razorpay payment integration**.

## 🎯 Project Overview

This project provides a complete online shopping experience for shoes. Users can browse products, view shoe details, add items to the cart, manage their cart, place orders, and make online payments through Razorpay.

The application uses **React** for the frontend, **Node.js and Express.js** for the backend, and **MongoDB** for storing application data.

## ✨ Features

- User registration and login
- Browse and search shoes
- View product details
- Add products to cart
- Update and remove cart items
- Order placement and checkout
- Razorpay payment gateway integration
- Product management using CRUD operations
- Responsive e-commerce interface

## 🛠️ Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment:** Razorpay
- **Languages:** JavaScript, TypeScript

## 📁 Project Structure

```text
shoe-mern/
│
├── client/          # React frontend
├── server/          # Node.js + Express backend
├── package.json
└── README.md
```

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/murugavelvv/shoe-mern.git
cd shoe-mern
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder and add your MongoDB and Razorpay credentials.

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 4. Run the application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm start
```

Open the application in your browser:

```text
http://localhost:3000
```

## 🔄 Application Flow

**User → Browse Shoes → Add to Cart → Checkout → Razorpay Payment → Order Completed**

## 🚀 Key Highlights

- Full-stack MERN e-commerce application
- REST API based backend
- MongoDB database integration
- Razorpay online payment integration
- CRUD operations for products
- Shopping cart and checkout functionality
- Clean frontend and backend structure

