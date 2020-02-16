import React from "react";

export default function currencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChange,
    onChangeAmount,
    amount
  }=props;
  return(
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onChange}>
        {currencyOptions.map(option=>(
          <option key={option} value={option} >{option}</option>
        ))}
      </select>
    </div>
  ) ;
}
