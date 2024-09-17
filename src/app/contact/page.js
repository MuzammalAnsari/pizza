import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center mt-8">
      <div className="bg-red-600 text-white p-4 w-full text-center rounded-lg">
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>
      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-4 w-full">
          <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md" placeholder="Your Message" rows="4"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md">Send Message</button>
            </form>
          </section>
          <section className="bg-white shadow-md rounded-lg p-6 mb-6 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <div className="w-full h-64">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509486907!2d144.9630579153168!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6e4b0b1c!2sPizza%20Place!5e0!3m2!1sen!2sus!4v1633021234567!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </div>
        <section className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 mt-6">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2"><strong>Address:</strong> 123 Pizza Street, Food City, FC 12345</p>
          <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
          <p className="mb-2"><strong>Email:</strong> contact@foodnext.com</p>
        </section>
      </main>
    </div>
  )
}