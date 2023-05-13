import "./header.css";
import { Menu } from "./menu";

import { Nav } from "./nav";

export const Header = (props) => {
  return (
    <header>
      <Nav/>
      <Menu/>
    </header>
  );
};
