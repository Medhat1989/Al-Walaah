import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Flame, 
  Cpu, 
  Bell, 
  Eye, 
  ShieldCheck,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  icon: React.ElementType;
  image: string;
  isSmart?: boolean;
}

const products: Product[] = [
  // Fire Extinguishers (Traditional)
  {
    id: 'ext-1',
    name: 'Standard ABC Dry Powder Extinguisher',
    category: 'Fire Extinguishers',
    price: 250,
    description: 'Versatile fire protection for Class A, B, and C fires. Essential for home and office.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1599708153386-62e257e1273d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'ext-2',
    name: 'CO2 Fire Extinguisher (5kg)',
    category: 'Fire Extinguishers',
    price: 450,
    description: 'Ideal for electrical fires and flammable liquids. Leaves no residue.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1618412664575-9019b60826ca?auto=format&fit=crop&q=80&w=800',
  },
  // Fire Extinguishers (Smart)
  {
    id: 'ext-smart-1',
    name: 'Smart IoT Fire Extinguisher',
    category: 'Fire Extinguishers',
    isSmart: true,
    price: 1200,
    description: 'Connected fire extinguisher with real-time pressure monitoring and location tracking.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800',
  },
  // Smoke Detectors
  {
    id: 'smoke-1',
    name: 'Intelligent Smoke Detector System',
    category: 'Smoke Detectors',
    price: 350,
    description: 'High-sensitivity photoelectric sensor with wireless interconnectivity.',
    icon: Bell,
    image: 'https://images.unsplash.com/photo-1583907659441-ae3489fb391a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'smoke-2',
    name: 'Advanced Heat & Smoke Combo',
    category: 'Smoke Detectors',
    price: 550,
    description: 'Dual-sensor technology for early detection of both smoldering and fast-flaming fires.',
    icon: Bell,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800',
  },
  // CCTVs
  {
    id: 'cctv-1',
    name: '4K Ultra HD Security Camera',
    category: 'CCTV Systems',
    price: 850,
    description: 'Crystal clear 4K resolution with night vision and AI motion detection.',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'cctv-2',
    name: '360° PTZ Smart Camera',
    category: 'CCTV Systems',
    price: 1500,
    description: 'Full panoramic coverage with auto-tracking and two-way audio communication.',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1521110604736-9643b99f6026?auto=format&fit=crop&q=80&w=800',
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-safety-red/30">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-safety-red/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-security-blue/10 blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/">
            <motion.div 
              className="liquid-glass inline-flex items-center gap-2 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              <span className="font-bold">Back to Home</span>
            </motion.div>
          </Link>
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tighter mb-6">
              OUR <span className="text-gradient-red">PRODUCTS</span>
            </h1>
            <p className="text-white/40 text-xl max-w-2xl">
              Equip your facility with the latest in fire safety and security technology. 
              All our products comply with SASO and international standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="liquid-glass p-0 rounded-[32px] h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08] overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center ${
                      product.isSmart ? 'bg-gradient-to-br from-security-blue to-blue-600' : 'bg-gradient-to-br from-safety-red to-red-600'
                    } text-white shadow-lg backdrop-blur-md`}>
                      <product.icon size={24} />
                    </div>
                  </div>

                  <div className="p-8 flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                        {product.category}
                      </span>
                      {product.isSmart && (
                        <span className="text-[10px] font-bold tracking-widest uppercase bg-security-blue/20 text-security-blue px-2 py-0.5 rounded-full">
                          Smart Tech
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-safety-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-white/50 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="px-8 pb-8 mt-auto">
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="text-2xl font-display font-bold">
                        {product.price} <span className="text-xs text-white/40 ml-1">SAR</span>
                      </div>
                      <motion.button 
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-safety-red transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingCart size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/20 text-sm">
            © 2026 Alwaalah Fire & Security. All prices are inclusive of VAT.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
