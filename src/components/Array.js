import React, { useState } from 'react';
import '../components/Array.css';

const SelectionSort = () => {
  const [inputArray, setInputArray] = useState('');
  const [array, setArray] = useState([]);
  const [sortedSteps, setSortedSteps] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(null); // Highlight current swapping index
  const [isSorting, setIsSorting] = useState(false); // Sorting control

  const handleInputChange = (e) => setInputArray(e.target.value);

  const parseArray = () => {
    const parsedArray = inputArray
      .split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));

    if (parsedArray.length) {
      setArray(parsedArray);
      setSortedSteps([]);
      setHighlightIndex(null);
      setIsSorting(false);
    } else {
      alert('Enter valid numbers!');
    }
  };

  const selectionSort = async () => {
    let sortedArr = [...array];
    let steps = [];
    setIsSorting(true);

    for (let i = 0; i < sortedArr.length - 1; i++) {
      let minIndex = i;
      setHighlightIndex(i); // Highlight current index

      for (let j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[j] < sortedArr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
        steps.push([...sortedArr]); // Save intermediate step
      }

      setSortedSteps([...steps]); // Update steps progressively
      setArray([...sortedArr]); // Update array state

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay visualization
    }

    setIsSorting(false);
    setHighlightIndex(null);
  };

  return (
    <div className="selection-sort-container">
      <h2>Selection Sort Visualization</h2>

      <div className="input-section">
        <input 
          type="text"
          value={inputArray}
          onChange={handleInputChange}
          placeholder="Enter numbers (comma-separated)"
          className="array-input"
        />
        <button onClick={parseArray} className="parse-button" disabled={isSorting}>
          Load Array
        </button>
      </div>

      {array.length > 0 && (
        <>
          <div className="array-display">
            {array.map((num, i) => (
              <div
                key={i}
                className={`array-item ${i === highlightIndex ? 'highlight' : ''}`}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="button-group">
            <button onClick={selectionSort} className="sort-button" disabled={isSorting}>
              {isSorting ? 'Sorting...' : 'Sort'}
            </button>
            <button 
              onClick={() => { 
                setArray([]); 
                setInputArray(''); 
                setSortedSteps([]); 
                setHighlightIndex(null);
                setIsSorting(false);
              }} 
              className="reset-button"
            >
              Reset
            </button>
          </div>
        </>
      )}

      {sortedSteps.length > 0 && (
        <div className="sorting-steps">
          <h3>Sorting Steps:</h3>
          {sortedSteps.map((step, i) => (
            <div key={i} className="step-row">
              {step.map((num, j) => (
                <div key={j} className={`step-item ${j === highlightIndex ? 'highlight' : ''}`}>
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionSort;
