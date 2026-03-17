import { motion } from 'motion/react';
import { Shield, Flame, Bell, Eye, Cpu, ClipboardCheck, Phone, Mail, MapPin, ChevronRight, ExternalLink } from 'lucide-react';

export const services = [
  {
    id: 'permits',
    title: 'Civil Defense Permits',
    description: 'Expert guidance and processing for all Saudi Civil Defense regulatory requirements and safety certificates.',
    icon: ClipboardCheck,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'extinguishing',
    title: 'Fire Extinguishing Systems',
    description: 'Design, installation, and maintenance of advanced water, foam, and gas-based suppression systems.',
    icon: Flame,
    color: 'from-red-500 to-rose-700',
  },
  {
    id: 'alarm',
    title: 'Fire Alarm Maintenance',
    description: '24/7 monitoring and preventive maintenance for early detection systems to ensure maximum reliability.',
    icon: Bell,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'surveillance',
    title: 'Smart Surveillance',
    description: 'AI-powered CCTV and monitoring solutions providing real-time analytics and high-definition security.',
    icon: Eye,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'integration',
    title: 'System Integration',
    description: 'Seamlessly connecting fire, security, and building management systems into a unified control interface.',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'consultation',
    title: 'Safety Consultations',
    description: 'Comprehensive risk assessments and strategic safety planning for commercial and industrial facilities.',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
  },
];

export const contactInfo = {
  phone: '+966 123 456 789',
  email: 'info@alwaalah.com',
  address: 'Riyadh, Saudi Arabia',
  logo: 'https://i.ibb.co/5W1nK0gs/alwalaah-logo-2-removebg-preview.png'
};
