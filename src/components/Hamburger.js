// src/components/Hamburger.js
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  hamburgerButtonStyle,
  linkStyle,
  navStyle
} from './componentStyles';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} css={hamburgerButtonStyle}>☰</button>
      {isOpen && (
        <nav css={navStyle}>
          <a href="#link1" css={linkStyle}>Link 1</a>
          <a href="#link2" css={linkStyle}>Link 2</a>
        </nav>
      )}
    </div>
  );
};

export default Hamburger;
