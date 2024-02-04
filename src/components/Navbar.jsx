import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex md:items-center md:flex-row flex-col justify-between text-white gap-4 lg:max-w-[1080px] w-full p-6 mx-auto bg-black">
      <Link to="/createTodos">
        <div
          className={`${
            matchRoute("/createTodos") || matchRoute("/")
              ? " text-yellow-300"
              : "text-white"
          }`}
        >
          Create Todos
        </div>
      </Link>
      <Link to="/getTodos">
        <div
          className={`${
            matchRoute("/getTodos") ? " text-yellow-300" : "text-white"
          }`}
        >
          Get Todos
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
