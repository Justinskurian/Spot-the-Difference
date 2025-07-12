// File: src/components/Game.jsx
import React, { useEffect, useRef, useState } from 'react';

function Game({ gameData }) {
  const [found, setFound] = useState(0);
  const [timer, setTimer] = useState(0);
  const [completed, setCompleted] = useState(false);

  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const img1 = image1Ref.current;
    const img2 = image2Ref.current;

    const loadImages = () => {
      if (img1.complete && img2.complete) {
        drawDifferences();
      } else {
        img1.onload = img2.onload = drawDifferences;
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (completed) {
      clearInterval(timerRef.current);
    }
  }, [completed]);

  const drawDifferences = () => {
    const img = image2Ref.current;

    const width = img.naturalWidth;
    const height = img.naturalHeight;

    if (!width || !height) return;

    gameData.differences.forEach((diff, index) => {
      const createBox = () => {
        const box = document.createElement('div');
        box.className = 'highlight';
        box.style.top = `${(diff.y / height) * 100}%`;
        box.style.left = `${(diff.x / width) * 100}%`;
        box.style.width = `${(diff.width / width) * 100}%`;
        box.style.height = `${(diff.height / height) * 100}%`;
        box.dataset.index = index;
        box.style.display = 'none';
        return box;
      };

      overlay1Ref.current.appendChild(createBox());
      overlay2Ref.current.appendChild(createBox());
    });
  };

  const handleClick = (e) => {
    const rect = image2Ref.current.getBoundingClientRect();
    const scaleX = image2Ref.current.naturalWidth / rect.width;
    const scaleY = image2Ref.current.naturalHeight / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    gameData.differences.forEach((diff, index) => {
      const alreadyFound = document.querySelector(`.highlight[data-index="${index}"]`)?.classList.contains('found');
      if (alreadyFound) return;

      const within =
        clickX >= diff.x &&
        clickX <= diff.x + diff.width &&
        clickY >= diff.y &&
        clickY <= diff.y + diff.height;

      if (within) {
        const highlights = document.querySelectorAll(`.highlight[data-index="${index}"]`);
        highlights.forEach((h) => {
          h.style.display = 'block';
          h.classList.add('found');
        });

        setFound((prev) => {
          const newCount = prev + 1;
          if (newCount === gameData.differences.length) {
            setCompleted(true);
          }
          return newCount;
        });
      }
    });
  };

  return (
    <div>    <h2>{gameData.gameTitle}</h2>
    <div className="game-container">
        <div className="info">
            <p>Click on the differences you spot in the second image!</p><br/>
        <p>Score: {found} / {gameData.differences.length}</p><span/>
        <p>Time: {timer}s</p><br/>
        {completed && <p className="message">🎉 All differences found!</p>}
      </div>
      <div className="images">
        <div className="image-wrapper">
          <img ref={image1Ref} src={gameData.images.image1} alt="Image 1" />
          <div className="overlay" ref={overlay1Ref}></div>
        </div>
        <div className="image-wrapper" id="image2-container" onClick={handleClick}>
          <img ref={image2Ref} src={gameData.images.image2} alt="Image 2" />
          <div className="overlay" ref={overlay2Ref}></div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Game;
