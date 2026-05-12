// src/components/componentStyles.js
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, layout, radii, shadows, spacing, typography } from '../theme';

export const footerStyle = css`
  background-color: ${colors.surface};
  border-top: 1px solid ${colors.border};
  color: ${colors.textMuted};
  text-align: center;
  padding: ${spacing.sm} ${spacing.xl};
  width: 100%;
  font-size: ${typography.small};
  line-height: 1.4;

  p {
    margin: 0;
  }
`;

export const hamburgerButtonStyle = css`
  width: 40px;
  height: 40px;
  font-size: 22px;
  line-height: 1;
  background: ${colors.sidebarElevated};
  border: none;
  border-radius: ${radii.sm};
  cursor: pointer;
  color: ${colors.textInverse};
  flex: 0 0 auto;

  &:hover {
    background-color: ${colors.sidebarHover};
  }

  &:focus {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const navStyle = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.sidebar};
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
`;

export const menuStyle = css`
  background-color: ${colors.sidebar};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: ${layout.topMenuHeight};
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 6px;
  overflow: hidden;
  padding: 0 14px;
  box-sizing: border-box;
`;

export const menuItemStyle = css`
  color: ${colors.textInverse};
  text-align: center;
  padding: 12px 14px;
  text-decoration: none;
  border-radius: ${radii.sm};
  flex: 0 0 auto;
  white-space: nowrap;
  &:hover {
    background-color: ${colors.sidebarHover};
    color: ${colors.textInverse};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }

  @media (max-width: 620px) {
    padding: 10px 8px;
    font-size: 13px;
  }
`;

export const sidebarStyle = (isCollapsed) => css`
  width: ${isCollapsed ? layout.sidebarCollapsed : layout.sidebarExpanded};
  height: calc(100vh - ${layout.topMenuHeight});
  position: fixed;
  left: 0;
  top: ${layout.topMenuHeight};
  background-color: ${colors.sidebar};
  color: ${colors.textInverse};
  padding: ${isCollapsed ? '10px 6px' : spacing.md};
  box-sizing: border-box;
  overflow-y: auto;
  transition: width 0.2s ease, padding 0.2s ease;
  z-index: 900;

  @media (max-width: 760px) {
    width: min(320px, 86vw);
    padding: ${spacing.md};
    transform: translateX(${isCollapsed ? '-100%' : '0'});
    transition: transform 0.2s ease;
    box-shadow: ${isCollapsed ? 'none' : shadows.drawer};
  }
`;

export const sidebarBackdropStyle = (isVisible) => css`
  display: none;

  @media (max-width: 760px) {
    background-color: rgba(17, 24, 39, 0.58);
    border: 0;
    display: ${isVisible ? 'block' : 'none'};
    height: calc(100vh - ${layout.topMenuHeight});
    left: 0;
    padding: 0;
    position: fixed;
    top: ${layout.topMenuHeight};
    width: 100vw;
    z-index: 850;
  }
`;

export const linkStyle = css`
  display: block;
  padding: 10px;
  color: ${colors.textInverse};
  text-decoration: none;
  &:hover {
    background-color: ${colors.sidebarHover};
    color: ${colors.textInverse};
  }
`;

export const searchBarStyle = css`
  width: min(240px, 32vw);
  padding: 8px 10px;
  margin-left: auto;
  flex: 0 1 240px;
  border: 1px solid ${colors.borderStrong};
  border-radius: ${radii.sm};
  box-sizing: border-box;

  @media (max-width: 620px) {
    width: min(160px, 34vw);
    flex-basis: 160px;
    padding: 7px 8px;
  }
`;

export const manualsStyle = css`
  margin: 0;

  h2 {
    font-size: 17px;
    margin: 0 0 12px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
`;

export const manualSearchStyle = css`
  background-color: ${colors.surface};
  border: 1px solid ${colors.borderStrong};
  border-radius: ${radii.sm};
  box-sizing: border-box;
  font: inherit;
  font-size: 13px;
  margin-bottom: 8px;
  padding: 8px 9px;
  width: 100%;

  &:focus {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const manualSearchMetaStyle = css`
  color: ${colors.textInverseMuted};
  font-size: 12px;
  line-height: 1.3;
  margin-bottom: 8px;
`;

export const manualCategoryButtonStyle = (depth, isExpanded = false) => css`
  align-items: center;
  background-color: ${isExpanded ? colors.sidebarElevated : 'transparent'};
  border: none;
  border-left: 3px solid ${isExpanded ? colors.focus : 'transparent'};
  border-radius: ${radii.sm};
  color: ${depth === 0 ? colors.textInverse : colors.textInverseMuted};
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: ${depth === 0 ? '14px' : '13px'};
  font-weight: ${depth === 0 ? '700' : '600'};
  gap: 7px;
  line-height: 1.25;
  margin: ${depth === 0 ? '10px 0 4px' : '6px 0'};
  min-height: 30px;
  padding: 5px 6px 5px ${isExpanded ? '7px' : '6px'};
  text-align: left;
  width: 100%;

  span:last-of-type {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${colors.sidebarHover};
    color: ${colors.textInverse};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const manualDisclosureStyle = css`
  color: ${colors.focus};
  flex: 0 0 14px;
  font-size: 12px;
  line-height: 1;
  text-align: center;
`;

export const manualEmptyStateStyle = css`
  color: ${colors.textInverseMuted};
  font-size: 13px;
  line-height: 1.35;
  margin: 10px 0 0;
`;

export const filterPanelStyle = css`
  border-bottom: 1px solid ${colors.sidebarHover};
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
    font-size: 17px;
    margin: 0;
  }
`;

export const filterResetButtonStyle = css`
  border: 1px solid ${colors.borderStrong};
  border-radius: ${radii.sm};
  background-color: transparent;
  color: ${colors.textInverseMuted};
  cursor: pointer;
  font-size: 12px;
  padding: 5px 8px;

  &:hover {
    background-color: ${colors.sidebarHover};
    color: ${colors.textInverse};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const filterGroupStyle = css`
  margin-top: 14px;
`;

export const filterGroupTitleStyle = css`
  color: ${colors.textInverseMuted};
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
  background-color: ${isActive ? colors.accentSoft : colors.sidebarElevated};
  border: 1px solid ${isActive ? colors.accentBorder : colors.sidebarHover};
  border-left: 3px solid ${isActive ? colors.focus : 'transparent'};
  border-radius: ${radii.sm};
  color: ${isActive ? colors.accentHover : colors.textInverse};
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 13px;
  gap: 8px;
  justify-content: space-between;
  line-height: 1.25;
  min-height: 34px;
  padding: 7px 8px 7px ${isActive ? '6px' : '8px'};
  text-align: left;
  width: 100%;

  span:first-of-type {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${isActive ? '#d7eaff' : colors.sidebarHover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const filterCountStyle = css`
  background-color: rgba(255, 255, 255, 0.72);
  border-radius: ${radii.pill};
  color: ${colors.text};
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
  color: #d8ebff;
  font-size: 13px;
  line-height: 1.3;
  border-radius: ${radii.sm};
  padding: 5px 6px;

  &:hover {
    background-color: ${colors.sidebarHover};
    color: ${colors.textInverse};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const collapsibleContentStyle = css`
  display: none;
`;

export const activeCollapsibleContentStyle = css`
  display: block;
`;
