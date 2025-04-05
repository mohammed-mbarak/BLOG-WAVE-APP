import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Home Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            <span className="text-emerald-600">About</span> BlogWave
          </h1>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  BlogWave was born from a simple idea: to create a platform where thoughtful 
                  content meets passionate readers. Founded in 2023, we've grown into a 
                  community of writers and readers who value depth, authenticity, and 
                  diverse perspectives.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our mission is to democratize knowledge sharing and create waves of 
                  inspiration through the power of storytelling.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-emerald-700 italic">
                    "Words are, of course, the most powerful drug used by mankind." 
                    <span className="block mt-2 text-emerald-600">— Rudyard Kipling</span>
                  </p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center">
                  <svg className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8 text-center">
                Meet Our Team
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Alex Johnson', role: 'Founder & Editor', bio: 'Lover of long-form journalism and coffee.' },
                  { name: 'Samira Khan', role: 'Content Director', bio: 'Curates our most thought-provoking pieces.' },
                  { name: 'Jamie Chen', role: 'Tech Lead', bio: 'Makes sure everything runs smoothly behind the scenes.' },
                  { name: 'Taylor Smith', role: 'Community Manager', bio: 'Connects writers with readers.' }
                ].map((person, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-medium text-gray-800">{person.name}</h3>
                    <p className="text-emerald-600 text-sm mb-2">{person.role}</p>
                    <p className="text-gray-500 text-sm">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8 text-center">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    title: 'Quality Over Quantity', 
                    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                    description: 'We carefully select content that provides real value to our readers.'
                  },
                  { 
                    title: 'Diverse Perspectives', 
                    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
                    description: 'We celebrate different viewpoints and encourage healthy discourse.'
                  },
                  { 
                    title: 'Reader First', 
                    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
                    description: 'Every decision we make is with our readers in mind.'
                  }
                ].map((value, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 mb-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-500">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Ready to join our community?</h3>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200">
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;