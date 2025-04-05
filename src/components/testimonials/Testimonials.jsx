// src/components/testimonials/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO, Company A",
      content: "This service completely transformed our business. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Marketing Director",
      content: "The best decision we ever made. Our productivity increased by 200%.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Small Business Owner",
      content: "Affordable and effective solution for our needs. Will use again!",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  return (
    <section className="py-20 px-5 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300"
          >
            <blockquote className="text-gray-600 italic mb-6">
              "{testimonial.content}"
            </blockquote>
            
            <div className="flex items-center">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;