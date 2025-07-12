import React, { useState } from 'react';

const ConfigScreen = ({ onStart }) => {
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      onStart(json);
    } catch (err) {
      setError('Invalid JSON file');
    }
  };

  const loadDefault = async () => {
    try {
      const res = await fetch('/gameData.json');
      const json = await res.json();
      onStart(json);
    } catch {
      setError('Could not load default configuration');
    }
  };

  return (
    <div className="config-screen">
      <h1>Spot the Difference</h1>
      <p>Load a game configuration:</p>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={loadDefault}>Use Default Level</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfigScreen;
