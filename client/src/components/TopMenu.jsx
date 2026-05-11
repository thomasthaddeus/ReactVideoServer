// src/components/TopMenu.js
/** @jsxImportSource @emotion/react */
import { menuStyle, menuItemStyle } from "./componentStyles";
import SearchBar from './SearchBar';
import Hamburger from './Hamburger';

const TopMenu = ({ isSidebarCollapsed, onToggleSidebar, onNavigate, searchQuery, onSearchChange }) => (
  <div css={menuStyle}>
    <Hamburger isCollapsed={isSidebarCollapsed} onClick={onToggleSidebar} />
    <a href="#videos" css={menuItemStyle} onClick={onNavigate}>Videos</a>
    <a href="#manuals" css={menuItemStyle} onClick={onNavigate}>Manuals</a>
    <a href="#library" css={menuItemStyle} onClick={onNavigate}>Library</a>
    <SearchBar value={searchQuery} onChange={onSearchChange} />
  </div>
);

export default TopMenu;
