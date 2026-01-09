import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Brand from '../models/Brand.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';

// Load environment variables
dotenv.config();

// Mock data from the frontend
const mockBrands = [
  { name: 'Nike', slug: 'nike', logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Just Do It' },
  { name: 'Adidas', slug: 'adidas', logo_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400', description: 'Impossible Is Nothing' },
  { name: 'Puma', slug: 'puma', logo_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', description: 'Forever Faster' },
  { name: 'Reebok', slug: 'reebok', logo_url: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400', description: 'Be More Human' },
  { name: 'Converse', slug: 'converse', logo_url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', description: 'All Star Legacy' },
  { name: 'Vans', slug: 'vans', logo_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', description: 'Off The Wall' },
  { name: 'New Balance', slug: 'new-balance', logo_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', description: 'Always In Beta' },
  { name: 'Skechers', slug: 'skechers', logo_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', description: 'Comfort Technology' },
  { name: 'Redtape', slug: 'redtape', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbc4BAF4suK6hmdWRDeg2x28_PtAeSFH4MFA&s', description: 'Style Meets Comfort' },
  { name: 'Woodland', slug: 'woodland', logo_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', description: 'Adventure Awaits' },
  { name: 'Bata', slug: 'bata', logo_url: 'https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/y/5/y/-original-imahan4bmtdpupq4.jpeg?q=90&crop=false', description: 'Comfort for Everyone' },
  { name: 'Sparx', slug: 'sparx', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkm9228mBzjWqNp0QLn2uxWCPZf3P9Ij6JjA&s', description: 'Step Into Style' }
];

const mockProducts = [
  // Nike Products
  {
    name: 'Air Max 270',
    slug: 'nike-air-max-270',
    description: 'The Nike Air Max 270 is inspired by two icons of big Air: the Air Max 180 and Air Max 93.',
    price: 12000,
    sale_price: 9600,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red', 'Blue'],
    stock: 50,
    rating: 4.5,
    review_count: 128,
    is_featured: true,
    is_trending: true,
    category: 'Running'
  },
  {
    name: 'Air Force 1',
    slug: 'nike-air-force-1',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best.',
    price: 8500,
    sale_price: 2999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy'],
    stock: 75,
    rating: 4.7,
    review_count: 256,
    is_featured: true,
    is_trending: true,
    category: 'Lifestyle'
  },
  {
    name: 'Jordan Retro 1',
    slug: 'nike-jordan-retro-1',
    description: 'The Air Jordan 1 Retro High remakes the classic sneaker.',
    price: 13600,
    sale_price: 2999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1562875/pexels-photo-1562875.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black', 'Blue'],
    stock: 42,
    rating: 4.9,
    review_count: 203,
    is_featured: true,
    is_trending: false,
    category: 'Basketball'
  },
  // Adidas Products
  {
    name: 'Ultraboost 22',
    slug: 'adidas-ultraboost-22',
    description: 'Experience incredible energy return with the Adidas Ultraboost 22.',
    price: 14400,
    gender: 'women',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White', 'Pink', 'Purple'],
    stock: 35,
    rating: 4.8,
    review_count: 95,
    is_featured: true,
    is_trending: true,
    category: 'Running'
  },
  {
    name: 'Stan Smith',
    slug: 'adidas-stan-smith',
    description: 'A tennis icon that transcends generations.',
    price: 7200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1562875/pexels-photo-1562875.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White/Green', 'White/Navy', 'All White'],
    stock: 60,
    rating: 4.8,
    review_count: 521,
    is_featured: true,
    is_trending: true,
    category: 'Lifestyle'
  },
  // Puma Products
  {
    name: 'RS-X³ Puzzle',
    slug: 'puma-rs-x3-puzzle',
    description: 'Bold colors and exaggerated design inspired by the evolution of technology.',
    price: 8800,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Multi', 'Black', 'White'],
    stock: 28,
    rating: 4.3,
    review_count: 67,
    is_featured: false,
    is_trending: true,
    category: 'Lifestyle'
  },
  // Redtape Products
  {
    name: 'Redtape Casual Sneaker',
    slug: 'redtape-casual-sneaker',
    description: 'Comfortable and stylish casual sneaker perfect for everyday wear.',
    price: 3200,
    sale_price: 2560,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy', 'Grey'],
    stock: 80,
    rating: 4.4,
    review_count: 189,
    is_featured: true,
    is_trending: true,
    category: 'Casual'
  },
  // Converse Products
  {
    name: 'Chuck Taylor All Star',
    slug: 'converse-chuck-taylor',
    description: 'The iconic canvas sneaker that started it all.',
    price: 5200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red', 'Navy'],
    stock: 100,
    rating: 4.6,
    review_count: 445,
    is_featured: false,
    is_trending: true,
    category: 'Lifestyle'
  },
  // Vans Products
  {
    name: 'Old Skool',
    slug: 'vans-old-skool',
    description: 'The Vans classic with the iconic side stripe.',
    price: 5600,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Navy', 'Checkered'],
    stock: 75,
    rating: 4.7,
    review_count: 312,
    is_featured: true,
    is_trending: false,
    category: 'Skateboarding'
  }
];

const mockCoupons = [
  {
    code: 'WELCOME10',
    name: 'Welcome Discount',
    description: 'Get 10% off on your first order',
    discount_type: 'percentage',
    discount_value: 10,
    min_purchase: 1000,
    max_discount: 500,
    usage_limit: 1000,
    valid_from: new Date(),
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    is_active: true
  },
  {
    code: 'SAVE500',
    name: 'Flat ₹500 Off',
    description: 'Get ₹500 off on orders above ₹3000',
    discount_type: 'fixed',
    discount_value: 500,
    min_purchase: 3000,
    usage_limit: 500,
    valid_from: new Date(),
    valid_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    is_active: true
  },
  {
    code: 'FREESHIP',
    name: 'Free Shipping',
    description: 'Free shipping on all orders',
    discount_type: 'fixed',
    discount_value: 100,
    min_purchase: 0,
    usage_limit: 2000,
    valid_from: new Date(),
    valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    is_active: true,
    conditions: {
      free_shipping: true
    }
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await User.deleteMany({});
    await Coupon.deleteMany({});
    console.log('Existing data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Seed brands
const seedBrands = async () => {
  try {
    const brands = await Brand.insertMany(mockBrands);
    console.log(`${brands.length} brands seeded successfully`);
    return brands;
  } catch (error) {
    console.error('Error seeding brands:', error);
    return [];
  }
};

// Seed products
const seedProducts = async (brands) => {
  try {
    const brandMap = {};
    brands.forEach(brand => {
      brandMap[brand.slug] = brand._id;
    });

    const productsWithBrandIds = mockProducts.map(product => {
      // Find brand by name (assuming first word is brand name)
      const brandName = product.name.split(' ')[0].toLowerCase();
      let brandId = brandMap['nike']; // default to nike

      if (brandName === 'adidas') brandId = brandMap['adidas'];
      else if (brandName === 'puma') brandId = brandMap['puma'];
      else if (brandName === 'redtape') brandId = brandMap['redtape'];
      else if (brandName === 'chuck' || brandName === 'converse') brandId = brandMap['converse'];
      else if (brandName === 'old' || brandName === 'vans') brandId = brandMap['vans'];

      return {
        ...product,
        brand_id: brandId
      };
    });

    const products = await Product.insertMany(productsWithBrandIds);
    console.log(`${products.length} products seeded successfully`);
    return products;
  } catch (error) {
    console.error('Error seeding products:', error);
    return [];
  }
};

// Seed admin user
const seedAdminUser = async () => {
  try {
    const adminUser = await User.create({
      email: 'admin@shoecommerce.com',
      password: 'admin123',
      full_name: 'Admin User',
      role: 'admin',
      email_verified: true,
      is_active: true
    });
    console.log('Admin user created successfully');
    return adminUser;
  } catch (error) {
    console.error('Error creating admin user:', error);
    return null;
  }
};

// Seed test user
const seedTestUser = async () => {
  try {
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'test123',
      full_name: 'Test User',
      role: 'user',
      email_verified: true,
      is_active: true
    });
    console.log('Test user created successfully');
    return testUser;
  } catch (error) {
    console.error('Error creating test user:', error);
    return null;
  }
};

// Seed coupons
const seedCoupons = async () => {
  try {
    const coupons = await Coupon.insertMany(mockCoupons);
    console.log(`${coupons.length} coupons seeded successfully`);
    return coupons;
  } catch (error) {
    console.error('Error seeding coupons:', error);
    return [];
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    await connectDB();
    await clearData();
    
    const brands = await seedBrands();
    const products = await seedProducts(brands);
    const adminUser = await seedAdminUser();
    const testUser = await seedTestUser();
    const coupons = await seedCoupons();
    
    console.log('\n=== Seeding Summary ===');
    console.log(`Brands: ${brands.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Admin User: ${adminUser ? 'Created' : 'Failed'}`);
    console.log(`Test User: ${testUser ? 'Created' : 'Failed'}`);
    console.log(`Coupons: ${coupons.length}`);
    console.log('\nDatabase seeding completed successfully!');
    
    console.log('\n=== Login Credentials ===');
    console.log('Admin: admin@shoecommerce.com / admin123');
    console.log('Test User: test@example.com / test123');
    
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run seeding
seedDatabase();
