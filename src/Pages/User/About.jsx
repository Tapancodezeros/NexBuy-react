import React from 'react'
import { NavLink } from 'react-router-dom'
import userimg from "../../assets/images/Free.png";

function About() {
  return (
   <div >
     
      <main className="grid grid-cols-2 content-start gap-4">
      
       
      <div className>
            <img 
            src={userimg}

            alt="Registration illustration"
            className="'h-15 w-190"
          />
        </div>
  
        <div className="space-y-10 text-lg text-gray-700 my-35">
      
     
          <p>This is the next generation e-commerce store.</p>
          <p>We are a team of passionate individuals dedicated to providing you with the best online shopping experience.</p>
          <p>Our mission is to offer a wide range of high-quality products at competitive prices, ensuring that you find exactly what you need.</p>
          <p>We believe in customer satisfaction and strive to exceed your expectations with every purchase.</p>
          <p>Thank you for choosing NexBuy for your shopping needs!</p>
          <p>We are committed to making your shopping experience enjoyable and hassle-free.</p>
          <p>Feel free to reach out to us with any questions or feedback.</p>
          <p>Happy shopping!</p>
        </div>
     
       
    
      </main>
     <div className="flex items-center justify-center ">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              ⬅️Go Back
            </button>
          </NavLink>
        </div>
    </div>
    
  )
}

export default About
