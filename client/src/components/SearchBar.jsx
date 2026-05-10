// src/components/SearchBar.js
/** @jsxImportSource @emotion/react */
import { searchBarStyle } from "./componentStyles";

const SearchBar = ({ value, onChange }) => (
  <input
    type="search"
    placeholder="Search videos"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    css={searchBarStyle}
    aria-label="Search videos"
  />
);

export default SearchBar;
