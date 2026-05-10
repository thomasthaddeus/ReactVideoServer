// src/components/componentStyles.js
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const footerStyle = css`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 6px 0;
  width: 100%;
  font-size: 13px;

  p {
    margin: 0;
  }
`;

export const hamburgerButtonStyle = css`
  width: 40px;
  height: 40px;
  font-size: 22px;
  line-height: 1;
  background: #444;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  flex: 0 0 auto;

  &:hover {
    background-color: #555;
  }

  &:focus {
    outline: 2px solid #9fd0ff;
    outline-offset: 2px;
  }
`;

export const navStyle = css`
  display: flex;
  flex-direction: column;
  background-color: #333;
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
`;

export const menuStyle = css`
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  box-sizing: border-box;
`;

export const menuItemStyle = css`
  color: white;
  text-align: center;
  padding: 12px 14px;
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

export const sidebarStyle = (isCollapsed) => css`
  width: ${isCollapsed ? '48px' : '280px'};
  height: calc(100vh - 56px);
  position: fixed;
  left: 0;
  top: 56px;
  background-color: #333;
  color: white;
  padding: ${isCollapsed ? '10px 6px' : '14px'};
  box-sizing: border-box;
  overflow-y: auto;
  transition: width 0.2s ease, padding 0.2s ease;
  z-index: 900;
`;

export const linkStyle = css`
  display: block;
  padding: 10px;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

export const searchBarStyle = css`
  width: min(240px, 32vw);
  padding: 8px 10px;
  margin-left: auto;
  flex: 0 1 240px;
  border: 1px solid #555;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const manualsStyle = css`
  margin: 0;

  h2 {
    font-size: 18px;
    margin: 0 0 12px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
`;

export const categoryStyle = css`
  margin: 10px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const fileListStyle = css`
  margin: 5px 0;
  list-style-type: none;
  padding-left: 20px;
`;

export const fileLinkStyle = css`
  display: block;
  margin: 2px 0;
  text-decoration: none;
  color: #cfe7ff;
  font-size: 13px;
  line-height: 1.3;
  &:hover {
    text-decoration: underline;
  }
`;

export const collapsibleContentStyle = css`
  display: none;
`;

export const activeCollapsibleContentStyle = css`
  display: block;
`;
