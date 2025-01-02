import React, { useState, useEffect } from "react";
import "./index.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("MXN");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  // Fetch available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://api.exchangerate.host/list?access_key=${apiKey}`);
        console.log('sssss',response)
        const data = await response.json();
        console.log('aaaaaaaaaaa',data)
        if (data.currencies) {
          const currencyList = Object.keys(data.currencies);
          setCurrencies(currencyList);
        } else {
          throw new Error("No currencies found in API response.");
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = () => {
    const url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setResult(data.result))
      .catch((error) => console.error("Error fetching conversion:", error));
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>
      {result && (
        <div className="result">
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
