import React from 'react';
import { SuggestionsListItem } from './SuggestionsListItem';
import './suggestList.css';

const SuggestionsList = (props) => {
  const {
    search,
    searchData,
    showSuggestionList,
    setCursor,
    onSelect,
    cursor,
  } = props;
  return searchData && showSuggestionList && searchData.length > 0
    ? searchData.map((val, index) => (
        <SuggestionsListItem
          val={val}
          index={index}
          key={index}
          className={cursor === index ? 'active' : null}
          onHover={(val) => setCursor(val)}
          searchText={search}
          onSelect={() => onSelect()}
        />
      ))
    : searchData &&
      showSuggestionList &&
      search.length > 0 && <div className="noUserDiv">No user found</div>;
};

export default SuggestionsList;
