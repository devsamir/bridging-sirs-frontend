import React from "react";
import { Link as ReactLink } from "react-router-dom";

interface ButtonProps {
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}
interface ContainerProps {
  open?: boolean;
  setSidenav?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LinkProps {
  setSidenav?: React.Dispatch<React.SetStateAction<boolean>>;
  href: string;
  active?: boolean;
}
interface Props {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setSidenav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ onClick, open, children }) => {
  return (
    <>
      <button
        className={`border-none py-3 px-4 bg-transparent text-white transition-all flex items-center w-full hover:bg-white hover:bg-opacity-30`}
        onClick={onClick.bind(this, !open)}
      >
        {children}
      </button>
    </>
  );
};

const Container: React.FC<ContainerProps> = ({
  children,
  open,
  setSidenav,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setSidenav });
    }
    return child;
  });
  return (
    <>
      <div
        className={`${
          open ? "max-h-96" : "max-h-0"
        } transition-all overflow-hidden`}
      >
        <div>{childrenWithProps}</div>
      </div>
    </>
  );
};
const Link: React.FC<LinkProps> = ({ setSidenav, children, href, active }) => {
  return (
    <ReactLink to={href}>
      <button
        className={`${
          active && "bg-white bg-opacity-30"
        } border-none pt-3 pr-4 pb-3 pl-16 bg-transparent text-white transition-all flex items-center w-full hover:bg-white hover:bg-opacity-30`}
        onClick={() => {
          setSidenav(false);
        }}
      >
        {children}
      </button>
    </ReactLink>
  );
};
const SidebarDropdown: React.FC<Props> = ({
  onClick,
  open,
  setSidenav,
  children,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick, open, setSidenav });
    }
    return child;
  });
  return <div>{childrenWithProps}</div>;
};

export default {
  Dropdown: SidebarDropdown,
  Button,
  Container,
  Link,
};
