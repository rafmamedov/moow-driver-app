import React, { createContext, useContext, useState } from 'react';
import { NavLink } from '../types/types';

type Props = {
  children: React.ReactNode;
};

export const NavBarContext = createContext({
  activeNavLink: NavLink.drive,
  setActiveNavLink: (navLink: NavLink) => {},
});

export const NavBarProvider: React.FC<Props> = ({ children }) => {
  const [activeNavLink, setActiveNavLink] = useState(NavLink.drive);

  return (
    <NavBarContext.Provider value={{ activeNavLink, setActiveNavLink }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = () => {
  return useContext(NavBarContext);
};
