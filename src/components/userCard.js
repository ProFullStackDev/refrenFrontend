import React from 'react';
import './common.css';

const UserCard = (props) => {
  const { val, index, className, onHover, searchText, onSelect } = props;

  // method to render searched text in blue color that matches..
  const searchMatchText = (txt) => {
    const match =
      txt.substring(0, searchText.length).toLowerCase() ===
      searchText.toLowerCase();

    if (match) {
      return (
        <span>
          <span style={{ color: '#327de5' }}>
            {txt.substring(0, searchText.length)}
          </span>
          {txt.substring(searchText.length)}
        </span>
      );
    } else {
      return txt;
    }
  };
  return (
    <li
      className={`listItem-card ${className}`}
      onMouseOver={() => onHover(index)}
      onClick={() => onSelect()}
      style={{
        borderBottomWidth: 0.1,
        borderBottomColor: '#f0f0f0',
        borderBottomStyle: 'double',
      }}
    >
      <div style={{ color: '#4e4e4e', fontWeight: '700' }}>
        {searchMatchText(val.ID)}
      </div>
      <div
        style={{
          color: '#5e6267',
          fontWeight: '500',
          fontStyle: 'italic',
          paddingTop: 2,
        }}
      >
        {searchMatchText(val.name)}
      </div>
      <div className="cardContent" style={{ color: '#5e6267', paddingTop: 4 }}>
        {searchMatchText(val.address)}
      </div>
      <div className="cardContent" style={{ color: '#5e6267', paddingTop: 4 }}>
        Pincode: {searchMatchText(val.pincode)}
      </div>

      <div
        className="itemsList"
        style={{ color: '#5e6267', fontWeight: '400' }}
      >
        Items
        {/* map user items */}
        {val.items.map((element, ind) => {
          return (
            <span
              style={{ marginLeft: 8, fontWeight: '300', letterSpacing: 0.4 }}
              key={ind}
            >
              {searchMatchText(element)}
            </span>
          );
        })}
      </div>
    </li>
  );
};

export default UserCard;
