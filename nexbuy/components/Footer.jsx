import footerContact from "../app/api/footerApi.json"; 
import { IoCallSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md"; 
import { TbMailPlus } from "react-icons/tb";


export const Footer = () => {
  // Mapping icons to components
  const footerIcon = {
    MdPlace: <MdLocationOn className="text-3xl text-indigo-600" />,
    IoCallSharp: <IoCallSharp className="text-3xl text-green-600" />,
    TbMailPlus: <TbMailPlus className="text-3xl text-red-600" />,
  };

  // Use mock data if actual data is not available, assuming footerContact comes from a context or is loaded
  const displayData = footerContact && Array.isArray(footerContact) && footerContact.length > 0 ? footerContact : mockFooterContact;

  return (
    <footer className="bg-white text-gray-800 pt-12 mt-16 border-t border-gray-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayData.map((curData, index) => {
          const { icon, title, details } = curData;
          return (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-50/50 border border-gray-200 shadow-lg p-6 rounded-2xl transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="shrink-0 p-3 rounded-full bg-white shadow-md">
                {footerIcon[icon]}
              </div>
              <div>
                <p className="font-extrabold text-lg text-gray-900 mb-1 leading-snug">{title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{details}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 bg-gray-100 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NexBuy. All rights reserved.
      </div>
    </footer>
  );
};
