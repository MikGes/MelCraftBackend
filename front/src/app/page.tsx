// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCouch, FaChair, FaBed, FaPaintBrush, FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaArrowRight, FaTimes, FaIdeal } from 'react-icons/fa';

// Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  image: string;
}

// Product data
const furnitureProducts: Product[] = [
  {
    id: 1,
    name: 'Modern Sofa',
    category: 'Living Room',
    price: '$1,299',
    description: 'Experience ultimate comfort with our handcrafted modern sofa featuring premium upholstery and solid wood frame.',
    features: ['Solid oak frame', 'High-density foam cushions', 'Removable covers', '10-year warranty'],
    image: 'sofa1'
  },
  {
    id: 2,
    name: 'Dining Table Set',
    category: 'Dining',
    price: '$899',
    description: 'Elegant dining set crafted from sustainable hardwood with smooth finish and ergonomic chairs.',
    features: ['Seats 6 people', 'Extendable design', 'Scratch-resistant surface', 'Matching chairs included'],
    image: 'dining1'
  },
  {
    id: 3,
    name: 'Executive Desk',
    category: 'Office',
    price: '$749',
    description: 'Professional-grade executive desk with ample storage and cable management system.',
    features: ['Solid walnut construction', '3 drawers with soft-close', 'Built-in cable management', 'Ergonomic height'],
    image: 'desk1'
  },
  {
    id: 4,
    name: 'King Bed Frame',
    category: 'Bedroom',
    price: '$1,199',
    description: 'Luxurious king bed frame with upholstered headboard and solid wood slats for optimal support.',
    features: ['Upholstered headboard', 'Solid wood slats', 'Under-bed storage', 'Easy assembly'],
    image: 'bed1'
  },
  {
    id: 5,
    name: 'Accent Chair',
    category: 'Living Room',
    price: '$499',
    description: 'Stylish accent chair that combines comfort and modern design with premium fabric.',
    features: ['Ergonomic design', 'Premium fabric', 'Solid wood legs', 'Stain-resistant'],
    image: 'chair1'
  },
  {
    id: 6,
    name: 'Bookshelf',
    category: 'Storage',
    price: '$399',
    description: 'Modular bookshelf with adjustable shelves and contemporary design.',
    features: ['Adjustable shelves', 'Wall-mounted option', 'Scratch-resistant finish', 'Holds up to 50kg per shelf'],
    image: 'shelf1'
  },
];

const interiorProducts: Product[] = [
  {
    id: 1,
    name: 'Wall Art Collection',
    category: 'Decor',
    price: '$199',
    description: 'Curated collection of premium wall art pieces to elevate your interior spaces.',
    features: ['Hand-selected pieces', 'Museum-quality prints', 'Various sizes included', 'Ready to hang'],
    image: 'art1'
  },
  {
    id: 2,
    name: 'Designer Lighting',
    category: 'Lighting',
    price: '$299',
    description: 'Statement lighting fixtures that combine functionality with artistic design.',
    features: ['Energy-efficient LED', 'Dimmable', 'Handcrafted metal', '3-year warranty'],
    image: 'lamp1'
  },
  {
    id: 3,
    name: 'Premium Curtains',
    category: 'Textiles',
    price: '$149',
    description: 'Luxurious curtains made from high-quality fabric with thermal and blackout properties.',
    features: ['Blackout lining', 'Thermal insulation', 'Machine washable', 'Custom sizing available'],
    image: 'curtain1'
  },
  {
    id: 4,
    name: 'Area Rug',
    category: 'Flooring',
    price: '$349',
    description: 'Handwoven area rug with intricate patterns and premium materials for lasting beauty.',
    features: ['Handwoven wool', 'Non-slip backing', 'Stain-resistant', 'Ethically sourced'],
    image: 'rug1'
  },
  {
    id: 5,
    name: 'Decorative Vases',
    category: 'Decor',
    price: '$89',
    description: 'Set of artisan-crafted ceramic vases in complementary shapes and finishes.',
    features: ['Hand-thrown ceramic', 'Glazed finish', 'Set of 3 sizes', 'Waterproof interior'],
    image: 'vase1'
  },
  {
    id: 6,
    name: 'Mirror Set',
    category: 'Wall Decor',
    price: '$249',
    description: 'Elegant mirror set with wooden frames to enhance light and space in any room.',
    features: ['Solid wood frames', 'Beveled edges', 'Wall mounting hardware included', 'Set of 2 different sizes'],
    image: 'mirror1'
  },
];

// Contact form interface
interface ContactForm {
  name: string;
  phone: string;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({ name: '', phone: '' });
  const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setContactForm({ name: '', phone: '' });
    setFormErrors({});
    setSubmitSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const validateContactForm = (): boolean => {
    const errors: Partial<ContactForm> = {};

    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(contactForm.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // In a real app, you would send this to your backend
      console.log('Contact request submitted:', {
        ...contactForm,
        productId: selectedProduct?.id,
        productName: selectedProduct?.name
      });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name as keyof ContactForm]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactForm];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Navigation */}
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                M
              </div>
              <span className="ml-2 text-amber-900 font-bold text-xl">Melcraft</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`font-medium ${activeSection === 'home' ? 'text-amber-800 border-b-2 border-amber-700' : 'text-amber-700 hover:text-amber-900'}`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className={`font-medium ${activeSection === 'products' ? 'text-amber-800 border-b-2 border-amber-700' : 'text-amber-700 hover:text-amber-900'}`}
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`font-medium ${activeSection === 'services' ? 'text-amber-800 border-b-2 border-amber-700' : 'text-amber-700 hover:text-amber-900'}`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`font-medium ${activeSection === 'contact' ? 'text-amber-800 border-b-2 border-amber-700' : 'text-amber-700 hover:text-amber-900'}`}
              >
                Contact
              </button>
              <Link
                href="/login"
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Login
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-amber-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="py-2 text-amber-800 font-medium border-b border-amber-200"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="py-2 text-amber-800 font-medium border-b border-amber-200"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="py-2 text-amber-800 font-medium border-b border-amber-200"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="py-2 text-amber-800 font-medium border-b border-amber-200"
                >
                  Contact
                </button>
                <Link
                  href="/login"
                  className="bg-amber-700 text-white py-2 rounded-lg font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-r from-amber-100 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
                  Crafted Excellence in <span className="text-amber-700">Furniture</span> & <span className="text-amber-700">Interiors</span>
                </h1>
                <p className="mt-6 text-lg text-amber-800 max-w-lg">
                  At Melcraft, we transform spaces with timeless designs, premium materials, and artisanal craftsmanship that stands the test of time.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => scrollToSection('products')}
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition duration-300"
                  >
                    View Products <FaArrowRight className="ml-2" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="border-2 border-amber-700 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-lg font-medium transition duration-300"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="bg-amber-200 border-4 border-amber-300 rounded-2xl w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                    <div className="bg-amber-300 w-64 h-64 md:w-80 md:h-80 rounded-xl flex items-center justify-center">
                      <div className="bg-amber-100 w-48 h-48 md:w-64 md:h-64 rounded-lg flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-2xl md:text-4xl">Melcraft</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white py-2 px-6 rounded-lg shadow-lg">
                    <span className="font-bold">Since 1998</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900">Our Premium Collections</h2>
              <p className="mt-4 text-amber-700 max-w-2xl mx-auto">
                Discover handcrafted furniture and interior design elements that blend functionality with timeless elegance.
              </p>
            </div>

            <div className="mb-12">
              <div className="flex items-center mb-8">
                <FaCouch className="text-amber-700 text-2xl mr-3" />
                <h3 className="text-2xl font-bold text-amber-900">Furniture Collection</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {furnitureProducts.map((product) => (
                  <div key={product.id} className="bg-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-48 bg-amber-200 flex items-center justify-center">
                      <div className="bg-amber-300 w-32 h-32 rounded-lg flex items-center justify-center">
                        <span className="text-amber-800 font-bold">{product.name.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-amber-900">{product.name}</h4>
                          <p className="text-amber-700 text-sm mt-1">{product.category}</p>
                        </div>
                        <span className="font-bold text-amber-800">{product.price}</span>
                      </div>
                      <button
                        onClick={() => openProductModal(product)}
                        className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg font-medium transition duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => scrollToSection('products')}
                  className="inline-flex items-center text-amber-700 font-medium hover:text-amber-900"
                >
                  View All Furniture <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-8">
                <FaPaintBrush className="text-amber-700 text-2xl mr-3" />
                <h3 className="text-2xl font-bold text-amber-900">Interior Design Elements</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {interiorProducts.map((product) => (
                  <div key={product.id} className="bg-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="h-48 bg-amber-200 flex items-center justify-center">
                      <div className="bg-amber-300 w-32 h-32 rounded-lg flex items-center justify-center">
                        <span className="text-amber-800 font-bold">{product.name.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-amber-900">{product.name}</h4>
                          <p className="text-amber-700 text-sm mt-1">{product.category}</p>
                        </div>
                        <span className="font-bold text-amber-800">{product.price}</span>
                      </div>
                      <button
                        onClick={() => openProductModal(product)}
                        className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-lg font-medium transition duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => scrollToSection('products')}
                  className="inline-flex items-center text-amber-700 font-medium hover:text-amber-900"
                >
                  View All Interior Products <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900">Our Premium Services</h2>
              <p className="mt-4 text-amber-700 max-w-2xl mx-auto">
                We offer comprehensive interior solutions tailored to your unique space and style preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaHome className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Residential Design</h3>
                <p className="text-amber-700">
                  Transform your home into a sanctuary of comfort and style with our bespoke residential design services.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaChair className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Custom Furniture</h3>
                <p className="text-amber-700">
                  Commission unique, handcrafted furniture pieces designed exclusively for your space and needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaPaintBrush className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Full Renovation</h3>
                <p className="text-amber-700">
                  Complete interior renovation services from concept to completion with our expert design team.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaBed className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Space Planning</h3>
                <p className="text-amber-700">
                  Optimize your space with intelligent layouts that maximize functionality and aesthetic appeal.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaIdeal className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Lighting Design</h3>
                <p className="text-amber-700">
                  Create ambiance and highlight architectural features with our specialized lighting solutions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-16 h-16 bg-amber-700 rounded-lg flex items-center justify-center mb-6">
                  <FaStar className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Styling Consultation</h3>
                <p className="text-amber-700">
                  Refresh your space with expert styling advice and curated product selections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <div className="bg-amber-200 border-4 border-amber-300 rounded-2xl w-full h-96 flex items-center justify-center">
                  <div className="bg-amber-300 w-4/5 h-4/5 rounded-xl flex items-center justify-center">
                    <div className="bg-amber-100 w-4/5 h-4/5 rounded-lg flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-2xl">Our Workshop</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">Crafted with Passion, Built to Last</h2>
                <p className="text-amber-700 mb-6">
                  For over two decades, Melcraft has been synonymous with exceptional craftsmanship and timeless design.
                  Our master artisans combine traditional techniques with contemporary aesthetics to create pieces that
                  become heirlooms for generations.
                </p>
                <p className="text-amber-700 mb-8">
                  We source only the finest sustainable materials and employ meticulous attention to detail in every
                  project we undertake. From concept to completion, we partner with you to bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">25+</span>
                    </div>
                    <span className="text-amber-800">Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">500+</span>
                    </div>
                    <span className="text-amber-800">Projects Completed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">100%</span>
                    </div>
                    <span className="text-amber-800">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-amber-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
              <p className="mt-4 text-amber-200 max-w-2xl mx-auto">
                Ready to transform your space? Contact our design team for a personalized consultation.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <div className="bg-amber-800 p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-amber-700 p-3 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Our Location</h4>
                        <p className="text-amber-200">123 Design Avenue, Creative District<br />London, UK</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-amber-700 p-3 rounded-lg mr-4">
                        <FaPhone className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Phone Number</h4>
                        <p className="text-amber-200">+44 20 1234 5678</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-amber-700 p-3 rounded-lg mr-4">
                        <FaEnvelope className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Email Address</h4>
                        <p className="text-amber-200">hello@melcraft.design</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-bold text-white mb-4">Opening Hours</h4>
                    <div className="text-amber-200 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-amber-900 mb-6">Send us a Message</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-amber-800 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-amber-800 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-amber-800 font-medium mb-2">Service Interested In</label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option>Furniture Design</option>
                        <option>Interior Design</option>
                        <option>Full Renovation</option>
                        <option>Space Planning</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-amber-800 font-medium mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-medium transition duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                  M
                </div>
                <span className="ml-2 text-white font-bold text-xl">Melcraft</span>
              </div>
              <p className="mt-3 max-w-md">
                Crafting timeless interiors and bespoke furniture since 1998.
                Where tradition meets innovation in design.
              </p>
            </div>

            <div className="flex space-x-6">
              <Link href="#" className="text-amber-300 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="#" className="text-amber-300 hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="#" className="text-amber-300 hover:text-white transition">
                Careers
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-amber-800 text-center">
            <p>© {new Date().getFullYear()} Melcraft Design Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
              <h2 className="text-2xl font-bold text-amber-900">{selectedProduct.name}</h2>
              <button
                onClick={closeProductModal}
                className="text-amber-700 hover:text-amber-900"
                aria-label="Close modal"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Image */}
                <div className="md:w-1/2">
                  <div className="bg-amber-200 border-2 border-amber-300 rounded-xl w-full h-80 flex items-center justify-center">
                    <div className="bg-amber-300 w-48 h-48 rounded-lg flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-2xl">{selectedProduct.name.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-amber-200 border-2 border-amber-300 rounded-lg w-16 h-16 flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-sm">Img {i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2">
                  <div className="mb-6">
                    <span className="text-amber-700 font-medium">{selectedProduct.category}</span>
                    <h3 className="text-3xl font-bold text-amber-900 mt-2">{selectedProduct.price}</h3>
                  </div>

                  <p className="text-amber-800 mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-bold text-amber-900 text-lg mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-700 mr-2">•</span>
                          <span className="text-amber-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Request Form */}
                  <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-amber-900 text-lg mb-4">Request Information</h4>
                    {submitSuccess ? (
                      <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <p className="text-amber-800 font-medium">Thank you!</p>
                        <p className="text-amber-700 mt-2">We'll contact you shortly about {selectedProduct.name}.</p>
                        <button
                          onClick={closeProductModal}
                          className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-medium"
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit}>
                        <div className="mb-4">
                          <label htmlFor="contactName" className="block text-amber-800 font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="contactName"
                            name="name"
                            value={contactForm.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${formErrors.name ? 'border-red-500' : 'border-amber-300'
                              }`}
                            placeholder="Enter your name"
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                          )}
                        </div>

                        <div className="mb-6">
                          <label htmlFor="contactPhone" className="block text-amber-800 font-medium mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="contactPhone"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${formErrors.phone ? 'border-red-500' : 'border-amber-300'
                              }`}
                            placeholder="+44 1234 567890"
                          />
                          {formErrors.phone && (
                            <p className="mt-1 text-red-500 text-sm">{formErrors.phone}</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-medium transition duration-300 flex justify-center items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                          {isSubmitting ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : null}
                          {isSubmitting ? 'Sending Request...' : 'Request Information'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}