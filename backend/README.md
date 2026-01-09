# Shoe E-commerce Backend

A comprehensive MongoDB backend for the shoe e-commerce application built with Express.js and Node.js.

## Features

- **User Management**: Registration, authentication, profile management
- **Product Management**: CRUD operations for products with filtering and search
- **Brand Management**: Brand CRUD operations with product associations
- **Shopping Cart**: Add, update, remove items with real-time calculations
- **Order Management**: Complete order lifecycle with status tracking
- **Review System**: Product reviews with rating and moderation
- **Coupon System**: Discount coupons with validation and usage tracking
- **Admin Panel**: Administrative functions for managing the platform

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

## Installation

1. **Clone the repository**
   ```bash
   cd shoe-main/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/shoe_ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   - Local MongoDB: Make sure MongoDB is running on your system
   - MongoDB Atlas: Use your Atlas connection string

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/addresses` - Add shipping address
- `PUT /api/auth/addresses/:id` - Update address
- `DELETE /api/auth/addresses/:id` - Delete address

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:slug` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/trending` - Get trending products
- `GET /api/products/search` - Search products
- `GET /api/products/categories` - Get product categories
- `GET /api/products/sizes` - Get available sizes
- `GET /api/products/colors` - Get available colors

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:slug` - Get single brand
- `GET /api/brands/:slug/products` - Get brand products
- `POST /api/brands` - Create brand (Admin)
- `PUT /api/brands/:id` - Update brand (Admin)
- `DELETE /api/brands/:id` - Delete brand (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item
- `DELETE /api/cart/items/:productId` - Remove cart item
- `DELETE /api/cart` - Clear cart
- `GET /api/cart/count` - Get cart item count
- `POST /api/cart/validate` - Validate cart items

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/payment` - Update payment status
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `GET /api/orders/admin/stats` - Get order statistics (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `GET /api/reviews/user` - Get user's reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/helpful` - Mark review as helpful
- `POST /api/reviews/:id/report` - Report review
- `GET /api/reviews/admin/pending` - Get pending reviews (Admin)
- `PUT /api/reviews/:id/approve` - Approve review (Admin)
- `PUT /api/reviews/:id/reject` - Reject review (Admin)

### Coupons
- `GET /api/coupons` - Get active coupons
- `POST /api/coupons/validate` - Validate coupon
- `GET /api/coupons/:code` - Get coupon by code
- `POST /api/coupons` - Create coupon (Admin)
- `PUT /api/coupons/:id` - Update coupon (Admin)
- `DELETE /api/coupons/:id` - Delete coupon (Admin)
- `GET /api/coupons/admin/all` - Get all coupons (Admin)
- `GET /api/coupons/admin/stats` - Get coupon statistics (Admin)

### Users (Admin)
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/admin/stats` - Get user statistics (Admin)

## Database Models

### User
- Authentication and profile information
- Shipping addresses
- Role-based access control

### Brand
- Brand information and metadata
- Active/inactive status

### Product
- Product details with images, sizes, colors
- Pricing and inventory management
- Featured and trending flags
- Search and filtering capabilities

### Cart
- User's shopping cart with items
- Real-time price calculations
- Stock validation

### Order
- Complete order information
- Payment and shipping details
- Status tracking and history

### Review
- Product reviews with ratings
- Moderation system
- Helpful votes and reporting

### Coupon
- Discount coupons with validation
- Usage tracking and limits
- Flexible discount types

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers
- Role-based access control

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Default Credentials

After seeding the database, you can use these credentials:

**Admin User:**
- Email: admin@shoecommerce.com
- Password: admin123

**Test User:**
- Email: test@example.com
- Password: test123

## API Documentation

The API follows RESTful conventions and returns JSON responses. All responses include a `success` boolean and appropriate data or error messages.

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
