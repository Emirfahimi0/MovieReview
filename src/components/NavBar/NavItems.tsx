import { Fragment, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

interface NavItemsProps {
  handleToggle: () => void;
  isOpen: boolean;
}

export const NavItems: FunctionComponent<NavItemsProps> = ({
  handleToggle,
  isOpen,
}: NavItemsProps) => {
  const items = [
    { to: "/MovieReview/", label: "Home" },

    {
      to: "/MovieReview/Metrics",
      label: "Metrics",
    },
  ];

  return (
    <Fragment>
      <nav className="flex justify-end w-1/3 mr-2 text-white">
        <div className="hidden w-full md:flex gap-4 justify-end">
          {items.map((item, index) => (
            <NavLink key={index} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={handleToggle}>
            {isOpen === false ? <AiOutlineMenu /> : <AiOutlineClose />}
          </button>
        </div>
      </nav>
      {isOpen === true && (
        <div className="flex basis-full flex-col items-center text-white mb-2">
          {items.map((item, index) => (
            <NavLink key={index} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </Fragment>
  );
};
