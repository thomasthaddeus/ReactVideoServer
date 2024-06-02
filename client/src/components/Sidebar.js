// src/components/Sidebar.js
/** @jsxImportSource @emotion/react */
import { sidebarStyle } from "./componentStyles";

const Sidebar = ({ components }) => (
  <div css={sidebarStyle}>
    {components.map((Component, index) => (
      <Component key={index} />
    ))}
  </div>
);

export default Sidebar;
