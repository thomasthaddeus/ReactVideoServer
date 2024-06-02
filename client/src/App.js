// App.js
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import data from '../../server/data/data';
import {
  containerStyle,
  cardStyle,
  titleStyle,
  subheadingStyle,
  thumbnailStyle,
  videoPlayerOverlayStyle,
  closeButtonStyle,
  overlayBackgroundStyle
} from './styles';
import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import Manuals from './components/Manuals';
import Footer from './components/Footer';

const Section = ({ title, sections }) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleThumbnailClick = (link) => {
    const videoURL = `${process.env.REACT_APP_SERVER_BASE_URL}/video?video=${link}`;
    setCurrentVideo(videoURL);
  };

  const handleCloseClick = () => {
    setCurrentVideo(null);
  };

  return (
    <div>
      <TopMenu />
      <Sidebar components={[Manuals]} />
      <h1 css={titleStyle}>{title}</h1>
      <div css={containerStyle}>
        {sections.map((section, index) => (
          <div key={index} css={cardStyle}>
            <img
              src={`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?video=${section.thumbnail}`}
              alt={`Thumbnail for ${section.subheading}`}
              css={thumbnailStyle}
              onClick={() => handleThumbnailClick(section.link)}
            />
            <div className="title" css={subheadingStyle}>{section.subheading}</div>
          </div>
        ))}
      </div>
      {currentVideo && (
        <>
          <div css={overlayBackgroundStyle} onClick={handleCloseClick}></div>
          <div css={videoPlayerOverlayStyle}>
            <button css={closeButtonStyle} onClick={handleCloseClick}>X</button>
            <video controls width="100%">
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

const App = () => <Section title={data.title} sections={data.sections} />;

export default App;
