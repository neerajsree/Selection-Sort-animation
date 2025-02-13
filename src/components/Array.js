import React, { useState } from "react";
import "../components/Array.css";

const Sort = () => {
  const [inputArray, setInputArray] = useState("");
  const [array, setArray] = useState([]);
  const [sortedSteps, setSortedSteps] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const arrfun = (e) => setInputArray(e.target.value);

  const parseArray = () => {
    const parsedArray = inputArray
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));

    if (parsedArray.length > 0) {
      setArray(parsedArray);
      setSortedSteps([]);
    } else {
      alert("Enter valid numbers!");
    }
  };

  const selectionSort = async () => {
    let arr = [...array];
    let steps = [];
    setSortedSteps([]);
    setIsSorting(true); 

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      
      if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      
      steps.push({ arr: [...arr], selectedIndex: minIndex, sortedIndex: i });
      setSortedSteps([...steps]);

      await new Promise((resolve) => setTimeout(resolve, 3000)); 
    }

    
    steps.push({ arr: [...arr], selectedIndex: -1, sortedIndex: arr.length });

    setSortedSteps([...steps]);
    setArray(arr);
    setIsSorting(false); 
  };

  return (
    <div className="selection-sort-container">
      <h2>Selection Sort</h2>

      <div className="input-section">
        <input
          type="text"
          value={inputArray}
          onChange={arrfun}
          placeholder="Enter numbers (comma-separated)"
          className="array-input"
          disabled={isSorting}
        />
        <button onClick={parseArray} className="parse-button" disabled={isSorting}>
          Load Array
        </button>
      </div>

      {array.length > 0 && (
        <>
          <div className="array-display">
            {array.map((num, i) => (
              <div key={i} className="array-item">
                {num}
              </div>
            ))}
          </div>
          <div className="button-group">
            <button onClick={selectionSort} className="sort-button" disabled={isSorting}>
              {isSorting ? "Sorting..." : "Sort"}
            </button>
            <button
              onClick={() => {
                setArray([]);
                setInputArray("");
                setSortedSteps([]);
                setIsSorting(false);
              }}
              className="reset-button"
              disabled={isSorting}
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
              {step.arr.map((num, j) => (
                <div
                  key={j}
                  className={`step-item 
                    ${step.selectedIndex === -1 ? "final-sorted" : ""}
                    ${j === step.selectedIndex ? "selected" : ""} 
                    ${j <= step.sortedIndex ? "sorted" : ""}`
                  }
                >
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

export default Sort;
