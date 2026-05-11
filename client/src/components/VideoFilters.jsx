/** @jsxImportSource @emotion/react */
import {
  filterButtonStyle,
  filterCountStyle,
  filterGroupStyle,
  filterGroupTitleStyle,
  filterHeaderStyle,
  filterListStyle,
  filterPanelStyle,
  filterResetButtonStyle,
} from './componentStyles';

const FILTER_GROUPS = [
  { key: 'sections', title: 'Sections', singular: 'section' },
  { key: 'topics', title: 'Topics', singular: 'topic' },
  { key: 'mediaTypes', title: 'Media Type', singular: 'media type' },
];

const VideoFilters = ({ filterOptions, selectedFilters, onToggleFilter, onClearFilters }) => {
  const hasActiveFilters = Object.values(selectedFilters).some((values) => values.length > 0);

  return (
    <section css={filterPanelStyle} aria-label="Video filters">
      <div css={filterHeaderStyle}>
        <h2>Video Filters</h2>
        {hasActiveFilters && (
          <button type="button" css={filterResetButtonStyle} onClick={onClearFilters}>
            Clear
          </button>
        )}
      </div>
      {FILTER_GROUPS.map((group) => {
        const options = filterOptions[group.key] || [];

        if (options.length === 0) {
          return null;
        }

        return (
          <div key={group.key} css={filterGroupStyle}>
            <h3 css={filterGroupTitleStyle}>{group.title}</h3>
            <div css={filterListStyle}>
              {options.map((option) => {
                const isActive = selectedFilters[group.key].includes(option.value);
                const action = isActive ? 'Remove' : 'Filter by';

                return (
                  <button
                    key={option.value}
                    type="button"
                    css={filterButtonStyle(isActive)}
                    aria-pressed={isActive}
                    aria-label={`${action} ${group.singular} ${option.label}`}
                    onClick={() => onToggleFilter(group.key, option.value)}
                  >
                    <span>{option.label}</span>
                    <span css={filterCountStyle}>{option.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default VideoFilters;
