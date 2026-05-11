// src/components/Sidebar.js
/** @jsxImportSource @emotion/react */
import { sidebarStyle } from "./componentStyles";

const Sidebar = ({ children, components = [], isCollapsed }) => (
  <div css={sidebarStyle(isCollapsed)} aria-hidden={isCollapsed}>
    {!isCollapsed && (children || components.map((Component, index) => (
        <Component key={index} />
      )))}
  </div>
);

export default Sidebar;
