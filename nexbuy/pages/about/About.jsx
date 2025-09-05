import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import free from "@/public/image/Free.png";

const About = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);
  const handleClick = () => {
    router.push(isLoggedIn ? "/manageshop" : "/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-6 md:px-16 my-19">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Sell with <span className="text-red-500">NexBuy</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Join thousands of entrepreneurs and businesses growing their brand and
          reaching millions of customers across India.
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="flex justify-center">
          <Image
            src={free}
            alt="NexBuy Seller"
            className="w-full h-[400px] max-w-md rounded-2xl shadow-2xl object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="space-y-6 text-gray-800 leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Sell on NexBuy?
          </h2>
          <p className="text-lg text-gray-700">
            <strong>NexBuy</strong> provides a powerful e-commerce platform for
            sellers of all sizes — from local artisans to established brands.
            Our mission is to help you reach more customers, increase sales, and
            grow your business online.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-base">
            <li>🚀 Access to millions of active customers</li>
            <li>📊 Easy-to-use seller dashboard</li>
            <li>💳 Secure and fast payments</li>
            <li>🚚 Logistics & delivery support</li>
            <li>📢 Advertising & promotional tools</li>
          </ul>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: "Reach More Customers",
            desc: "Tap into NexBuy’s growing network and showcase your products to a nationwide audience.",
          },
          {
            title: "Hassle-Free Logistics",
            desc: "We take care of delivery so you can focus on what matters — growing your business.",
          },
          {
            title: "Secure Payments",
            desc: "Get paid quickly and safely with our trusted payment system.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-12 px-8 rounded-2xl max-w-6xl mx-auto text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Selling?
        </h2>
        <p className="mb-8 text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Join NexBuy today and grow your business like thousands of other
          successful sellers.
        </p>
        <button
          onClick={handleClick}
          className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-gray-200 hover:scale-110 transition-transform duration-300"
        >
          {isLoggedIn ? "➕ Add Shop" : "📝 Register First"}
        </button>
      </section>

      {/* Back to Home */}
      <div className="mt-16 flex justify-center">
        <Link href="/">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform duration-300">
            ⬅️ Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
