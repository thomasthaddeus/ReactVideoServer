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
  serverStatusStyle,
  activeFilterBarStyle,
  activeFilterChipStyle,
  clearActiveFiltersButtonStyle,
  emptyStateStyle,
  titleStyle,
  thumbnailStyle,
  thumbnailFallbackStyle,
  thumbnailFallbackMetaStyle,
  thumbnailFallbackTitleStyle,
  videoPlayerOverlayStyle,
  modalTitleStyle,
  closeButtonStyle,
  videoErrorStyle,
  videoStatusStyle,
  overlayBackgroundStyle
} from './styles';
import TopMenu from './components/TopMenu';
import Sidebar from './components/Sidebar';
import Manuals from './components/Manuals';
import VideoFilters from './components/VideoFilters';
import Footer from './components/Footer';

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3001';
const mediaFailureWarningThreshold = 3;
const emptyFilters = { sections: [], topics: [], mediaTypes: [] };
const filterGroupLabels = {
  sections: 'Section',
  topics: 'Topic',
  mediaTypes: 'Type',
};

function getSearchText(section) {
  return [
    section.subheading,
    section.disc_title,
    ...(section.topics || []),
    ...(section.items || []),
  ].join(' ').toLowerCase();
}

function getMediaType(link = '') {
  const [fileName] = link.split('?');
  const extension = fileName.includes('.') ? fileName.split('.').pop().trim().toLowerCase() : '';
  return extension || 'unknown';
}

function addCount(counts, value) {
  if (!value) {
    return;
  }

  counts.set(value, (counts.get(value) || 0) + 1);
}

function mapCountsToOptions(counts, labelFormatter = (value) => value) {
  return [...counts.entries()]
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([value, count]) => ({
      value,
      label: labelFormatter(value),
      count,
    }));
}

function buildFilterOptions(videoSections) {
  const sectionCounts = new Map();
  const topicCounts = new Map();
  const mediaTypeCounts = new Map();

  videoSections.forEach((section) => {
    addCount(sectionCounts, section.subheading);
    addCount(mediaTypeCounts, getMediaType(section.link));
    (section.topics || []).forEach((topic) => addCount(topicCounts, topic));
  });

  return {
    sections: mapCountsToOptions(sectionCounts),
    topics: mapCountsToOptions(topicCounts),
    mediaTypes: mapCountsToOptions(mediaTypeCounts, (value) => value.toUpperCase()),
  };
}

function matchesSelectedFilters(section, selectedFilters) {
  const mediaType = getMediaType(section.link);
  const sectionTopics = section.topics || [];

  const matchesSection = selectedFilters.sections.length === 0
    || selectedFilters.sections.includes(section.subheading);
  const matchesTopic = selectedFilters.topics.length === 0
    || selectedFilters.topics.some((topic) => sectionTopics.includes(topic));
  const matchesMediaType = selectedFilters.mediaTypes.length === 0
    || selectedFilters.mediaTypes.includes(mediaType);

  return matchesSection && matchesTopic && matchesMediaType;
}

function getFilterLabel(filterOptions, type, value) {
  return filterOptions[type]?.find((option) => option.value === value)?.label || value;
}

function isMobileViewport() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(max-width: 760px)').matches;
}

const Section = ({ title, sections }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
  const [failedThumbnails, setFailedThumbnails] = useState(() => new Set());
  const [mediaFailureCount, setMediaFailureCount] = useState(0);
  const [isServerUnavailable, setIsServerUnavailable] = useState(false);
  const closeButtonRef = useRef(null);

  const filterOptions = useMemo(() => buildFilterOptions(sections), [sections]);

  const activeFilterChips = useMemo(() => (
    Object.entries(selectedFilters).flatMap(([type, values]) => (
      values.map((value) => ({
        type,
        value,
        groupLabel: filterGroupLabels[type],
        label: getFilterLabel(filterOptions, type, value),
      }))
    ))
  ), [filterOptions, selectedFilters]);

  const filteredSections = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return sections.filter((section) => {
      const matchesSearch = !normalizedQuery || getSearchText(section).includes(normalizedQuery);
      return matchesSearch && matchesSelectedFilters(section, selectedFilters);
    });
  }, [searchQuery, sections, selectedFilters]);

  const handleToggleFilter = (type, value) => {
    setSelectedFilters((currentFilters) => {
      const currentValues = currentFilters[type];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((currentValue) => currentValue !== value)
        : [...currentValues, value];

      return {
        ...currentFilters,
        [type]: nextValues,
      };
    });
  };

  const handleClearFilter = (type, value) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: currentFilters[type].filter((currentValue) => currentValue !== value),
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters(emptyFilters);
  };

  const closeSidebarOnMobile = () => {
    if (isMobileViewport()) {
      setIsSidebarCollapsed(true);
    }
  };

  const recordMediaFailure = () => {
    setMediaFailureCount((count) => count + 1);
  };

  const handleThumbnailError = (thumbnail) => {
    setFailedThumbnails((currentThumbnails) => {
      if (currentThumbnails.has(thumbnail)) {
        return currentThumbnails;
      }

      const nextThumbnails = new Set(currentThumbnails);
      nextThumbnails.add(thumbnail);
      return nextThumbnails;
    });
    recordMediaFailure();
  };

  const handleVideoClick = (section) => {
    const videoURL = `${serverBaseUrl}/video?video=${encodeURIComponent(section.link)}`;
    setIsVideoLoading(true);
    setVideoError('');
    setCurrentVideo({
      title: section.disc_title || section.subheading,
      subtitle: section.subheading,
      url: videoURL,
    });
  };

  const handleCloseClick = () => {
    setCurrentVideo(null);
    setIsVideoLoading(false);
    setVideoError('');
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

  useEffect(() => {
    if (mediaFailureCount < mediaFailureWarningThreshold) {
      return undefined;
    }

    let isCancelled = false;

    if (typeof fetch !== 'function') {
      setIsServerUnavailable(true);
      return undefined;
    }

    fetch(`${serverBaseUrl}/health`)
      .then((response) => {
        if (!isCancelled) {
          setIsServerUnavailable(!response.ok);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setIsServerUnavailable(true);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [mediaFailureCount]);

  return (
    <div css={pageStyle}>
      <TopMenu
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
        onNavigate={closeSidebarOnMobile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarCollapsed(true)}
      >
        <VideoFilters
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onToggleFilter={handleToggleFilter}
          onClearFilters={handleClearFilters}
        />
        <Manuals onManualSelect={closeSidebarOnMobile} />
      </Sidebar>
      <main css={mainContentStyle(isSidebarCollapsed)}>
        <h1 id="videos" css={titleStyle}>{title}</h1>
        <div css={resultSummaryStyle}>
          {filteredSections.length} of {sections.length} videos
          {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
          {activeFilterChips.length > 0
            ? ` with ${activeFilterChips.length} active ${activeFilterChips.length === 1 ? 'filter' : 'filters'}`
            : ''}
        </div>
        {isServerUnavailable && (
          <div css={serverStatusStyle} role="status">
            Media server appears to be unavailable. Thumbnails or videos may not load until it is running.
          </div>
        )}
        {activeFilterChips.length > 0 && (
          <div css={activeFilterBarStyle} aria-label="Active filters">
            {activeFilterChips.map((chip) => (
              <button
                key={`${chip.type}-${chip.value}`}
                type="button"
                css={activeFilterChipStyle}
                onClick={() => handleClearFilter(chip.type, chip.value)}
                aria-label={`Remove ${chip.groupLabel.toLowerCase()} ${chip.label}`}
              >
                {chip.groupLabel}: {chip.label}
                <span aria-hidden="true">x</span>
              </button>
            ))}
            <button type="button" css={clearActiveFiltersButtonStyle} onClick={handleClearFilters}>
              Clear filters
            </button>
          </div>
        )}
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
                {failedThumbnails.has(section.thumbnail) ? (
                  <div css={thumbnailFallbackStyle} role="img" aria-label={`Thumbnail unavailable for ${section.subheading}`}>
                    <span css={thumbnailFallbackTitleStyle}>Thumbnail unavailable</span>
                    <span css={thumbnailFallbackMetaStyle}>{section.subheading}</span>
                  </div>
                ) : (
                  <img
                    src={`${serverBaseUrl}/thumbnail?video=${encodeURIComponent(section.thumbnail)}`}
                    alt={`Thumbnail for ${section.subheading}`}
                    css={thumbnailStyle}
                    onError={() => handleThumbnailError(section.thumbnail)}
                  />
                )}
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
            {isVideoLoading && (
              <div css={videoStatusStyle} role="status">
                Loading video...
              </div>
            )}
            {videoError && (
              <div css={videoErrorStyle} role="alert">
                {videoError}
              </div>
            )}
            <video
              controls
              width="100%"
              onLoadStart={() => {
                setIsVideoLoading(true);
                setVideoError('');
              }}
              onCanPlay={() => setIsVideoLoading(false)}
              onError={() => {
                setIsVideoLoading(false);
                setVideoError('Video could not be loaded. Check that the media server is running and the file exists.');
                recordMediaFailure();
              }}
            >
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
