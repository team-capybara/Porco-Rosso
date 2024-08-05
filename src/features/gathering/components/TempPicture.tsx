import React from 'react';

const TempPicture = React.memo(function TempPicture(pictureId: number) {
  const tempPictureStyle = {
    minWidth: 'calc(calc(100vw - 40px)/3)',
    minHeight: 'calc(calc(100vw - 40px)/3)',
    background: 'grey',
    border: '1px solid red',
  };

  return (
    <div style={tempPictureStyle}>
      <p>{pictureId + 'ss'}</p>
    </div>
  );
});

TempPicture.displayName = 'TempPicture';

export default TempPicture;
