import React from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import Button from '../atoms/Button';
import LanguageMenu from '../molecules/LanguageMenu';

interface NavProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavProps) {
  const handleToggleOpenSidebar = () => {
    window.scrollTo(0, 0);
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <nav className="menu">
      <Button
        type="button"
        className="btn-icon menu-button"
        onClick={handleToggleOpenSidebar}
      >
        {isSidebarOpen ? <IoMdClose /> : <IoMdMenu />}
      </Button>

      <LanguageMenu />
    </nav>
  );
}

export default Navbar;
