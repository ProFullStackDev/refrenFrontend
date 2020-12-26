import React from 'react';
import './resultList.css';
import { ResultListItem } from './ResultListItem';

// on selecting card from suggestion list result card will be rendered
const ResultList = (props) => {
  const { selectedUser, showSuggestionList } = props;
  return (
    selectedUser &&
    !showSuggestionList && (
      <div className="search-results">
        {selectedUser.map((user, index) => (
          <ResultListItem val={user} key={index} />
        ))}
      </div>
    )
  );
};

export default ResultList;
