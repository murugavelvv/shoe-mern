// API client for connecting to MongoDB backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
  }) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: {
    full_name?: string;
    phone?: string;
    avatar_url?: string;
  }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  async addAddress(addressData: {
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country?: string;
    is_default?: boolean;
  }) {
    return this.request('/auth/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async getAddresses() {
    return this.request('/auth/addresses');
  }

  async updateAddress(addressId: string, addressData: any) {
    return this.request(`/auth/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async deleteAddress(addressId: string) {
    return this.request(`/auth/addresses/${addressId}`, {
      method: 'DELETE',
    });
  }

  // Product endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    brand?: string;
    gender?: string;
    min_price?: number;
    max_price?: number;
    size?: string;
    color?: string;
    category?: string;
    search?: string;
    featured?: boolean;
    trending?: boolean;
    sort?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return this.request(endpoint);
  }

  async getProduct(slug: string) {
    return this.request(`/products/${slug}`);
  }

  async getFeaturedProducts(limit?: number) {
    const endpoint = limit ? `/products/featured?limit=${limit}` : '/products/featured';
    return this.request(endpoint);
  }

  async getTrendingProducts(limit?: number) {
    const endpoint = limit ? `/products/trending?limit=${limit}` : '/products/trending';
    return this.request(endpoint);
  }

  async searchProducts(query: string, page?: number, limit?: number) {
    const params = new URLSearchParams({ q: query });
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    
    return this.request(`/products/search?${params.toString()}`);
  }

  async getProductCategories() {
    return this.request('/products/categories');
  }

  async getProductSizes() {
    return this.request('/products/sizes');
  }

  async getProductColors() {
    return this.request('/products/colors');
  }

  // Brand endpoints
  async getBrands(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/brands?${queryString}` : '/brands';
    
    return this.request(endpoint);
  }

  async getBrand(slug: string) {
    return this.request(`/brands/${slug}`);
  }

  async getBrandProducts(slug: string, params?: {
    page?: number;
    limit?: number;
    gender?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString 
      ? `/brands/${slug}/products?${queryString}` 
      : `/brands/${slug}/products`;
    
    return this.request(endpoint);
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(itemData: {
    product_id: string;
    size: string;
    color: string;
    quantity: number;
  }) {
    return this.request('/cart/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async updateCartItem(productId: string, itemData: {
    size: string;
    color: string;
    quantity: number;
  }) {
    return this.request(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  }

  async removeFromCart(productId: string, size: string, color: string) {
    return this.request(`/cart/items/${productId}`, {
      method: 'DELETE',
      body: JSON.stringify({ size, color }),
    });
  }

  async clearCart() {
    return this.request('/cart', {
      method: 'DELETE',
    });
  }

  async getCartCount() {
    return this.request('/cart/count');
  }

  async validateCart() {
    return this.request('/cart/validate', {
      method: 'POST',
    });
  }

  // Order endpoints
  async createOrder(orderData: {
    items: Array<{
      product_id: string;
      size: string;
      color: string;
      quantity: number;
    }>;
    shipping_address: any;
    billing_address?: any;
    payment_details: any;
    coupon_code?: string;
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(params?: {
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/orders?${queryString}` : '/orders';
    
    return this.request(endpoint);
  }

  async getOrder(orderId: string) {
    return this.request(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
  }

  // Review endpoints
  async getProductReviews(productId: string, params?: {
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString 
      ? `/reviews/product/${productId}?${queryString}` 
      : `/reviews/product/${productId}`;
    
    return this.request(endpoint);
  }

  async getUserReviews(params?: {
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/reviews/user?${queryString}` : '/reviews/user';
    
    return this.request(endpoint);
  }

  async createReview(reviewData: {
    product_id: string;
    order_id: string;
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
  }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async updateReview(reviewId: string, reviewData: {
    rating?: number;
    title?: string;
    comment?: string;
    images?: string[];
  }) {
    return this.request(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  }

  async deleteReview(reviewId: string) {
    return this.request(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }

  async markReviewHelpful(reviewId: string) {
    return this.request(`/reviews/${reviewId}/helpful`, {
      method: 'POST',
    });
  }

  async reportReview(reviewId: string, reason: string) {
    return this.request(`/reviews/${reviewId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Coupon endpoints
  async getCoupons(params?: {
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/coupons?${queryString}` : '/coupons';
    
    return this.request(endpoint);
  }

  async validateCoupon(couponData: {
    code: string;
    order_amount?: number;
    order_items?: any[];
  }) {
    return this.request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify(couponData),
    });
  }

  async getCoupon(code: string) {
    return this.request(`/coupons/${code}`);
  }

  // Logout
  logout() {
    this.setToken(null);
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse };
