import React, { useState } from 'react';
import './common.css';
import image from './avatar.png';

// on selecting card from suggestion list result card will be rendered
const ResultCard = (props) => {
  const { val } = props;
  return (
    <div className={`listItem-Resultcard`} style={{ color: '#5e6267' }}>
      <div className="headerContent">
        <div>
          <div
            style={{
              fontWeight: '500',
              letterSpacing: 0.3,
            }}
          >
            {val.ID.toUpperCase()}
          </div>
          <div
            style={{
              fontStyle: 'italic',
              fontWeight: '300',
              letterSpacing: 0.3,
            }}
          >
            {val.name}
          </div>
        </div>
        <img src={image} height={48} width={48} />
      </div>
      <div>
        <span
          style={{
            fontWeight: '400',
            letterSpacing: 0.4,
            fontSize: 14,
          }}
        >
          {val.address}
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: '400',
            letterSpacing: 0.4,
            fontSize: 14,
          }}
        >
          Pincode:{' '}
          <span
            style={{
              fontWeight: '300',
              letterSpacing: 0.2,
              fontSize: 14,
            }}
          >
            {val.pincode}
          </span>
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: '400',
            letterSpacing: 0.4,
            fontSize: 14,
          }}
        >
          {' '}
          Items:
        </span>
        {val.items.map((element, ind) => {
          return (
            <span
              style={{
                marginLeft: 8,
                fontWeight: '300',
                letterSpacing: 0.2,
                fontSize: 14,
              }}
              key={ind}
            >
              {element}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;
