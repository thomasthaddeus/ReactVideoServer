/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const pageStyle = css`
  min-height: 100vh;
  background-color: #f6f7f9;
`;

export const mainContentStyle = (isSidebarCollapsed) => css`
  margin-left: ${isSidebarCollapsed ? '48px' : '280px'};
  padding-top: 56px;
  transition: margin-left 0.2s ease;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

export const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  padding: 18px 20px 28px;
`;

export const cardStyle = css`
  border: 1px solid #d6d9de;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(20, 28, 38, 0.08);
  background-color: #fff;
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
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(20, 28, 38, 0.16);
    border-color: #8bb6e8;
  }

  &:focus-visible {
    outline: 3px solid #8bb6e8;
    outline-offset: 2px;
  }
`;

export const cardBodyStyle = css`
  padding: 12px 14px 14px;
`;

export const cardTitleStyle = css`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 6px;
`;

export const cardMetaStyle = css`
  color: #4b5563;
  font-size: 13px;
  line-height: 1.3;
  margin: 0 0 10px;
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
  background-color: #edf5ff;
  border: 1px solid #c6ddf7;
  border-radius: 999px;
  color: #25496f;
  font-size: 12px;
  line-height: 1;
  padding: 5px 8px;
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
  text-align: center;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  font-size: 24px;
  margin: 0;
`;

export const resultSummaryStyle = css`
  padding: 14px 20px 0;
  color: #4b5563;
  font-size: 14px;
`;

export const lastWatchedStyle = css`
  align-items: center;
  background-color: #eef6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  color: #25496f;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  line-height: 1.35;
  margin: 14px 20px 0;
  padding: 10px 12px;

  span {
    font-size: 14px;
  }
`;

export const lastWatchedButtonStyle = css`
  background-color: #2563eb;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  min-height: 32px;
  padding: 7px 10px;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus-visible {
    outline: 2px solid #4f8ed2;
    outline-offset: 2px;
  }
`;

export const serverStatusStyle = css`
  background-color: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 6px;
  color: #9a3412;
  font-size: 14px;
  line-height: 1.35;
  margin: 14px 20px 0;
  padding: 10px 12px;
`;

export const activeFilterBarStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 20px 0;
`;

export const activeFilterChipStyle = css`
  align-items: center;
  background-color: #e8f2ff;
  border: 1px solid #b9d5f4;
  border-radius: 999px;
  color: #25496f;
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
    outline: 2px solid #4f8ed2;
    outline-offset: 2px;
  }
`;

export const clearActiveFiltersButtonStyle = css`
  background-color: transparent;
  border: 1px solid #c8ced6;
  border-radius: 999px;
  color: #374151;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  line-height: 1;
  min-height: 30px;
  padding: 7px 10px;

  &:hover {
    background-color: #fff;
  }

  &:focus-visible {
    outline: 2px solid #4f8ed2;
    outline-offset: 2px;
  }
`;

export const emptyStateStyle = css`
  padding: 48px 20px 72px;
  text-align: center;
  color: #4b5563;
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
