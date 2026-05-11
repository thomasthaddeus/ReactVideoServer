// src/components/Sidebar.js
/** @jsxImportSource @emotion/react */
import { sidebarBackdropStyle, sidebarStyle } from "./componentStyles";

const Sidebar = ({ children, components = [], isCollapsed, onClose }) => (
  <>
    <button
      type="button"
      css={sidebarBackdropStyle(!isCollapsed)}
      aria-label="Close sidebar"
      onClick={onClose}
    />
    <aside css={sidebarStyle(isCollapsed)} aria-hidden={isCollapsed}>
      {!isCollapsed && (children || components.map((Component, index) => (
          <Component key={index} />
        )))}
    </aside>
  </>
);

export default Sidebar;
