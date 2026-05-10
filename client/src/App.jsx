// App.js
/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useRef, useState } from 'react';
import data from './data/data';
import {
  pageStyle,
  mainContentStyle,
  containerStyle,
  cardStyle,
  cardBodyStyle,
  cardTitleStyle,
  cardMetaStyle,
  topicListStyle,
  topicTagStyle,
  resultSummaryStyle,
  emptyStateStyle,
  titleStyle,
  thumbnailStyle,
  videoPlayerOverlayStyle,
  modalTitleStyle,
  closeButtonStyle,
  overlayBackgroundStyle
} from './styles';
import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import Manuals from './components/Manuals';
import Footer from './components/Footer';

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3001';

function getSearchText(section) {
  return [
    section.subheading,
    section.disc_title,
    ...(section.topics || []),
    ...(section.items || []),
  ].join(' ').toLowerCase();
}

const Section = ({ title, sections }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const closeButtonRef = useRef(null);

  const filteredSections = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return sections;
    }

    return sections.filter((section) => getSearchText(section).includes(normalizedQuery));
  }, [searchQuery, sections]);

  const handleVideoClick = (section) => {
    const videoURL = `${serverBaseUrl}/video?video=${encodeURIComponent(section.link)}`;
    setCurrentVideo({
      title: section.disc_title || section.subheading,
      subtitle: section.subheading,
      url: videoURL,
    });
  };

  const handleCloseClick = () => {
    setCurrentVideo(null);
  };

  useEffect(() => {
    if (!currentVideo) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentVideo]);

  return (
    <div css={pageStyle}>
      <TopMenu
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Sidebar components={[Manuals]} isCollapsed={isSidebarCollapsed} />
      <main css={mainContentStyle(isSidebarCollapsed)}>
        <h1 id="videos" css={titleStyle}>{title}</h1>
        <div css={resultSummaryStyle}>
          {filteredSections.length} of {sections.length} videos
          {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
        </div>
        {filteredSections.length > 0 ? (
          <div css={containerStyle}>
            {filteredSections.map((section, index) => (
              <button
                key={`${section.link}-${index}`}
                type="button"
                css={cardStyle}
                onClick={() => handleVideoClick(section)}
                aria-label={`Play ${section.disc_title || section.subheading}`}
              >
              <img
                src={`${serverBaseUrl}/thumbnail?video=${encodeURIComponent(section.thumbnail)}`}
                alt={`Thumbnail for ${section.subheading}`}
                css={thumbnailStyle}
              />
                <div css={cardBodyStyle}>
                  <h2 css={cardTitleStyle}>{section.disc_title || section.subheading}</h2>
                  <p css={cardMetaStyle}>{section.subheading}</p>
                  {(section.topics || []).length > 0 && (
                    <ul css={topicListStyle}>
                      {section.topics.slice(0, 3).map((topic) => (
                        <li key={topic} css={topicTagStyle}>{topic}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div css={emptyStateStyle}>
            <h2>No videos found</h2>
            <p>Try a different title, topic, or section.</p>
          </div>
        )}
        <Footer />
      </main>
      {currentVideo && (
        <>
          <div css={overlayBackgroundStyle} onClick={handleCloseClick}></div>
          <div
            css={videoPlayerOverlayStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-player-title"
          >
            <button
              ref={closeButtonRef}
              css={closeButtonStyle}
              onClick={handleCloseClick}
              aria-label="Close video player"
              type="button"
            >
              X
            </button>
            <h2 id="video-player-title" css={modalTitleStyle}>{currentVideo.title}</h2>
            <video controls width="100%">
              <source src={currentVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => <Section title={data.title} sections={data.sections} />;

export default App;
