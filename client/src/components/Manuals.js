// src/components/Manuals.js
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import manualsData from './manualsData';
import {
  manualsStyle,
  categoryStyle,
  fileLinkStyle,
  fileListStyle,
  collapsibleContentStyle,
  activeCollapsibleContentStyle
} from './componentStyles';

const renderFiles = (files) => {
  return files.map((file, index) => {
    if (file.files) {
      return (
        <li key={index}>
          <div css={categoryStyle}>{file.name}</div>
          <ul css={fileListStyle}>
            {renderFiles(file.files)}
          </ul>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <a href={file.link} css={fileLinkStyle} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </li>
      );
    }
  });
};

const Manuals = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapsible = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div css={manualsStyle}>
      <h2>Manuals</h2>
      <ul>
        {manualsData.map((category, index) => (
          <li key={index}>
            <div
              css={categoryStyle}
              onClick={() => toggleCollapsible(index)}
            >
              {category.category}
            </div>
            <ul css={activeIndex === index ? activeCollapsibleContentStyle : collapsibleContentStyle}>
              {renderFiles(category.files)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manuals;
