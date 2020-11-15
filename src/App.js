import React, { useCallback } from 'react';
import './App.css';

import { useState, useEffect } from 'react';

const fontSize = 100;
const viewportWidth = document.documentElement.clientWidth;
console.log("viewportWidth", viewportWidth);
const viewportHeight = document.documentElement.clientHeight;
console.log("viewportHeight", viewportHeight);

// Usage
export default function App() {
  const keyPressed = useKeyPressListener();
  // const modifierKeys = ["Alt", "Shift", "Meta", "Control"]
  // const ignoredKeys = ["Escape"]
  const acceptedKeysRegex = /[A-Za-z0-9]/; // only English alphabets and numbers

  let top = getRandomInt(0, viewportHeight);
  let left = getRandomInt(0, viewportWidth);

  // make sure the character doesn't show up outside of the viewport
  if (viewportHeight - top < fontSize) {
    top = top - (fontSize + 100);
  }
  if (viewportWidth - left < fontSize) {
    left = left - (fontSize + 100);
  }

  return (
    <div style={{
      position: 'absolute',
      top,
      left,
      fontSize: `${fontSize}px`,
    }}>
      {keyPressed.length === 1 && acceptedKeysRegex.test(keyPressed) ? keyPressed : ''}
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
