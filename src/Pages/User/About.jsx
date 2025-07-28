import React from 'react'
import { NavLink } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
 
      <br/><br/>
      <main className="flex-grow container mx-auto px-4 py-10 bg-white rounded shadow-lg shadow-amber-200">
  
        <div className="space-y-4 text-lg text-gray-700">
                <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">NexBuy</h1>
          <p>This is the next generation e-commerce store.</p>
          <p>We are a team of passionate individuals dedicated to providing you with the best online shopping experience.</p>
          <p>Our mission is to offer a wide range of high-quality products at competitive prices, ensuring that you find exactly what you need.</p>
          <p>We believe in customer satisfaction and strive to exceed your expectations with every purchase.</p>
          <p>Thank you for choosing NexBuy for your shopping needs!</p>
          <p>We are committed to making your shopping experience enjoyable and hassle-free.</p>
          <p>Feel free to reach out to us with any questions or feedback.</p>
          <p>Happy shopping!</p>
        </div>

        <div className="mt-8 text-center">
          <NavLink to="/">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200">
              Go Back
            </button>
          </NavLink>
        </div>
      </main>
 
    </div>
  )
}

export default About
