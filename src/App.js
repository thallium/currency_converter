import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./currencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";
function App() {
  const [currencyOptions, setCurrenctyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState(1);
  const [fromChanged, setFromChanged] = useState(true);

  let toAmount, fromAmount;
  if (fromChanged) {
    fromAmount = amount;
    toAmount = fromAmount * rate;
  } else {
    toAmount = amount;
    fromAmount = toAmount / rate;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrenctyOption([data.base, ...Object.keys(data.rates)]);
        setFromCurrency("CAD");
        setToCurrency("CNY");
        fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => setRate(data.rates[toCurrency]));
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setRate(data.rates[toCurrency]));
  }, [fromCurrency, toCurrency]);
  function handleFromChange(e) {
    setAmount(e.target.value);
    setFromChanged(true);
  }
  function handleToChange(e) {
    setAmount(e.target.value);
    setFromChanged(false);
  }
  return (
    <>
      <h1> Converter </h1>
      <CurrencyRow
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onChange={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromChange}
      />
      <div className="equal">=</div>
      <CurrencyRow
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onChange={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToChange}
      />
    </>
  );
}

export default App;
