// src/components/TopMenu.js
/** @jsxImportSource @emotion/react */
import { menuStyle, menuItemStyle } from "./componentStyles";
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';

const TopMenu = ({ isSidebarCollapsed, onToggleSidebar, searchQuery, onSearchChange }) => (
  <div css={menuStyle}>
    <Hamburger isCollapsed={isSidebarCollapsed} onClick={onToggleSidebar} />
    <a href="#videos" css={menuItemStyle}>Videos</a>
    <a href="#manuals" css={menuItemStyle}>Manuals</a>
    <a href="#library" css={menuItemStyle}>Library</a>
    <SearchBar value={searchQuery} onChange={onSearchChange} />
  </div>
);

export default TopMenu;
