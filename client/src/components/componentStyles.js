// src/components/componentStyles.js
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const footerStyle = css`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const hamburgerButtonStyle = css`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  &:focus {
    outline: none;
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
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const menuItemStyle = css`
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

export const sidebarStyle = css`
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #333;
  color: white;
  padding: 20px;
  overflow-y: auto;
  transition: left 0.3s ease;
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
  padding: 10px;
  margin: 0 10px;
  flex-grow: 1;
`;

export const manualsStyle = css`
  margin: 20px 0;
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
  color: blue;
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
