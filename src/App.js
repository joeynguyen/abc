import React, { useCallback } from 'react';
import './App.css';

import { useState, useEffect } from 'react';

// Usage
export default function App() {
  const keyPressed = useKeyPressListener();
  console.log("keyPressed", keyPressed);
  // Call our hook for each key that we'd like to monitor
  const happyPress = useKeyPress('h');
  const sadPress = useKeyPress('s');
  const robotPress = useKeyPress('r');
  const foxPress = useKeyPress('f');

  return (
    <div>
      <div>h, s, r, f</div>
      <div>
        {happyPress && '😊'}
        {sadPress && '😢'}
        {robotPress && '🤖'}
        {foxPress && '🦊'}
      </div>
    </div>
  );
}

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }, [targetKey]);

  // If released key is our target key then set to false
  const upHandler = useCallback(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }, [targetKey]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function useKeyPressListener() {

  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState('');

  // If pressed key is our target key then set to true
  const downHandler = useCallback(({ key }) => {
    setKeyPressed(key);
  }, []);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
