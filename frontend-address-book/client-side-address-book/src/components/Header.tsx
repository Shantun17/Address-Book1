import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900">
      <div className="container p-2 mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-300 transition-colors duration-200">
          <Home size={35} />
        </button>
        <div className="text-white text-base flex-1 text-center">
          Address Book
        </div>
      </div>
    </div>
  );
};

export default Header;
