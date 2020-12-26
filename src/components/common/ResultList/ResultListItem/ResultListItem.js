import React from 'react';
import './resultListItem.css';
import image from './avatar.png';

// on selecting card from suggestion list result card will be rendered
const ResultListItem = (props) => {
  const { val } = props;
  return (
    <div className={`listItem-Resultcard`}>
      <div className="headerContent">
        <div>
          <div className="idContent">{val.ID.toUpperCase()}</div>
          <div className="nameDiv">{val.name}</div>
        </div>
        <img src={image} height={48} width={48} alt="profilePic" />
      </div>
      <div>
        <span className="bodyContent">{val.address}</span>
      </div>
      <div>
        <span className="bodyContent">
          Pincode: <span className="itemContent">{val.pincode}</span>
        </span>
      </div>
      <div>
        <span className="itemContent"> Items:</span>
        {/* map user items */}
        {val.items.map((element, ind) => {
          return (
            <span className="itemContent spacing" key={ind}>
              {element}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ResultListItem;
