import { Brand, Product } from '../types';

export const mockBrands: Brand[] = [
  { id: '1', name: 'Nike', slug: 'nike', logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Just Do It' },
  { id: '2', name: 'Adidas', slug: 'adidas', logo_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400', description: 'Impossible Is Nothing' },
  { id: '3', name: 'Puma', slug: 'puma', logo_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', description: 'Forever Faster' },
  { id: '4', name: 'Reebok', slug: 'reebok', logo_url: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400', description: 'Be More Human' },
  { id: '5', name: 'Converse', slug: 'converse', logo_url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', description: 'All Star Legacy' },
  { id: '6', name: 'Vans', slug: 'vans', logo_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', description: 'Off The Wall' },
  { id: '7', name: 'New Balance', slug: 'new-balance', logo_url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', description: 'Always In Beta' },
  { id: '8', name: 'Skechers', slug: 'skechers', logo_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', description: 'Comfort Technology' },
  { id: '9', name: 'Redtape', slug: 'redtape', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbc4BAF4suK6hmdWRDeg2x28_PtAeSFH4MFA&s', description: 'Style Meets Comfort' },
  { id: '10', name: 'Woodland', slug: 'woodland', logo_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', description: 'Adventure Awaits' },
  { id: '11', name: 'Bata', slug: 'bata', logo_url: 'https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/y/5/y/-original-imahan4bmtdpupq4.jpeg?q=90&crop=false', description: 'Comfort for Everyone' },
  { id: '12', name: 'Sparx', slug: 'sparx', logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkm9228mBzjWqNp0QLn2uxWCPZf3P9Ij6JjA&s', description: 'Step Into Style' },
];

export const mockProducts: Product[] = [
  // Nike Products
  {
    id: '1',
    brand_id: '1',
    brand: mockBrands[0],
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
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    brand_id: '1',
    brand: mockBrands[0],
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
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    brand_id: '1',
    brand: mockBrands[0],
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
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'React Element 55',
    slug: 'nike-react-element-55',
    description: 'The Nike React Element 55 delivers a fresh take on the classic running shoe.',
    price: 9500,
    sale_price: 2999,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Grey'],
    stock: 35,
    rating: 4.4,
    review_count: 89,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Adidas Products
  {
    id: '5',
    brand_id: '2',
    brand: mockBrands[1],
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
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    brand_id: '2',
    brand: mockBrands[1],
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
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'NMD R1',
    slug: 'adidas-nmd-r1',
    description: 'The NMD R1 combines retro running with modern street style.',
    price: 10800,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Blue'],
    stock: 40,
    rating: 4.6,
    review_count: 167,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Puma Products
  {
    id: '8',
    brand_id: '3',
    brand: mockBrands[2],
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
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Suede Classic',
    slug: 'puma-suede-classic',
    description: 'The Puma Suede Classic is a timeless sneaker that never goes out of style.',
    price: 6500,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red'],
    stock: 55,
    rating: 4.5,
    review_count: 134,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Redtape Products
  {
    id: '10',
    brand_id: '9',
    brand: mockBrands[8],
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
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Sports Walking Shoes',
    slug: 'redtape-sports-walking',
    description: 'Perfect for walking and light exercise with superior comfort.',
    price: 2800,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Blue'],
    stock: 65,
    rating: 4.3,
    review_count: 156,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Lifestyle Sneakers',
    slug: 'redtape-lifestyle-sneakers',
    description: 'Stylish lifestyle sneakers that blend comfort with contemporary design.',
    price: 3600,
    gender: 'women',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Pink', 'White', 'Purple'],
    stock: 45,
    rating: 4.6,
    review_count: 98,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '13',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Athleisure Shoes',
    slug: 'redtape-athleisure',
    description: 'Versatile athleisure shoes perfect for both gym and casual outings.',
    price: 4200,
    sale_price: 3360,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Grey', 'White'],
    stock: 70,
    rating: 4.5,
    review_count: 203,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Converse Products
  {
    id: '14',
    brand_id: '5',
    brand: mockBrands[4],
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
    created_at: new Date().toISOString()
  },
  {
    id: '15',
    brand_id: '5',
    brand: mockBrands[4],
    name: 'Chuck 70',
    slug: 'converse-chuck-70',
    description: 'Premium version of the classic Chuck Taylor with enhanced comfort.',
    price: 7200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Cream'],
    stock: 60,
    rating: 4.7,
    review_count: 178,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Vans Products
  {
    id: '16',
    brand_id: '6',
    brand: mockBrands[5],
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
    created_at: new Date().toISOString()
  },
  {
    id: '17',
    brand_id: '6',
    brand: mockBrands[5],
    name: 'Sk8-Hi',
    slug: 'vans-sk8-hi',
    description: 'High-top skateboarding shoe with classic Vans style.',
    price: 6400,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red'],
    stock: 50,
    rating: 4.5,
    review_count: 145,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // New Balance Products
  {
    id: '18',
    brand_id: '7',
    brand: mockBrands[6],
    name: '574 Core',
    slug: 'new-balance-574',
    description: 'The perfect blend of heritage and modern comfort.',
    price: 6800,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Grey', 'Navy', 'Burgundy'],
    stock: 45,
    rating: 4.4,
    review_count: 178,
    is_featured: false,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '19',
    brand_id: '7',
    brand: mockBrands[6],
    name: '990v5',
    slug: 'new-balance-990v5',
    description: 'Premium running shoe with superior comfort and style.',
    price: 15600,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Grey', 'Black', 'White'],
    stock: 25,
    rating: 4.8,
    review_count: 89,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Woodland Products
  {
    id: '20',
    brand_id: '10',
    brand: mockBrands[9],
    name: 'Woodland Adventure Boots',
    slug: 'woodland-adventure-boots',
    description: 'Rugged outdoor boots perfect for adventure and hiking.',
    price: 4500,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Tan'],
    stock: 40,
    rating: 4.2,
    review_count: 112,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Bata Products
  {
    id: '21',
    brand_id: '11',
    brand: mockBrands[10],
    name: 'Bata Comfort Plus',
    slug: 'bata-comfort-plus',
    description: 'Comfortable everyday shoes with superior cushioning.',
    price: 2200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown', 'Navy'],
    stock: 90,
    rating: 4.1,
    review_count: 234,
    is_featured: false,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Sparx Products
  {
    id: '22',
    brand_id: '12',
    brand: mockBrands[11],
    name: 'Sparx Sports Shoes',
    slug: 'sparx-sports-shoes',
    description: 'Affordable sports shoes with great comfort and durability.',
    price: 1800,
    sale_price: 1440,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    stock: 120,
    rating: 4.0,
    review_count: 167,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Additional Nike Products
  {
    id: '23',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'Air Jordan 4',
    slug: 'nike-air-jordan-4',
    description: 'Classic basketball shoe with timeless design and premium comfort.',
    price: 15000,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Red', 'Blue'],
    stock: 30,
    rating: 4.8,
    review_count: 89,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '24',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'Dunk Low',
    slug: 'nike-dunk-low',
    description: 'Skateboarding inspired sneaker with classic silhouette.',
    price: 7500,
    sale_price: 2999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White/Black', 'Panda', 'Green'],
    stock: 65,
    rating: 4.6,
    review_count: 234,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Additional Adidas Products
  {
    id: '25',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'Yeezy Boost 350',
    slug: 'adidas-yeezy-boost-350',
    description: 'Revolutionary running shoe with Boost technology.',
    price: 25000,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Cream', 'Black', 'White'],
    stock: 15,
    rating: 4.9,
    review_count: 156,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '26',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'Gazelle',
    slug: 'adidas-gazelle',
    description: 'Classic suede sneaker with timeless appeal.',
    price: 6800,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Blue', 'Green', 'Pink'],
    stock: 55,
    rating: 4.4,
    review_count: 178,
    is_featured: false,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Puma Products
  {
    id: '27',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Cali Sport',
    slug: 'puma-cali-sport',
    description: 'Retro-inspired sneaker with modern comfort.',
    price: 7200,
    gender: 'women',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White', 'Pink', 'Black'],
    stock: 40,
    rating: 4.3,
    review_count: 92,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '28',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Thunder Spectra',
    slug: 'puma-thunder-spectra',
    description: 'Bold chunky sneaker with futuristic design.',
    price: 9500,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Multi', 'Black', 'White'],
    stock: 35,
    rating: 4.5,
    review_count: 134,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Redtape Products
  {
    id: '29',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Running Shoes',
    slug: 'redtape-running-shoes',
    description: 'High-performance running shoes with advanced cushioning.',
    price: 3800,
    sale_price: 3040,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue', 'Red'],
    stock: 85,
    rating: 4.5,
    review_count: 267,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '30',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Canvas Shoes',
    slug: 'redtape-canvas-shoes',
    description: 'Classic canvas sneakers perfect for casual wear.',
    price: 2200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Navy', 'Grey'],
    stock: 95,
    rating: 4.2,
    review_count: 189,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '31',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Formal Shoes',
    slug: 'redtape-formal-shoes',
    description: 'Elegant formal shoes for business and special occasions.',
    price: 4500,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown', 'Tan'],
    stock: 60,
    rating: 4.6,
    review_count: 145,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Converse Products
  {
    id: '32',
    brand_id: '5',
    brand: mockBrands[4],
    name: 'Chuck Taylor High Top',
    slug: 'converse-chuck-taylor-high',
    description: 'Classic high-top canvas sneaker with iconic style.',
    price: 5800,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red', 'Navy'],
    stock: 70,
    rating: 4.7,
    review_count: 298,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '33',
    brand_id: '5',
    brand: mockBrands[4],
    name: 'One Star',
    slug: 'converse-one-star',
    description: 'Minimalist sneaker with clean design and comfort.',
    price: 6500,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Grey'],
    stock: 45,
    rating: 4.4,
    review_count: 156,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Additional Vans Products
  {
    id: '34',
    brand_id: '6',
    brand: mockBrands[5],
    name: 'Authentic',
    slug: 'vans-authentic',
    description: 'Classic low-top skate shoe with timeless design.',
    price: 5200,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'Navy', 'Red'],
    stock: 80,
    rating: 4.6,
    review_count: 223,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '35',
    brand_id: '6',
    brand: mockBrands[5],
    name: 'Era',
    slug: 'vans-era',
    description: 'Padded collar skate shoe with enhanced comfort.',
    price: 5600,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue'],
    stock: 65,
    rating: 4.5,
    review_count: 187,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional New Balance Products
  {
    id: '36',
    brand_id: '7',
    brand: mockBrands[6],
    name: '327',
    slug: 'new-balance-327',
    description: 'Retro-inspired running shoe with modern comfort.',
    price: 8500,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Grey', 'Navy'],
    stock: 50,
    rating: 4.7,
    review_count: 198,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '37',
    brand_id: '7',
    brand: mockBrands[6],
    name: '2002R',
    slug: 'new-balance-2002r',
    description: 'Premium running shoe with advanced technology.',
    price: 12000,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Grey', 'Black', 'White'],
    stock: 25,
    rating: 4.8,
    review_count: 112,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Woodland Products
  {
    id: '38',
    brand_id: '10',
    brand: mockBrands[9],
    name: 'Woodland Casual Sneakers',
    slug: 'woodland-casual-sneakers',
    description: 'Comfortable casual sneakers for everyday wear.',
    price: 3500,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Navy'],
    stock: 75,
    rating: 4.3,
    review_count: 156,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '39',
    brand_id: '10',
    brand: mockBrands[9],
    name: 'Woodland Hiking Boots',
    slug: 'woodland-hiking-boots',
    description: 'Durable hiking boots for outdoor adventures.',
    price: 5500,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Green'],
    stock: 40,
    rating: 4.4,
    review_count: 89,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Bata Products
  {
    id: '40',
    brand_id: '11',
    brand: mockBrands[10],
    name: 'Bata Sports Shoes',
    slug: 'bata-sports-shoes',
    description: 'Comfortable sports shoes for active lifestyle.',
    price: 2800,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    stock: 110,
    rating: 4.2,
    review_count: 234,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '41',
    brand_id: '11',
    brand: mockBrands[10],
    name: 'Bata Formal Shoes',
    slug: 'bata-formal-shoes',
    description: 'Classic formal shoes for business occasions.',
    price: 3200,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown', 'Tan'],
    stock: 85,
    rating: 4.1,
    review_count: 167,
    is_featured: false,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Additional Sparx Products
  {
    id: '42',
    brand_id: '12',
    brand: mockBrands[11],
    name: 'Sparx Casual Sneakers',
    slug: 'sparx-casual-sneakers',
    description: 'Stylish casual sneakers for everyday comfort.',
    price: 1600,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Grey', 'Blue'],
    stock: 130,
    rating: 4.0,
    review_count: 189,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '43',
    brand_id: '12',
    brand: mockBrands[11],
    name: 'Sparx Running Shoes',
    slug: 'sparx-running-shoes',
    description: 'Lightweight running shoes with good cushioning.',
    price: 1000,
    sale_price: 600,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1102777/pexels-photo-1102777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red', 'Green'],
    stock: 95,
    rating: 4.1,
    review_count: 145,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // More Nike
  {
    id: '44',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'Nike Pegasus 40',
    slug: 'nike-pegasus-40',
    description: 'Daily trainer with responsive cushioning for neutral runners.',
    price: 2999,
    gender: 'men',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0wE8y1184HfABNWD4BZSHaSy-tlS4S8W4Q&s'
    ],
    sizes: ['7','8','9','10','11'],
    colors: ['Black','Blue','Volt'],
    stock: 70,
    rating: 4.6,
    review_count: 312,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '45',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'Nike Revolution 6',
    slug: 'nike-revolution-6',
    description: 'Lightweight breathable upper with durable outsole grip.',
    price: 2799,
    gender: 'women',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2E_fvKJwFgGsQljLeaRzkoWmYQM09Q809Q&s'
    ],
    sizes: ['5','6','7','8','9'],
    colors: ['Pink','White','Grey'],
    stock: 85,
    rating: 4.4,
    review_count: 201,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // More Adidas
  {
    id: '46',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'Adidas Superstar',
    slug: 'adidas-superstar',
    description: 'Iconic shell-toe sneaker loved by generations.',
    price: 7999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['White/Black','White/Gold'],
    stock: 120,
    rating: 4.7,
    review_count: 1043,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '47',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'Adidas Forum Low',
    slug: 'adidas-forum-low',
    description: 'Retro basketball-inspired silhouette with strap.',
    price: 8999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/631165/pexels-photo-631165.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['White','Blue','Black'],
    stock: 60,
    rating: 4.5,
    review_count: 389,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // More Puma
  {
    id: '48',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Puma Rider FV',
    slug: 'puma-rider-fv',
    description: 'Heritage runner with bold color blocking.',
    price: 6999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Multi','White','Black'],
    stock: 55,
    rating: 4.3,
    review_count: 146,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '49',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Puma Smash v2',
    slug: 'puma-smash-v2',
    description: 'Clean court style with soft suede upper.',
    price: 4499,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7','8','9','10','11'],
    colors: ['Navy','Black','White'],
    stock: 90,
    rating: 4.2,
    review_count: 210,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // More Redtape
  {
    id: '50',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Knit Runner',
    slug: 'redtape-knit-runner',
    description: 'Breathable knit upper with lightweight cushioning.',
    price: 2999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['Grey','Black','Blue'],
    stock: 140,
    rating: 4.1,
    review_count: 178,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '51',
    brand_id: '9',
    brand: mockBrands[8],
    name: 'Redtape Leather Derby',
    slug: 'redtape-leather-derby',
    description: 'Premium leather formal with cushioned insole.',
    price: 4899,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7','8','9','10','11'],
    colors: ['Black','Brown'],
    stock: 65,
    rating: 4.3,
    review_count: 96,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Converse extras
  {
    id: '52',
    brand_id: '5',
    brand: mockBrands[4],
    name: 'Converse Run Star Hike',
    slug: 'converse-run-star-hike',
    description: 'Chunky platform sole updates the classic Chuck.',
    price: 8999,
    gender: 'women',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['5','6','7','8','9'],
    colors: ['White','Black'],
    stock: 58,
    rating: 4.6,
    review_count: 241,
    is_featured: true,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Vans extras
  {
    id: '53',
    brand_id: '6',
    brand: mockBrands[5],
    name: 'Vans Slip-On',
    slug: 'vans-slip-on',
    description: 'Laceless classic with signature waffle outsole.',
    price: 4999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['Checkerboard','Black','White'],
    stock: 150,
    rating: 4.7,
    review_count: 512,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // New Balance extras
  {
    id: '54',
    brand_id: '7',
    brand: mockBrands[6],
    name: 'New Balance 650',
    slug: 'new-balance-650',
    description: 'High-top take on the iconic 550 courts.',
    price: 12999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7','8','9','10','11','12'],
    colors: ['White/Green','White/Black'],
    stock: 32,
    rating: 4.6,
    review_count: 121,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },

  // Woodland extras
  {
    id: '55',
    brand_id: '10',
    brand: mockBrands[9],
    name: 'Woodland Trekker',
    slug: 'woodland-trekker',
    description: 'All-terrain outdoor shoe with rugged outsole.',
    price: 4999,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7','8','9','10','11'],
    colors: ['Brown','Olive','Black'],
    stock: 44,
    rating: 4.2,
    review_count: 88,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Bata extras
  {
    id: '56',
    brand_id: '11',
    brand: mockBrands[10],
    name: 'Bata Power Running',
    slug: 'bata-power-running',
    description: 'Budget-friendly running shoe with flexible outsole.',
    price: 2499,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Blue','Grey','Black'],
    stock: 160,
    rating: 4.0,
    review_count: 203,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Sparx extras
  {
    id: '57',
    brand_id: '12',
    brand: mockBrands[11],
    name: 'Sparx Mesh Runner',
    slug: 'sparx-mesh-runner',
    description: 'Breathable mesh upper and cushioned midsole.',
    price: 1699,
    gender: 'men',
    images: [
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Black','Red','Blue'],
    stock: 190,
    rating: 4.1,
    review_count: 156,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },

  // Low-price additions to meet ₹500–₹4000 across all brands
  {
    id: '62',
    brand_id: '1',
    brand: mockBrands[0],
    name: 'Nike Court Royale 2',
    slug: 'nike-court-royale-2',
    description: 'Classic court style with durable sole.',
    price: 3999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1448052/pexels-photo-1448052.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['White','Black'],
    stock: 120,
    rating: 4.4,
    review_count: 215,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '63',
    brand_id: '2',
    brand: mockBrands[1],
    name: 'Adidas Lite Racer',
    slug: 'adidas-lite-racer',
    description: 'Lightweight comfort for everyday wear.',
    price: 3499,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/631165/pexels-photo-631165.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Black','Grey','Navy'],
    stock: 140,
    rating: 4.3,
    review_count: 178,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '64',
    brand_id: '3',
    brand: mockBrands[2],
    name: 'Puma Shuffle',
    slug: 'puma-shuffle',
    description: 'Clean cupsole with soft feel.',
    price: 3299,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['White','Black'],
    stock: 110,
    rating: 4.2,
    review_count: 132,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '65',
    brand_id: '4',
    brand: mockBrands[3],
    name: 'Reebok Runner 4.0',
    slug: 'reebok-runner-4-0',
    description: 'Everyday runner with EVA cushioning.',
    price: 2999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/669410/pexels-photo-669410.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Black','Blue'],
    stock: 90,
    rating: 4.1,
    review_count: 119,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '66',
    brand_id: '5',
    brand: mockBrands[4],
    name: 'Converse Chuck Low',
    slug: 'converse-chuck-low',
    description: 'Low-top classic canvas sneaker.',
    price: 3999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2562873/pexels-photo-2562873.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11','12'],
    colors: ['Black','White','Red'],
    stock: 150,
    rating: 4.5,
    review_count: 410,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '67',
    brand_id: '6',
    brand: mockBrands[5],
    name: 'Vans Atwood',
    slug: 'vans-atwood',
    description: 'Skate-inspired low with waffle outsole.',
    price: 3599,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Black/White','Navy'],
    stock: 130,
    rating: 4.4,
    review_count: 267,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  },
  {
    id: '68',
    brand_id: '7',
    brand: mockBrands[6],
    name: 'New Balance 410',
    slug: 'new-balance-410',
    description: 'Lightweight retro runner for casual wear.',
    price: 3499,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['7','8','9','10','11'],
    colors: ['Grey','Navy'],
    stock: 85,
    rating: 4.2,
    review_count: 141,
    is_featured: false,
    is_trending: true,
    created_at: new Date().toISOString()
  },
  {
    id: '69',
    brand_id: '8',
    brand: mockBrands[7],
    name: 'Skechers Stamina',
    slug: 'skechers-stamina',
    description: 'Comfort-driven everyday sneaker.',
    price: 3999,
    gender: 'unisex',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sizes: ['6','7','8','9','10','11'],
    colors: ['Black','Grey','Navy'],
    stock: 170,
    rating: 4.3,
    review_count: 199,
    is_featured: true,
    is_trending: false,
    created_at: new Date().toISOString()
  }
];
