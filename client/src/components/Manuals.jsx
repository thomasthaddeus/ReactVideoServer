// src/components/Manuals.js
/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import manualsData from './manualsData';
import {
  manualsStyle,
  manualCategoryButtonStyle,
  manualDisclosureStyle,
  manualEmptyStateStyle,
  manualSearchMetaStyle,
  manualSearchStyle,
  fileLinkStyle,
  fileListStyle,
} from './componentStyles';

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3001';

function resolveManualLink(link) {
  if (/^https?:\/\//i.test(link)) {
    return link;
  }

  const normalizedLink = link
    .replace(/^\.\//, '/')
    .replace(/^\/?docs\//, '/docs/');

  return `${serverBaseUrl}${normalizedLink}`;
}

function getManualSearchText(file) {
  return [file.name, file.link].filter(Boolean).join(' ').toLowerCase();
}

function filterManualFiles(files, normalizedQuery) {
  if (!normalizedQuery) {
    return files;
  }

  return files.reduce((matches, file) => {
    const isGroup = Array.isArray(file.files);
    const selfMatches = getManualSearchText(file).includes(normalizedQuery);

    if (!isGroup) {
      return selfMatches ? [...matches, file] : matches;
    }

    const filteredChildren = filterManualFiles(file.files, normalizedQuery);

    if (selfMatches) {
      return [...matches, file];
    }

    if (filteredChildren.length > 0) {
      return [...matches, { ...file, files: filteredChildren }];
    }

    return matches;
  }, []);
}

function filterManualCategories(categories, normalizedQuery) {
  if (!normalizedQuery) {
    return categories;
  }

  return categories.reduce((matches, category) => {
    const categoryMatches = category.category.toLowerCase().includes(normalizedQuery);
    const filteredFiles = filterManualFiles(category.files, normalizedQuery);

    if (categoryMatches) {
      return [...matches, category];
    }

    if (filteredFiles.length > 0) {
      return [...matches, { ...category, files: filteredFiles }];
    }

    return matches;
  }, []);
}

function countManualLinks(files) {
  return files.reduce((count, file) => {
    if (file.files) {
      return count + countManualLinks(file.files);
    }

    return count + 1;
  }, 0);
}

const Manuals = ({ onManualSelect }) => {
  const [expandedGroups, setExpandedGroups] = useState(() => new Set());
  const [manualSearchQuery, setManualSearchQuery] = useState('');
  const normalizedQuery = manualSearchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredManuals = useMemo(
    () => filterManualCategories(manualsData, normalizedQuery),
    [normalizedQuery]
  );

  const manualResultCount = useMemo(
    () => filteredManuals.reduce((count, category) => count + countManualLinks(category.files), 0),
    [filteredManuals]
  );

  const toggleCollapsible = (id) => {
    setExpandedGroups((currentGroups) => {
      const nextGroups = new Set(currentGroups);

      if (nextGroups.has(id)) {
        nextGroups.delete(id);
      } else {
        nextGroups.add(id);
      }

      return nextGroups;
    });
  };

  const renderFiles = (files, parentId, depth = 1) => {
    return files.map((file, index) => {
      const itemId = `${parentId}-${index}`;

      if (file.files) {
        const isExpanded = isSearching || expandedGroups.has(itemId);

        return (
          <li key={itemId}>
            <button
              type="button"
              css={manualCategoryButtonStyle(depth)}
              onClick={() => toggleCollapsible(itemId)}
              aria-expanded={isExpanded}
            >
              <span css={manualDisclosureStyle} aria-hidden="true">
                {isExpanded ? 'v' : '>'}
              </span>
              <span>{file.name}</span>
            </button>
            {isExpanded && (
              <ul css={fileListStyle(depth + 1)}>
                {renderFiles(file.files, itemId, depth + 1)}
              </ul>
            )}
          </li>
        );
      }

      return (
        <li key={itemId}>
          <a
            href={resolveManualLink(file.link)}
            css={fileLinkStyle}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onManualSelect}
          >
            {file.name}
          </a>
        </li>
      );
    });
  };

  return (
    <section id="manuals" css={manualsStyle} aria-label="Manuals">
      <h2>Manuals</h2>
      <input
        type="search"
        css={manualSearchStyle}
        aria-label="Search manuals"
        placeholder="Search manuals"
        value={manualSearchQuery}
        onChange={(event) => setManualSearchQuery(event.target.value)}
      />
      {isSearching && (
        <div css={manualSearchMetaStyle}>
          {manualResultCount} {manualResultCount === 1 ? 'manual' : 'manuals'} matching "{manualSearchQuery.trim()}"
        </div>
      )}
      <ul>
        {filteredManuals.map((category, index) => {
          const categoryId = `category-${index}`;
          const isExpanded = isSearching || expandedGroups.has(categoryId);

          return (
            <li key={category.category}>
              <button
                type="button"
                css={manualCategoryButtonStyle(0)}
                onClick={() => toggleCollapsible(categoryId)}
                aria-expanded={isExpanded}
              >
                <span css={manualDisclosureStyle} aria-hidden="true">
                  {isExpanded ? 'v' : '>'}
                </span>
                <span>{category.category}</span>
              </button>
              {isExpanded && (
                <ul css={fileListStyle(1)}>
                  {renderFiles(category.files, categoryId)}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {filteredManuals.length === 0 && (
        <p css={manualEmptyStateStyle}>
          No manuals found.
        </p>
      )}
    </section>
  );
};

export default Manuals;
