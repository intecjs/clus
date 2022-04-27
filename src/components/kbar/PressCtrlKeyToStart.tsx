import React from 'react';
import platform from 'platform';
import { useKBar, VisualState } from 'kbar';

export const PressCtrlKeyToStart = () => {
  const { query } = useKBar();
  const handler = () => {
    query.setVisualState(VisualState.animatingIn);
  };

  const osFamily = platform.os?.family;

  const pressCtrlKeyMsg = {
    Windows: 'Press Ctrl + K to start',
    'OS X': 'Press ⌘ + K to start',
  };

  type OSFamily = 'Windows' | 'OS X';

  return (
    <div
      style={{
        cursor: 'pointer',
        position: 'fixed',
        bottom: '1%',
        right: '1%',
        color: 'gray',
      }}
      onClick={() => handler()}
    >
      {osFamily ? pressCtrlKeyMsg[osFamily as OSFamily] : ''}
    </div>
  );
};
