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
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-20 p-8 bg-white rounded-3xl shadow-xl border border-indigo-50">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-red-600">
          Unleash Your Potential with NexBuy
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-normal">
          Join thousands of successful entrepreneurs and businesses growing their brand and
          reaching millions of active customers across India, effortlessly.
        </p>
      </section>

      {/* Main Content: Image & Value Proposition */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Image */}
        <div className="flex justify-center order-2 lg:order-1">
          <Image
            src={free}
            alt="NexBuy Seller Platform"
            className="w-full h-auto max-w-lg rounded-3xl shadow-2xl object-cover transition-transform duration-700 hover:scale-[1.03] border-4 border-white ring-8 ring-indigo-100"
          />
        </div>
        
        {/* Text/List */}
        <div className="space-y-8 text-gray-800 leading-relaxed order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 border-b-4 border-red-500 pb-2 inline-block">
            Why Choose NexBuy?
          </h2>
          <p className="text-lg text-gray-700">
            <strong>NexBuy</strong> offers a comprehensive, secure, and intuitive e-commerce platform designed for rapid scalability. We empower every seller, from local artisans to national brands, to thrive online.
          </p>
          
          <ul className="pl-0 space-y-4 text-gray-700 text-lg">
            <li className="flex items-start">
              <span className="text-red-500 text-2xl mr-3">🚀</span>
              <div className="flex flex-col">
                  <strong className="text-gray-900">Massive Reach:</strong> Access millions of active, high-intent customers nationwide.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 text-2xl mr-3">💡</span>
              <div className="flex flex-col">
                <strong className="text-gray-900">Intuitive Dashboard:</strong> Manage inventory, orders, and payments with ease.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 text-2xl mr-3">💳</span>
              <div className="flex flex-col">
                <strong className="text-gray-900">Secure Payments:</strong> Enjoy fast, reliable, and secure transactions every time.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 text-2xl mr-3">📦</span>
              <div className="flex flex-col">
                <strong className="text-gray-900">End-to-End Logistics:</strong> Seamless delivery and returns support across the country.
              </div>
            </li>
          </ul>
        </div>
      </main>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {[
          {
            title: "Global Reach",
            icon: "🌍",
            desc: "Tap into NexBuy’s rapidly expanding customer base and showcase your products to a nationwide audience ready to buy.",
          },
          {
            title: "Simplified Operations",
            icon: "⚙️",
            desc: "Our platform automates order processing, inventory updates, and tracking, so you can focus on creativity and growth.",
          },
          {
            title: "Financial Security",
            icon: "🔒",
            desc: "Get paid quickly and confidently. We ensure all transactions are secure, giving you peace of mind.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-indigo-400/50 hover:shadow-2xl transform hover:-translate-y-2 transition duration-500 flex flex-col items-center text-center"
          >
            <span className="text-5xl mb-4">{item.icon}</span>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-600 to-pink-500 text-white py-16 px-8 rounded-3xl max-w-6xl mx-auto text-center shadow-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Ready to Start Selling?
        </h2>
        <p className="mb-10 text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
          It takes just a few clicks to launch your brand on the fastest-growing marketplace.
        </p>
        <button
          onClick={handleClick}
          className="bg-white text-red-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 hover:scale-[1.05] active:scale-100 transition duration-300 transform ring-4 ring-white/50"
        >
          {isLoggedIn ? "➕ Launch My Shop" : "📝 Register & Start Selling"}
        </button>
      </section>

      {/* Back to Home */}
      <div className="mt-20 flex justify-center">
        <Link href="/">
          <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all shadow-md text-lg">
            <span className="mr-2">🏠</span> Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
