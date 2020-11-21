import React, { useCallback, useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const keyPressed = useKeyPress();
  // const modifierKeys = ["Alt", "Shift", "Meta", "Control"]
  // const ignoredKeys = ["Escape"]
  const acceptedKeysRegex = /[A-Za-z0-9]/; // only English alphabets and numbers

  const coords = getCoordinates();

  return (
    <div
      className="char"
      style={{
        top: coords.top,
        left: coords.left,
      }}>
      {
        keyPressed.length === 1 && acceptedKeysRegex.test(keyPressed)
          ? keyPressed
          : ''
      }
    </div>
  );
}

function useKeyPress() {
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
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

const fontSize = 100;
const viewportWidth = document.documentElement.clientWidth;
const viewportHeight = document.documentElement.clientHeight;

function getCoordinates() {
  let top = getRandomInt(0, viewportHeight);
  let left = getRandomInt(0, viewportWidth);

  // make sure the character doesn't show up outside of the viewport
  if (viewportHeight - top < fontSize) {
    top = top - (fontSize * 2.1);
  }
  if (viewportWidth - left < fontSize) {
    left = left - (fontSize * 2.1);
  }

  return {
    top,
    left,
  };
}
