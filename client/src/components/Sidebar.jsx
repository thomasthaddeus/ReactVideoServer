// src/components/Sidebar.js
/** @jsxImportSource @emotion/react */
import { sidebarStyle } from "./componentStyles";

const Sidebar = ({ components, isCollapsed }) => (
  <div css={sidebarStyle(isCollapsed)} aria-hidden={isCollapsed}>
    {!isCollapsed && components.map((Component, index) => (
      <Component key={index} />
    ))}
  </div>
);

export default Sidebar;
