import React from 'react';
import platform from 'platform';

export const PressCtrlKeyToStart = () => {
  const osFamily = platform.os?.family;

  const pressCtrlKeyMsg = {
    Windows: 'Press Ctrl + K to start',
    'OS X': 'Press ⌘ + K to start',
  };

  type OSFamily = 'Windows' | 'OS X';
  return (
    <div style={{ position: 'fixed', bottom: '1%', right: '1%', color: 'gray' }}>
      {osFamily ? pressCtrlKeyMsg[osFamily as OSFamily] : ''}
    </div>
  );
};
