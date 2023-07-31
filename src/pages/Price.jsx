import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Price() {
  const [coin, setCoin] = useState(null);

  const apiKey = "87E38FC1-169F-4397-A39E-2D3220831290";
  const params = useParams();
  const symbol = params.symbol;
  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.log(error)
    }
  };

  const loaded = () => {
    return (
      <div>
        <h1> {coin.asset_id_base} / {coin.asset_id_quote} </h1>
        <h2> {coin.rate}</h2>
      </div>
    )
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  useEffect(() => {
    getCoin();
  }, []);

  return coin && coin.rate ? loaded() : loading();
}

export default Price;