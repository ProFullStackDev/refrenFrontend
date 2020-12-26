import React from 'react';
import './itemCss.css';
import SearchMatchText from './searchMatchText';

const SuggestionsListItem = (props) => {
  const { val, index, className, onHover, searchText, onSelect } = props;

  return (
    <li
      className={`listItem-card ${className}`}
      onMouseOver={() => onHover(index)}
      onClick={() => onSelect()}
    >
      <div className="divIDContent">{SearchMatchText(val.ID, searchText)}</div>
      <div className="divNameContent">
        {SearchMatchText(val.name, searchText)}
      </div>
      <div className="cardContent">
        {SearchMatchText(val.address, searchText)}
      </div>
      <div className="cardContent">
        Pincode: {SearchMatchText(val.pincode, searchText)}
      </div>

      <div className="itemsList">
        Items
        {val.items.map((element, ind) => {
          return (
            <span className="spanItem" style={{ marginLeft: 10 }} key={ind}>
              {SearchMatchText(element, searchText)}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default SuggestionsListItem;
