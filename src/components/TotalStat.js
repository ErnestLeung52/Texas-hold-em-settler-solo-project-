import React from 'react';

const TotalStat = (props) => {
  return (
    <>
      {props.total !== 0 ? (
        <div className='failed'>Difference: {props.total}</div>
      ) : (
        <div className='checked'>All Balanced ✅ </div>
      )}
    </>
  );
};

export default TotalStat;
