import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative bg-gray-900 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Blog Wave</h3>
            <p className="text-gray-300 text-sm">
              Ride the wave of modern blogging and thoughtful content.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                  <span className="sr-only">{item}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={`M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-300 hover:text-emerald-400 text-sm transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Categories</h3>
            <ul className="space-y-2">
              {['Technology', 'Lifestyle', 'Travel', 'Food'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm transition-colors duration-200">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">Subscribe</h3>
            <p className="text-gray-300 text-sm">
              Get the latest posts delivered to your inbox.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="appearance-none min-w-0 w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Blog Wave. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;