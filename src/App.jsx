import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch currency list on load
    axios.get("https://api.exchangerate.host/list?access_key=7271466c09f5aaf79796a12e283ae46a")
      .then(response => {
        console.log('aaaaa', response);
        setCurrencies(Object.keys(response.data.currencies));
      })
      .catch(error => console.error("Error fetching currencies:", error));
  }, []);

  const handleConvert = () => {
    axios
      .get(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}?access_key=7271466c09f5aaf79796a12e283ae46a`)
      .then(response => setResult(response.data.result))
      .catch(error => console.error("Error converting currency:", error));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Currency Converter</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          From:
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          To:
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleConvert}>Convert</button>
      {result && (
        <h2 style={{ marginTop: "20px" }}>
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </h2>
      )}
    </div>
  );
};

export default App;
