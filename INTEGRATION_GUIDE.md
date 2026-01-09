# MongoDB Backend Integration Guide

This guide will help you integrate the MongoDB backend with your existing React frontend.

## Quick Start

### 1. Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd shoe-main/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your MongoDB connection:
   ```env
   MONGODB_URI=mongodb://localhost:27017/shoe_ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   - Local: Make sure MongoDB is running
   - Atlas: Use your connection string

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Install additional dependencies (if needed)**
   ```bash
   npm install
   ```

3. **Start the frontend**
   ```bash
   npm run dev
   ```

## API Integration

The backend provides a comprehensive API client (`src/lib/api.ts`) that you can use to replace the mock data.

### Key Changes Needed

1. **Replace mock data imports** with API calls
2. **Update authentication** to use JWT tokens
3. **Modify data fetching** to use async API calls
4. **Update state management** for real-time data

### Example Integration

#### Before (Mock Data)
```typescript
import { mockProducts } from '../lib/mockData';

const products = mockProducts;
```

#### After (API Integration)
```typescript
import { api } from '../lib/api';
import { useState, useEffect } from 'react';

const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      if (response.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  
  fetchProducts();
}, []);
```

## Authentication Integration

### Update AuthContext

Replace Supabase authentication with JWT-based authentication:

```typescript
// In AuthContext.tsx
import { api } from '../lib/api';

const login = async (email: string, password: string) => {
  try {
    const response = await api.login({ email, password });
    if (response.success) {
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const register = async (userData: any) => {
  try {
    const response = await api.register(userData);
    if (response.success) {
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

## Cart Integration

### Update CartContext

Replace local storage cart with API-based cart:

```typescript
// In CartContext.tsx
import { api } from '../lib/api';

const addToCart = async (product: Product, size: string, color: string, quantity: number) => {
  try {
    const response = await api.addToCart({
      product_id: product.id,
      size,
      color,
      quantity
    });
    
    if (response.success) {
      // Update local state
      setItems(response.data.items);
    }
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};
```

## Product Data Integration

### Update Product Pages

Replace mock data with API calls:

```typescript
// In ProductDetailPage.tsx
import { api } from '../lib/api';

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await api.getProduct(slug);
      if (response.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchProduct();
}, [slug]);
```

## Order Integration

### Update Order Flow

```typescript
// In checkout process
const createOrder = async (orderData: any) => {
  try {
    const response = await api.createOrder(orderData);
    if (response.success) {
      // Handle successful order
      navigate('/orders');
    }
  } catch (error) {
    console.error('Order creation failed:', error);
  }
};
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/shoe_ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Default Credentials

After seeding the database:

- **Admin**: admin@shoecommerce.com / admin123
- **Test User**: test@example.com / test123

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get products (with filtering)
- `GET /api/products/:slug` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/trending` - Get trending products

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Reviews
- `GET /api/reviews/product/:id` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review

## Migration Steps

1. **Backup existing data** (if any)
2. **Set up MongoDB backend**
3. **Seed the database**
4. **Update environment variables**
5. **Replace mock data imports** with API calls
6. **Update authentication flow**
7. **Test all functionality**
8. **Deploy backend and frontend**

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure `FRONTEND_URL` is set correctly in backend `.env`
2. **Authentication issues**: Check JWT token handling
3. **Database connection**: Verify MongoDB URI and connection
4. **API errors**: Check network requests in browser dev tools

### Debug Tips

1. Check browser console for API errors
2. Verify backend server is running on correct port
3. Ensure environment variables are loaded correctly
4. Check MongoDB connection and database seeding

## Support

If you encounter issues:

1. Check the backend logs for errors
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check network connectivity between frontend and backend

The API client provides comprehensive error handling and logging to help debug issues.
