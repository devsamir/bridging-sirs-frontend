import React from "react";
import { Link } from "react-router-dom";

interface Props {
  href: string;
  active?: boolean;
}

const SidebarButton: React.FC<Props> = ({ href, children, active }) => {
  return (
    <Link to={href}>
      <button
        className={`${
          active && "bg-white bg-opacity-30"
        } border-none py-3 px-4 bg-transparent text-white transition-all flex items-center w-full hover:bg-white hover:bg-opacity-30`}
      >
        {children}
      </button>
    </Link>
  );
};

export default SidebarButton;
