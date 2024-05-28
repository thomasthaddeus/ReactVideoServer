/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 60px; /* Adjust for fixed TopMenu */
`;

export const cardStyle = css`
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
  padding: 20px;
  font-size: 28px;
  margin-bottom: 20px;
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
  cursor: pointer;
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
  width: 80%;
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
