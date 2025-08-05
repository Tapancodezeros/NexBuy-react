import footerContact from "../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";

export const Footer = () => {
  const footerIcon = {
    MdPlace: <MdPlace className="text-4xl text-blue-600" />,
    IoCallSharp: <IoCallSharp className="text-4xl text-green-600" />,
    TbMailPlus: <TbMailPlus className="text-4xl text-red-600" />,
  };

  return (
    <footer className="bg-gray-100 text-gray-800 mt-12 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {footerContact.map((curData, index) => {
          const { icon, title, details } = curData;
          return (
            <div
              key={index}
              className="flex items-start gap-4 bg-white shadow-sm p-4 rounded-xl hover:shadow-md transition"
            >
              <div className="shrink-0">{footerIcon[icon]}</div>
              <div>
                <p className="font-semibold text-lg text-gray-700 mb-1">{title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{details}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-300 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NexBuy. All rights reserved.
      </div>
    </footer>
  );
};
