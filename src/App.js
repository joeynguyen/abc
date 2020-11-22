import React, { useCallback, useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [keysPressed, ] = useKeysPressed();
  console.log("keysPressed", keysPressed);

  // const modifierKeys = ["Alt", "Shift", "Meta", "Control"]
  const alphaNumericRegex = /[A-Za-z0-9]/; // only English alphabets and numbers

  return keysPressed.map((keyItem, idx) => {
    return (
      <div
        key={`${keyItem.value}${idx}`}
        className="char"
        style={{
          top: keyItem.top,
          left: keyItem.left,
        }}>
        {
          keyItem.value.length === 1 && alphaNumericRegex.test(keyItem.value)
            ? keyItem.value
            : '*'
        }
      </div>
    );
  });
}

function useKeysPressed() {
  // State for keeping track of whether key is pressed
  const [keysPressed, setKeysPressed] = useState([]);

  const downHandler = useCallback(({ key }) => {
    const coords = getCoordinates();
    console.log("key", key);
    const keyItem = {
      value: key,
      top: coords.top,
      left: coords.left,
    }
    if (keysPressed.length === 5) {
      setKeysPressed([...keysPressed.slice(1), keyItem]);
    } else {
      setKeysPressed([...keysPressed, keyItem]);
    }

  }, [keysPressed]);
  console.log("keysPressed", keysPressed);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]);

  return [keysPressed, setKeysPressed];
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
