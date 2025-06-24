import React from 'react';

const Help = () => (
  <div className="bg-white">
    {/* Hero Section */}
    <div className="relative h-64 bg-green-100">
      <img
        src="https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Support"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Help & Support</h1>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">How does Prep & Plate work?</h3>
          <p className="text-gray-600">
            It's simple! You choose your favorite recipes from our weekly menu, and we deliver perfectly portioned, fresh ingredients and step-by-step recipe cards right to your door. This way, you can enjoy cooking without the hassle of meal planning and grocery shopping.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Can I customize my order?</h3>
          <p className="text-gray-600">
            Absolutely. You can adjust the number of servings for each recipe to fit your needs. While we pre-select the ingredients for each dish to ensure authenticity and quality, you have full control over which recipes you'd like to receive each week.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">What if I have dietary restrictions?</h3>
          <p className="text-gray-600">
            Each recipe comes with a detailed list of ingredients and nutritional information. We offer a variety of options, including vegetarian and low-carb meals. You can filter recipes based on your dietary preferences to find the perfect meals for you.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">How do you ensure ingredient freshness?</h3>
          <p className="text-gray-600">
            We work with trusted local suppliers to source the freshest seasonal ingredients. Our ingredients are delivered in refrigerated boxes with insulated liners to ensure they stay fresh from our kitchen to yours.
          </p>
        </div>
      </div>
    </div>

     {/* Contact Us Section */}
     <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">
            Our support team is here to help. Contact us anytime for assistance.
            </p>
            <a href="/contact" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition">
                Contact Us
            </a>
        </div>
    </div>
  </div>
);

export default Help; 