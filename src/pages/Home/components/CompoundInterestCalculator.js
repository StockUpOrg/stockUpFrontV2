import React, { useRef } from "react";

const CompoundInterestCalculator = () => {
  const principalRef = useRef(null);
  const yearsRef = useRef(null);

  const calculateCompoundInterest = () => {
    const principal = principalRef.current.value;
    const years = yearsRef.current.value;
    const rate = 0.04; // 4% interest rate
    const amount = principal * Math.pow(1 + rate, years);
    const interest = amount - principal;
    const result = `After ${years} years at 4% interest, the investment will be worth $${amount.toFixed(
      2
    )}, with an interest of $${interest.toFixed(2)}.`;
    document.getElementById("compoundInterestResult").innerText = result;
  };

  return (
    <div id="calculator">
      <h2>Compound Interest Calculator</h2>
      <div>
        <label htmlFor="principal">Principal Value:</label>
        <input
          id="principal"
          type="number"
          ref={principalRef}
          placeholder="Enter principal value"
        />

        <label htmlFor="years">Number of Years:</label>
        <input
          id="years"
          type="number"
          ref={yearsRef}
          placeholder="Enter number of years"
        />

        <button onClick={calculateCompoundInterest}>Calculate</button>

        <div id="compoundInterestResult"></div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
