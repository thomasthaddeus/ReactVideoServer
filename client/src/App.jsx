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
  lastWatchedButtonStyle,
  lastWatchedStyle,
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
  modalControlsStyle,
  modalNavButtonStyle,
  modalPositionStyle,
  closeButtonStyle,
  videoElementStyle,
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
const lastWatchedStorageKey = 'video-library:last-watched';
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

function getStoredLastWatchedVideo() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const storedVideo = window.localStorage.getItem(lastWatchedStorageKey);
    return storedVideo ? JSON.parse(storedVideo) : null;
  } catch {
    return null;
  }
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
  const [lastWatchedVideo, setLastWatchedVideo] = useState(getStoredLastWatchedVideo);
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const cardRefs = useRef([]);
  const returnFocusRef = useRef(null);

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

  const storeLastWatchedVideo = (section) => {
    const nextLastWatchedVideo = {
      link: section.link,
      title: section.disc_title || section.subheading,
      subtitle: section.subheading,
    };

    setLastWatchedVideo(nextLastWatchedVideo);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(lastWatchedStorageKey, JSON.stringify(nextLastWatchedVideo));
      }
    } catch {
      // Last-watched state is helpful, but playback should never depend on storage availability.
    }
  };

  const openVideoAtIndex = (index, focusTarget = null) => {
    const section = filteredSections[index];

    if (!section) {
      return;
    }

    const videoURL = `${serverBaseUrl}/video?video=${encodeURIComponent(section.link)}`;
    returnFocusRef.current = focusTarget || cardRefs.current[index] || returnFocusRef.current;
    setIsVideoLoading(true);
    setVideoError('');
    setCurrentVideo({
      index,
      title: section.disc_title || section.subheading,
      subtitle: section.subheading,
      url: videoURL,
    });
    storeLastWatchedVideo(section);
  };

  const handleVideoClick = (section, index, triggerElement) => {
    openVideoAtIndex(index, triggerElement);
  };

  const handleCloseClick = () => {
    returnFocusRef.current?.focus();
    setCurrentVideo(null);
    setIsVideoLoading(false);
    setVideoError('');
  };

  const handlePreviousVideo = () => {
    openVideoAtIndex(currentVideo.index - 1);
  };

  const handleNextVideo = () => {
    openVideoAtIndex(currentVideo.index + 1);
  };

  const handleResumeLastWatched = () => {
    const index = filteredSections.findIndex((section) => section.link === lastWatchedVideo?.link);
    if (index >= 0) {
      openVideoAtIndex(index);
    }
  };

  useEffect(() => {
    if (!currentVideo) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseClick();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = modalRef.current?.querySelectorAll(
        'button:not(:disabled), video[controls], [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusableList = Array.from(focusableElements || []);

      if (focusableList.length === 0) {
        return;
      }

      const firstElement = focusableList[0];
      const lastElement = focusableList[focusableList.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
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
        {lastWatchedVideo && (
          <div css={lastWatchedStyle}>
            <span>Last watched: {lastWatchedVideo.title}</span>
            <button type="button" css={lastWatchedButtonStyle} onClick={handleResumeLastWatched}>
              Resume
            </button>
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
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                type="button"
                css={cardStyle}
                onClick={(event) => handleVideoClick(section, index, event.currentTarget)}
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
            ref={modalRef}
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
            <div css={modalControlsStyle}>
              <button
                type="button"
                css={modalNavButtonStyle}
                onClick={handlePreviousVideo}
                disabled={currentVideo.index === 0}
              >
                Previous
              </button>
              <span css={modalPositionStyle}>
                {currentVideo.index + 1} of {filteredSections.length}
              </span>
              <button
                type="button"
                css={modalNavButtonStyle}
                onClick={handleNextVideo}
                disabled={currentVideo.index >= filteredSections.length - 1}
              >
                Next
              </button>
            </div>
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
              css={videoElementStyle}
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
