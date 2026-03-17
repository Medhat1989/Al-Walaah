/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Shield, 
  Flame, 
  Bell, 
  Eye, 
  Cpu, 
  ClipboardCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { services, contactInfo } from './constants';
import ServiceRequest from './pages/ServiceRequest';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          animate={{ 
            marginTop: isScrolled ? "1rem" : "2rem",
            paddingTop: isScrolled ? "0.75rem" : "1rem",
            paddingBottom: isScrolled ? "0.75rem" : "1rem",
            borderRadius: isScrolled ? "1.5rem" : "2rem",
          }}
          className="liquid-glass px-6 flex items-center justify-between transition-all duration-500"
        >
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={contactInfo.logo} alt="Alwaalah Logo" className="h-16 md:h-20 w-auto" referrerPolicy="no-referrer" />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Projects', 'Contact'].map((item) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-safety-red transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a 
              href={`tel:${contactInfo.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-2 text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all"
            >
              <Phone size={16} />
              Call Us
            </motion.a>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-6 right-6 mt-4 md:hidden"
          >
            <div className="liquid-glass rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
              {['Services', 'About', 'Projects', 'Contact'].map((item) => (
                <motion.a 
                  key={item} 
                  variants={itemVariants}
                  href={`#${item.toLowerCase()}`} 
                  className="text-2xl font-display font-bold py-2 flex items-center justify-between group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="group-hover:text-safety-red transition-colors">{item}</span>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-safety-red group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
              <motion.a 
                variants={itemVariants}
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-bold text-lg mt-4 shadow-xl"
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} />
                {contactInfo.phone}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-safety-red/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-security-blue/20 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            PROTECTING <br />
            <span className="text-gradient-red">WHAT MATTERS</span> <br />
            MOST.
          </h1>
          
          <p className="text-lg text-white/50 max-w-lg mb-10 leading-relaxed">
            Alwaalah provides cutting-edge fire safety and security integration across Saudi Arabia. 
            From Civil Defense permits to AI-driven surveillance, we secure your future.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/request-service">
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                Request Service <ArrowRight size={20} />
              </button>
            </Link>
            <button className="px-8 py-4 liquid-glass rounded-2xl font-bold hover:bg-white/5 transition-colors">
              Our Services
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold font-display">15+</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display">2.5k</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Projects Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-display">100%</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Compliance</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 liquid-glass aspect-square rounded-[40px] overflow-hidden group">
            <img 
              src="https://i.ibb.co/twzqh8q3/fireball.png" 
              alt="High Tech fire system" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute top-8 right-8 text-right">
              <div className="font-display text-xl font-bold tracking-tight text-white drop-shadow-2xl">
                High Tech <br />
                <span className="text-safety-red">fire system</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-20 liquid-glass p-6 rounded-3xl hidden md:block"
          >
            <Shield size={32} className="text-security-blue mb-2" />
            <div className="text-xs font-bold uppercase tracking-widest text-white/40">Secure</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-10 z-20 liquid-glass p-6 rounded-3xl hidden md:block"
          >
            <Zap size={32} className="text-safety-orange mb-2" />
            <div className="text-xs font-bold uppercase tracking-widest text-white/40">Fast Response</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="liquid-glass p-8 rounded-[32px] h-full transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08]">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 text-white shadow-lg`}>
          <service.icon size={32} />
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
        <p className="text-white/50 leading-relaxed mb-8">
          {service.description}
        </p>
        
        <button className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
          Learn More <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-safety-red mb-4">Our Expertise</h2>
            <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              COMPREHENSIVE <br />
              SAFETY SOLUTIONS
            </h3>
          </div>
          <p className="text-white/40 max-w-sm mb-2">
            We offer a full spectrum of fire protection and security services tailored to the unique needs of the Saudi market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="liquid-glass rounded-[32px] md:rounded-[48px] overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-20 bg-gradient-to-br from-white/5 to-transparent">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">Let's Secure Your <br className="hidden md:block" /> Future Together.</h2>
            <p className="text-white/50 mb-12 text-lg">
              Have a project in mind or need a safety consultation? Our team of experts is ready to assist you anywhere in the Kingdom.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-safety-red">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest font-bold">Call Us</div>
                  <div className="text-lg md:text-xl font-bold">{contactInfo.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-security-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest font-bold">Email Us</div>
                  <div className="text-lg md:text-xl font-bold">{contactInfo.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-safety-orange">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[10px] md:text-sm text-white/40 uppercase tracking-widest font-bold">Visit Us</div>
                  <div className="text-lg md:text-xl font-bold">{contactInfo.address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-20 border-t lg:border-t-0 lg:border-l border-white/10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-safety-red transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-safety-red transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Service Needed</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-safety-red transition-colors appearance-none">
                  <option className="bg-black">Civil Defense Permits</option>
                  <option className="bg-black">Fire Alarm Systems</option>
                  <option className="bg-black">Smart Surveillance</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-safety-red transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all active:scale-[0.98]">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center mb-8">
              <img src={contactInfo.logo} alt="Alwaalah Logo" className="h-20 md:h-24 w-auto" referrerPolicy="no-referrer" />
            </div>
            <p className="text-white/40 max-w-md leading-relaxed">
              Saudi Arabia's premier fire safety and security systems provider. 
              Dedicated to protecting lives and property through innovation and excellence.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-white/60">Quick Links</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-white/60">Services</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Civil Defense</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fire Systems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Surveillance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="text-white/30 text-sm">
            © {new Date().getFullYear()} Alwaalah Safety & Security. All rights reserved.
          </div>
          <div className="flex gap-8 text-white/30 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

interface EntranceProps {
  onEnter: () => void;
}

const EntranceScreen: React.FC<EntranceProps> = ({ onEnter }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnter();
    }, 4000); // Auto-navigate after 4 seconds
    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-12"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-safety-red/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-security-blue/10 blur-[120px]" />
        
        {/* Splash Mist Effect */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-64 h-64 rounded-full bg-white/5 blur-[60px]"
            initial={{ 
              x: "-50%", 
              y: "-50%", 
              scale: 0.5, 
              opacity: 0 
            }}
            animate={{ 
              scale: [1, 2, 1.5],
              opacity: [0, 0.2, 0],
              x: ["-50%", `${-50 + (Math.random() * 40 - 20)}%`],
              y: ["-50%", `${-50 + (Math.random() * 40 - 20)}%`],
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer relative group"
          onClick={onEnter}
        >
          {/* Light line around effect */}
          <div className="absolute -inset-8 rounded-full border border-white/5 blur-sm" />
          <motion.div 
            className="absolute -inset-8 rounded-full border border-white/20"
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />
          
          <img 
            src="https://i.ibb.co/yBXnHVHC/l1j-removebg-preview.png" 
            alt="Logo Part 1" 
            className="h-40 md:h-64 object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4, 
            delay: 0.5,
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer transition-all duration-300"
          onClick={onEnter}
        >
          <img 
            src="https://i.ibb.co/BH3ddRHX/l2.png" 
            alt="Logo Part 2" 
            className="h-16 md:h-24 object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Subtle loading indicator instead of button */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-[1px] bg-white/20 mt-4"
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="font-sans antialiased bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <EntranceScreen key="entrance" onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-service" element={<ServiceRequest />} />
      </Routes>
    </div>
  );
}
