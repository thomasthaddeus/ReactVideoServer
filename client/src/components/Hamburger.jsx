// src/components/Hamburger.js
/** @jsxImportSource @emotion/react */
import { hamburgerButtonStyle } from './componentStyles';

const Hamburger = ({ isCollapsed, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    css={hamburgerButtonStyle}
    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
  >
    {isCollapsed ? '☰' : '×'}
  </button>
);

export default Hamburger;
