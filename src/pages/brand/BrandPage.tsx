import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../../components/product/ProductCard';
import { mockProducts, mockBrands } from '../../lib/mockData';

export const BrandPage = () => {
  const { brandSlug } = useParams();
  const brand = mockBrands.find(b => b.slug === brandSlug);
  const brandProducts = mockProducts.filter(p => p.brand?.slug === brandSlug);

  const [sortBy, setSortBy] = useState('popular');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  // INR range per requirement
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 3000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = brandProducts
    .filter(p => genderFilter === 'all' || p.gender === genderFilter)
    .filter(p => {
      const price = p.sale_price || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return (a.sale_price || a.price) - (b.sale_price || b.price);
      if (sortBy === 'price-high') return (b.sale_price || b.price) - (a.sale_price || a.price);
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.rating - a.rating;
    });

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      {/* Light background image */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1920')`
          }}
        ></div>
      </div>
      
      <div
        className="h-64 bg-gradient-to-r from-blue-600 to-cyan-500 relative"
        style={{
          backgroundImage: `url(${brand.logo_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">{brand.name}</h1>
            <p className="text-xl">{brand.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Gender</label>
                  <div className="space-y-2">
                    {['all', 'men', 'women', 'unisex', 'kids'].map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          checked={genderFilter === gender}
                          onChange={() => setGenderFilter(gender)}
                          className="mr-2"
                        />
                        <span className="capitalize">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([500, parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setGenderFilter('all');
                    setPriceRange([500, 3000]);
                  }}
                  className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Reset Filters
                </motion.button>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${sortBy}-${genderFilter}-${priceRange.join('-')}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-xl text-gray-600">No products found matching your filters</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
