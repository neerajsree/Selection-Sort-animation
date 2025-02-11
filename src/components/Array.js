import React, { useState } from 'react';
import '../components/Array.css';

const Sort = () => {
  const [inputArray, setInputArray] = useState('');
  const [array, setArray] = useState([]);
  const [sortedSteps, setSortedSteps] = useState([]);

  const arrfun = (e) => setInputArray(e.target.value);

  const parseArray = () => {
    const parsedArray = inputArray.split(',')
      .map(num => Number(num.trim() ))
      .filter(num => !isNaN(num));

      if (parsedArray.length > 0) {
        setArray(parsedArray);
      } else {
        alert('Enter valid numbers!');
      }
    
      setSortedSteps([]);
  };

  const selectionSort = () => {
    let arr = [...array], steps = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++)
        if (arr[j] < arr[minIndex]) minIndex = j;
      if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push([...arr]);
    }
    setArray(arr);
    setSortedSteps(steps);
  };

  return (
    <div className="selection-sort-container">
      <h2>Selection Sort</h2>
      
      <div className="input-section">
        <input 
          type="text" value={inputArray} onChange={arrfun}
          placeholder="Enter numbers (comma-separated)" className="array-input"
        />
        <button onClick={parseArray} className="parse-button">Load Array</button>
      </div>

      {array.length > 0 && (
        <>
          <div className="array-display">{array.map((num, i) => <div key={i} className="array-item">{num}</div>)}</div>
          <div className="button-group">
            <button onClick={selectionSort} className="sort-button">Sort</button>
            <button onClick={() => { setArray([]); setInputArray(''); setSortedSteps([]); }} className="reset-button">Reset</button>
          </div>
        </>
      )}

      {sortedSteps.length > 0 && (
        <div className="sorting-steps">
          <h3>Sorting Steps:</h3>
          {sortedSteps.map((step, i) => (
            <div key={i} className="step-row">{step.map((num, j) => <div key={j} className="step-item">{num}</div>)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sort;