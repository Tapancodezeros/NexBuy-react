import Link from "next/link";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaCommentDots, FaArrowLeft, FaPaperPlane } from "react-icons/fa"; // Imported icons

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());
    localStorage.setItem("contactData", JSON.stringify(formInputData));
    toast.success("🚀 Your message has been submitted successfully!",{ autoClose: 1500 }); // Enhanced toast message
    e.target.reset();
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-3xl border border-gray-200 p-8 md:p-12 transition-all duration-500 transform hover:shadow-indigo-300/50">
        
        {/* Header Section */}
        <div className="text-center mb-10 border-b pb-4">
            <h2 className="text-4xl font-extrabold text-indigo-600 mb-2 tracking-tight">
              Let's Connect
            </h2>
            <p className="text-gray-600 text-lg max-w-sm mx-auto">
              We'd love to hear from you. Reach out with any questions or feedback!
            </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2 flex items-center"
            >
              <FaUser className="mr-2 text-indigo-500" /> Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="off"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>
          
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2 flex items-center"
            >
              <FaEnvelope className="mr-2 text-indigo-500" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2 flex items-center"
            > 
                <FaCommentDots className="mr-2 text-indigo-500" /> Your Message  
            </label>
            <textarea
              id="message"
              name="message"
              required
              autoComplete="off"
              placeholder="Write your detailed message here..."
              rows="5"
              className="w-full border border-gray-300 rounded-xl p-3 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transform hover:scale-[1.01] transition-all duration-300"
          >
            <FaPaperPlane className="mr-3" /> Send Message
          </button>
        </form>
        
        {/* Back Button */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <Link href="/">
            <button className="flex items-center justify-center mx-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-md hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 font-semibold">
              <FaArrowLeft className="mr-2" /> Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
