// src/components/SearchBar.js
/** @jsxImportSource @emotion/react */
import { searchBarStyle } from "./componentStyles";

const SearchBar = () => (
  <input type="text" placeholder="Search..." css={searchBarStyle} />
);

export default SearchBar;
