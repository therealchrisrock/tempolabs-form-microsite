import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Example icons

function Header({ socialIcons = [<Facebook />, <Twitter />, <Instagram />] }) {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <a href="/">MyLogo</a>
      </div>
      <div className="flex gap-4">
        {socialIcons.map((icon, index) => (
          <div key={index} className="text-gray-600 hover:text-gray-800">
            {icon}
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
