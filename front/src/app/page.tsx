// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section Components
import HeroSection from './components/sections/HeroSection';
import ProductsSection from './components/sections/ProductsSection';
import ServicesSection from './components/sections/ServicesSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import NewsletterSection from './components/sections/NewsLetterSection';

// UI Components
import ProductModal from './ui/ProductModal';

// Static Data
import { interiorProducts } from './data/products';

// Types
interface FurnitureItem {
  _id: string;
  furniture_name: string;
  furniture_type: string;
  furniture_price: string;
  furniture_description: string;
  special_description: string;
}

interface ContactForm {
  name: string;
  phone: string;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [furnitures, setFurnitures] = useState<FurnitureItem[]>([]);
  const [contactForm, setContactForm] = useState<ContactForm>({ name: '', phone: '' });
  const [formErrors, setFormErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch furniture data + scroll tracking
  useEffect(() => {
    const getFurniture = async () => {
      try {
        const res = await fetch('http://localhost:4000/users/furnitures');
        const result = await res.json();
        if (result.success) {
          setFurnitures(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch furniture:', err);
      }
    };
    getFurniture();

    // Scroll tracking
    const handleScroll = () => {
      const sections = ['home', 'products', 'services', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openProductModal = (product: FurnitureItem) => {
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

  const validateForm = () => {
    const errors: Partial<ContactForm> = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
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
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log('Submitted:', { ...contactForm, product: selectedProduct });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactForm]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof ContactForm];
        return updated;
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main>
        <HeroSection
          onViewProducts={() => scrollToSection('products')}
          onContactClick={() => scrollToSection('contact')}
        />

        <ProductsSection
          furnitures={furnitures}
          interiorProducts={interiorProducts}
          openProductModal={openProductModal}
        />

        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <div className="py-8 bg-white">
          <NewsletterSection />
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={closeProductModal}
          contactForm={contactForm}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          onInputChange={handleInputChange}
          onSubmit={handleContactSubmit}
        />
      )}
    </div>
  );
}