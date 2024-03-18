import React from "react";

const StockInfo = ({ stockInfo }) => {
  return (
    <div id="info">
      <h2>Stock Info</h2>
      {stockInfo && (
        <div>
          <div>
            <h3>Company Information</h3>
            <p>{stockInfo.longBusinessSummary}</p>
          </div>
          <div>
            <dl>
              <div>
                <dt>Address</dt>
                <dd>
                  {stockInfo.address1}, {stockInfo.city}, {stockInfo.state},{" "}
                  {stockInfo.zip}, {stockInfo.country}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
