// src/components/TopMenu.js
/** @jsxImportSource @emotion/react */
import { menuStyle, menuItemStyle } from "./componentStyles";
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';

const TopMenu = () => (
  <div css={menuStyle}>
    <Hamburger />
    <a href="#home" css={menuItemStyle}>Home</a>
    <a href="#services" css={menuItemStyle}>Services</a>
    <a href="#contact" css={menuItemStyle}>Contact</a>
    <SearchBar />
  </div>
);

export default TopMenu;
