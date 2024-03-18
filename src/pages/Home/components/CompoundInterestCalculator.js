import React, { useRef } from "react";

const CompoundInterestCalculator = ({ stockInfo }) => {
  const principalRef = useRef(null);
  const yearsRef = useRef(null);

  const calculateCompoundInterest = () => {
    const principal = principalRef.current.value;
    const years = yearsRef.current.value;
    const rate =
      (stockInfo.trailingEps ? stockInfo.trailingEps : stockInfo.forwardPE) /
      100; // Convert the interest rate to decimal form
    const amount = principal * Math.pow(1 + rate, years);
    const interest = amount - principal;
    const result = `After ${years} years at ${rate}% interest, the investment will be worth $${amount.toFixed(
      2
    )}, with an interest of $${interest.toFixed(2)}.`;
    document.getElementById("compoundInterestResult").innerText = result;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Compound Interest Calculator</h2>
        <div className="flex flex-col space-y-4">
          <label htmlFor="principal" className="text-lg">
            Money to invest $:
          </label>
          <input
            id="principal"
            type="number"
            ref={principalRef}
            placeholder="Enter principal value in dollars"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-xs"
          />

          <label htmlFor="years" className="text-lg">
            Years to hold:
          </label>
          <input
            id="years"
            type="number"
            ref={yearsRef}
            placeholder="Enter number of years"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-xs"
          />

          <button
            onClick={calculateCompoundInterest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Calculate
          </button>

          <div
            id="compoundInterestResult"
            className="text-lg font-semibold mt-4"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
