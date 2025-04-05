import React from 'react';

 const NewsletterCTA = () => {
  return (
    <section className="bg-emerald-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
            <p className="mt-4 text-lg text-emerald-100">
              Get our best content delivered to your inbox weekly. No spam, ever.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                'Exclusive articles',
                'Early access to content',
                'Weekly roundups',
                'Community highlights'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-emerald-50">
                  <svg className="h-5 w-5 mr-2 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-5 py-3 border border-transparent text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-emerald-600"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-emerald-600"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-emerald-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;