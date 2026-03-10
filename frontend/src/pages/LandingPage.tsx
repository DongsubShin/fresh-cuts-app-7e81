import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#ED1C24] font-bold tracking-wider uppercase text-sm">Est. 2023</span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mt-4 leading-tight">
              Precision Grooming for the <span className="text-[#ED1C24]">Modern Gentleman</span>
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-lg">
              Experience the perfect blend of traditional barbering and contemporary style. Our master barbers are dedicated to making you look and feel your absolute best.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="bg-[#ED1C24] text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-[#c4161d] transition-all shadow-lg shadow-red-200">
                Book Appointment
              </Link>
              <Link to="/queue" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-center hover:border-[#ED1C24] hover:text-[#ED1C24] transition-all">
                Join Walk-In Queue
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80" 
                alt="Barber Shop Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Services</h2>
            <div className="w-20 h-1 bg-[#ED1C24] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Classic Haircut', price: '$35', desc: 'Precision cut tailored to your face shape and style.' },
              { name: 'Beard Sculpting', price: '$25', desc: 'Expert shaping and grooming for the perfect beard.' },
              { name: 'Luxury Shave', price: '$45', desc: 'Traditional hot towel shave with premium products.' }
            ].map((service) => (
              <div key={service.name} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                <p className="text-[#ED1C24] font-bold mt-2">{service.price}</p>
                <p className="text-slate-600 mt-4">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};