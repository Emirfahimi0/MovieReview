import { FunctionComponent, useState } from "react";
import Logo from "../../assets/img/Logo.png";
import { NavItems } from "./NavItems";

export const Header: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-slate-900 sticky top-0 z-[20] flex-wrap mx-auto flex w-full items-center justify-between px-8">
      <div className="logo h-16 w-16 my-2">
        <img src={Logo} className="rounded-full w-auto object-contain" />
      </div>
      <NavItems isOpen={isOpen} handleToggle={handleToggleMenu} />
    </header>
  );
};
