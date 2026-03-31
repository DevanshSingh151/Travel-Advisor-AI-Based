import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

/*
  Contact Page
  Displays contact info and renders the ContactForm component.
*/

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Subtle world map background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left section: Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg text-slate-400 max-w-md">
                Have questions about your itinerary or need recommendations? Our travel advisors are ready to assist you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300 group">
                <div className="w-12 h-12 bg-slate-800/80 rounded-full flex items-center justify-center border border-white/5 group-hover:border-teal-500/50 group-hover:bg-teal-500/10 transition-colors">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email Us</p>
                  <p className="font-medium text-white">devanshsin2020@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-300 group">
                <div className="w-12 h-12 bg-slate-800/80 rounded-full flex items-center justify-center border border-white/5 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Call Us</p>
                  <p className="font-medium text-white">9125238551</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300 group">
                <div className="w-12 h-12 bg-slate-800/80 rounded-full flex items-center justify-center border border-white/5 group-hover:border-teal-500/50 group-hover:bg-teal-500/10 transition-colors">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Visit Us</p>
                  <p className="font-medium text-white">VIT Chennai</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer">
                <Globe className="w-5 h-5" />
              </div>
              {/* Additional generic social icons could go here */}
            </div>
          </div>

          {/* Right section: Form */}
          <div className="flex justify-center lg:justify-end w-full max-w-lg mx-auto lg:max-w-none">
            <div className="w-full">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
