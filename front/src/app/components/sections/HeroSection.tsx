// components/sections/HeroSection.tsx
import { FaArrowRight } from 'react-icons/fa';

interface HeroSectionProps {
  onViewProducts: () => void;
  onContactClick: () => void;
}

export default function HeroSection({ onViewProducts, onContactClick }: HeroSectionProps) {
  return (
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
                onClick={onViewProducts}
                className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition duration-300"
              >
                View Products <FaArrowRight className="ml-2" />
              </button>
              <button
                onClick={onContactClick}
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
  );
}