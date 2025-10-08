// components/ui/ProductModal.tsx
'use client';
import { FaTimes } from 'react-icons/fa';

interface ContactForm {
  name: string;
  phone: string;
}

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  contactForm: ContactForm;
  formErrors: Partial<ContactForm>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProductModal({
  product,
  onClose,
  contactForm,
  formErrors,
  isSubmitting,
  submitSuccess,
  onInputChange,
  onSubmit,
}: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-amber-900">{product.furniture_name || product.name}</h2>
          <button
            onClick={onClose}
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
                  <span className="text-amber-800 font-bold text-2xl">
                    {(product.furniture_name || product.name).split(' ')[0]}
                  </span>
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
                <span className="text-amber-700 font-medium">
                  {product.furniture_type || product.category}
                </span>
                <h3 className="text-3xl font-bold text-amber-900 mt-2">
                  {product.furniture_price || product.price} Birr
                </h3>
              </div>
              <p className="text-amber-800 mb-6">
                {product.furniture_description || product.description}
              </p>

              {/* Contact Form */}
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
                    <p className="text-amber-700 mt-2">
                      We'll contact you shortly about {product.furniture_name || product.name}.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit}>
                    <div className="mb-4">
                      <label htmlFor="contactName" className="block text-amber-800 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="name"
                        value={contactForm.name}
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          formErrors.name ? 'border-red-500' : 'border-amber-300'
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
                        onChange={onInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-amber-300'
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
                      className={`w-full py-3 px-4 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-medium transition duration-300 flex justify-center items-center ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
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
  );
}