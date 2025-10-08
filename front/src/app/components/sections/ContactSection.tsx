// components/sections/ContactSection.tsx
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
  return (
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
  );
}