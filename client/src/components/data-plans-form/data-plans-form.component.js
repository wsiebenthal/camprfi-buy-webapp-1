import { useState, useEffect } from "react";
import { Checkout } from "../Checkout";

import {
  getAllPrices,
} from "../../services/InternalApiService";


export const DataPlansForm = (props) => {
  let [amountOfData, setAmountOfData] = useState("1");
  let [planDuration, setPlanDuration] = useState("1");
  const [priceId, setPriceId] = useState(null);
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState(null);

  const [errors, setErrors] = useState(null);

  const [filteredPrice, setFilteredPrice] = useState("");
  const [nickname, setNickname] = useState("");

  // get all the prices from Stripe account
  useEffect(() => {
    console.log("in use effect");
    getAllPrices()
      .then((data) => {
        console.log(data.data);
        setPrices(data.data);
        const filteredPrices = data.data.filter((price) =>
          price.nickname.includes(`${amountOfData}Gb for ${planDuration} Day`)
        );
        console.log(filteredPrices);
        setNickname(filteredPrices[0].nickname);
        setFilteredPrice(parseInt(filteredPrices[0].unit_amount) / 100);
        setPriceId(filteredPrices[0].id);
        setPrice(filteredPrices[0].unit_amount / 100);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDataPlansSubmit = (event) => {
    console.log(event);
    console.log("in data plans submit");
    console.log(event.target.value);
    console.log("amount of data " + amountOfData);
    console.log("plan duration " + planDuration);
    const filteredPrices = prices.filter((price) =>
      price.nickname.includes(`${amountOfData}Gb for ${planDuration} Day`)
    );
    console.log(filteredPrices);
    setNickname(filteredPrices[0].nickname);
    console.log(filteredPrices[0].unit_amount / 100);
    setFilteredPrice(filteredPrice);
    setPriceId(filteredPrices[0].id);
    setPrice(filteredPrices[0].unit_amount / 100);
  };

  return (
    <div>
      <div className="plan-div">
        <h4 className="purple-font-underlined">PLAN</h4>
      </div>

      <div className="form-group">
        <label className="h6 purple-font">How much data do you need? </label>
        {errors?.amountOfData && (
          <span style={{ color: "red" }}> {errors?.amountOfData?.message}</span>
        )}
        <select
          onChange={(event) => {
            console.log(event.target.value);
            console.log(event.target.value);
            amountOfData = event.target.value;
            setAmountOfData(amountOfData);
            handleDataPlansSubmit(event);
          }}
          type="text"
          className="form-control"
        >
          <option value="1">1Gb</option>
          <option value="2">2Gb</option>
          <option value="4">4Gb</option>
          <option value="8">8Gb</option>
          <option value="10">10Gb</option>
          <option value="20">20Gb</option>
        </select>
      </div>

      <div className="form-group">
        <label className="h6 purple-font">Plan Duration </label>
        {errors?.amountOfData && (
          <span style={{ color: "red" }}> {errors?.amountOfData?.message}</span>
        )}
        <select
          onChange={(event) => {
            planDuration = event.target.value;
            setPlanDuration(planDuration);
            handleDataPlansSubmit(event);
          }}
          type="text"
          className="form-control"
        >
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
        </select>
      </div>

      <div className="products-container">
        <Checkout
          nickname={nickname}
          price={price}
          priceId={priceId}
        ></Checkout>
      </div>
    </div>
  );
};

export default DataPlansForm;
