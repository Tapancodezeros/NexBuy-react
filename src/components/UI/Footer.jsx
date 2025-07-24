import footerContact from "../../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";

export const Footer = () => {
  const footerIcon = {
    MdPlace: <MdPlace className="text-3xl text-blue-600" />,
    IoCallSharp: <IoCallSharp className="text-3xl text-green-600" />,
    TbMailPlus: <TbMailPlus className="text-3xl text-red-600" />,
  };

  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      {/* Contact Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {footerContact.map((curData, index) => {
          const { icon, title, details } = curData;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="icon">{footerIcon[icon]}</div>
              <div className="text">
                <p className="font-semibold text-lg">{title}</p>
                <p className="text-sm text-gray-600">{details}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 NexBuy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
