import React from 'react';

const CopyToClipboardButton = ({ content }) => {
  const handleCopy = () => {
    try {
      document.execCommand('copy');
      console.log('Copied to clipboard:', content);
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  };

  return (
    <button onClick={handleCopy}>Copy JSON</button>
  );
};

export default CopyToClipboardButton;