/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, layout, radii, shadows, spacing, typography } from './theme';

export const pageStyle = css`
  min-height: 100vh;
  background-color: ${colors.page};
  color: ${colors.text};
  font-family: ${typography.fontFamily};
`;

export const mainContentStyle = (isSidebarCollapsed) => css`
  margin-left: ${isSidebarCollapsed ? layout.sidebarCollapsed : layout.sidebarExpanded};
  padding-top: ${layout.topMenuHeight};
  transition: margin-left 0.2s ease;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

export const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.xl} ${spacing.xxl};

  @media (min-width: 1180px) {
    grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    padding: ${spacing.md};
  }
`;

export const cardStyle = css`
  border: 1px solid ${colors.border};
  border-radius: ${radii.lg};
  padding: 0;
  box-shadow: ${shadows.card};
  background-color: ${colors.surface};
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  color: inherit;
  font: inherit;
  min-width: 0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${shadows.cardHover};
    border-color: ${colors.accentBorder};
  }

  &:focus-visible {
    outline: 3px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const cardBodyStyle = css`
  padding: ${spacing.md};
`;

export const cardTitleStyle = css`
  font-size: ${typography.cardTitle};
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 ${spacing.xs};
`;

export const cardMetaStyle = css`
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 1.3;
  margin: 0 0 ${spacing.sm};
`;

export const topicListStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const topicTagStyle = css`
  background-color: ${colors.accentSoft};
  border: 1px solid ${colors.accentBorder};
  border-radius: ${radii.pill};
  color: ${colors.accentHover};
  font-size: 12px;
  line-height: 1;
  padding: 5px ${spacing.sm};
`;

export const legacyCardStyle = css`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  }
  &:hover .title {
    opacity: 1;
  }
`;

export const titleStyle = css`
  background-color: ${colors.surface};
  border-bottom: 1px solid ${colors.border};
  color: ${colors.text};
  padding: ${spacing.lg} ${spacing.xl} ${spacing.md};
  font-size: ${typography.sectionTitle};
  margin: 0;
  text-align: left;
`;

export const resultSummaryStyle = css`
  padding: ${spacing.md} ${spacing.xl} 0;
  color: ${colors.textMuted};
  font-size: ${typography.body};
`;

export const lastWatchedStyle = css`
  align-items: center;
  background-color: ${colors.accentSoft};
  border: 1px solid ${colors.accentBorder};
  border-radius: ${radii.md};
  color: ${colors.accentHover};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  line-height: 1.35;
  margin: ${spacing.md} ${spacing.xl} 0;
  padding: 10px ${spacing.md};

  span {
    font-size: 14px;
  }
`;

export const lastWatchedButtonStyle = css`
  background-color: ${colors.accent};
  border: none;
  border-radius: ${radii.sm};
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  min-height: 32px;
  padding: 7px 10px;

  &:hover {
    background-color: ${colors.accentHover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const serverStatusStyle = css`
  background-color: ${colors.warningBg};
  border: 1px solid ${colors.warningBorder};
  border-radius: ${radii.md};
  color: ${colors.warningText};
  font-size: 14px;
  line-height: 1.35;
  margin: ${spacing.md} ${spacing.xl} 0;
  padding: 10px ${spacing.md};
`;

export const activeFilterBarStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.xl} 0;
`;

export const activeFilterChipStyle = css`
  align-items: center;
  background-color: ${colors.accentSoft};
  border: 1px solid ${colors.accentBorder};
  border-radius: ${radii.pill};
  color: ${colors.accentHover};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-size: 13px;
  gap: 6px;
  line-height: 1;
  min-height: 30px;
  padding: 7px 10px;

  &:hover {
    background-color: #d7eaff;
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const clearActiveFiltersButtonStyle = css`
  background-color: transparent;
  border: 1px solid ${colors.borderStrong};
  border-radius: ${radii.pill};
  color: ${colors.text};
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  line-height: 1;
  min-height: 30px;
  padding: 7px 10px;

  &:hover {
    background-color: ${colors.surface};
  }

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 2px;
  }
`;

export const emptyStateStyle = css`
  padding: 48px 20px 72px;
  text-align: center;
  color: ${colors.textMuted};
`;

export const subheadingStyle = css`
  font-size: 20px;
  margin-bottom: 10px;
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
`;

export const thumbnailStyle = css`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  cursor: pointer;
  background-color: ${colors.surfaceRaised};
`;

export const thumbnailFallbackStyle = css`
  align-items: center;
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(135deg, rgba(31, 41, 55, 0.96), rgba(75, 85, 99, 0.9));
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  padding: 18px;
  text-align: center;
`;

export const thumbnailFallbackTitleStyle = css`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
`;

export const thumbnailFallbackMetaStyle = css`
  color: #d1d5db;
  font-size: 12px;
  line-height: 1.3;
`;

export const videoPlayerOverlayStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
  width: min(1100px, 92vw);
  max-width: 1100px;
  max-height: calc(100vh - 48px);
  overflow: auto;
  box-sizing: border-box;
`;

export const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: #333;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1;

  &:focus-visible {
    outline: 3px solid #8bb6e8;
    outline-offset: 2px;
  }
`;

export const modalTitleStyle = css`
  color: white;
  font-size: 18px;
  line-height: 1.3;
  margin: 0 48px 12px 0;
`;

export const modalControlsStyle = css`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const modalNavButtonStyle = css`
  background-color: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  min-height: 34px;
  padding: 7px 10px;

  &:hover:not(:disabled) {
    background-color: #374151;
  }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
    opacity: 0.65;
  }

  &:focus-visible {
    outline: 3px solid #8bb6e8;
    outline-offset: 2px;
  }
`;

export const modalPositionStyle = css`
  color: #d1d5db;
  font-size: 13px;
  line-height: 1;
`;

export const videoElementStyle = css`
  display: block;
  max-height: min(68vh, 720px);
  background-color: #000;
`;

export const videoStatusStyle = css`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  color: white;
  display: flex;
  font-size: 14px;
  justify-content: center;
  margin-bottom: 12px;
  min-height: 44px;
  padding: 10px;
`;

export const videoErrorStyle = css`
  background-color: rgba(127, 29, 29, 0.72);
  border: 1px solid rgba(252, 165, 165, 0.7);
  border-radius: 6px;
  color: #fee2e2;
  font-size: 14px;
  line-height: 1.35;
  margin-bottom: 12px;
  padding: 10px;
`;

export const overlayBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
