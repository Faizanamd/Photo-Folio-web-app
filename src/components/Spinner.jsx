import React from 'react';
import Spinner from 'react-spinner-material';

function SpinnerCom() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
      }}
    >
      <Spinner radius={100} color="#007BFF" stroke={4} visible={true} />
    </div>
  );
}

export default SpinnerCom;
