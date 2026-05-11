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

export const manualSearchStyle = css`
  background-color: #f9fafb;
  border: 1px solid #6b7280;
  border-radius: 4px;
  box-sizing: border-box;
  font: inherit;
  font-size: 13px;
  margin-bottom: 8px;
  padding: 8px 9px;
  width: 100%;

  &:focus {
    outline: 2px solid #9fd0ff;
    outline-offset: 2px;
  }
`;

export const manualSearchMetaStyle = css`
  color: #d1d5db;
  font-size: 12px;
  line-height: 1.3;
  margin-bottom: 8px;
`;

export const manualCategoryButtonStyle = (depth) => css`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: ${depth === 0 ? '#fff' : '#e5e7eb'};
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: ${depth === 0 ? '14px' : '13px'};
  font-weight: ${depth === 0 ? '700' : '600'};
  gap: 7px;
  line-height: 1.25;
  margin: ${depth === 0 ? '10px 0 4px' : '6px 0'};
  min-height: 30px;
  padding: 5px 6px;
  text-align: left;
  width: 100%;

  span:last-of-type {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: #444;
  }

  &:focus-visible {
    outline: 2px solid #9fd0ff;
    outline-offset: 2px;
  }
`;

export const manualDisclosureStyle = css`
  color: #9fd0ff;
  flex: 0 0 14px;
  font-size: 12px;
  line-height: 1;
  text-align: center;
`;

export const manualEmptyStateStyle = css`
  color: #d1d5db;
  font-size: 13px;
  line-height: 1.35;
  margin: 10px 0 0;
`;

export const filterPanelStyle = css`
  border-bottom: 1px solid #4b5563;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

export const filterHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;

  h2 {
    font-size: 18px;
    margin: 0;
  }
`;

export const filterResetButtonStyle = css`
  border: 1px solid #6b7280;
  border-radius: 4px;
  background-color: transparent;
  color: #e5e7eb;
  cursor: pointer;
  font-size: 12px;
  padding: 5px 8px;

  &:hover {
    background-color: #4b5563;
  }

  &:focus-visible {
    outline: 2px solid #9fd0ff;
    outline-offset: 2px;
  }
`;

export const filterGroupStyle = css`
  margin-top: 14px;
`;

export const filterGroupTitleStyle = css`
  color: #d1d5db;
  font-size: 12px;
  letter-spacing: 0;
  margin: 0 0 8px;
  text-transform: uppercase;
`;

export const filterListStyle = css`
  display: grid;
  gap: 6px;
`;

export const filterButtonStyle = (isActive) => css`
  align-items: center;
  background-color: ${isActive ? '#dbeafe' : '#3f3f46'};
  border: 1px solid ${isActive ? '#93c5fd' : '#52525b'};
  border-radius: 4px;
  color: ${isActive ? '#1e3a5f' : '#f9fafb'};
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 13px;
  gap: 8px;
  justify-content: space-between;
  line-height: 1.25;
  min-height: 34px;
  padding: 7px 8px;
  text-align: left;
  width: 100%;

  span:first-of-type {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${isActive ? '#bfdbfe' : '#52525b'};
  }

  &:focus-visible {
    outline: 2px solid #9fd0ff;
    outline-offset: 2px;
  }
`;

export const filterCountStyle = css`
  background-color: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  color: #1f2937;
  flex: 0 0 auto;
  font-size: 11px;
  min-width: 22px;
  padding: 2px 6px;
  text-align: center;
`;

export const categoryStyle = css`
  margin: 10px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const fileListStyle = (depth = 1) => css`
  margin: ${depth === 1 ? '3px 0 8px' : '2px 0 6px'};
  list-style-type: none;
  padding-left: ${Math.min(depth, 3) * 10}px;
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
