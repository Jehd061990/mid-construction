import { useState } from "react";
import useCreateFloorPlan from "../../hooks/useCreateFloorPlan";
import React from "react";

import "./dashboard.css";

const FloorPlanForm = () => {
  const [price, setPrice] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    storey: "",
    size: "",
    details: "",
  });

  const { newFloorPlan } = useCreateFloorPlan();

  const dataInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, ""); // Remove non-digit characters
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format with commas
  };

  const handlePriceChange = (e) => {
    const formattedPrice = formatCurrency(e.target.value);
    setPrice(formattedPrice);
    setFormData({
      ...formData,
      price: formattedPrice,
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    const unformattedPrice = formData.price.replace(/,/g, "");

    const dataToSubmit = {
      ...formData,
      price: unformattedPrice,
    };

    newFloorPlan(dataToSubmit);
  };

  return (
    <div className="create-form">
      <form onSubmit={submitData}>
        <label className="input input-bordered flex items-center gap-2">
          Title
          <input
            type="text"
            className="grow"
            name="title"
            placeholder="ex. Bungalow"
            value={formData.title}
            onChange={dataInput}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Price
          <input
            type="text"
            className="grow"
            name="price"
            placeholder="ex. 200,000"
            value={price}
            onChange={handlePriceChange}
          />
          $
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Storey
          <input
            type="number"
            className="grow"
            name="storey"
            placeholder="ex. 2"
            value={formData.storey}
            onChange={dataInput}
          />
          floor
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Size
          <input
            type="number"
            className="grow"
            name="size"
            placeholder="ex. 200"
            value={formData.size}
            onChange={dataInput}
          />
          sqm
        </label>
        <br />

        <label>Description</label>
        <textarea
          className="textarea textarea-bordered w-full h-5"
          name="details"
          placeholder="ex. A bungalow is a small, usually one..."
          value={formData.details}
          onChange={dataInput}
        ></textarea>
        <button type="submit" className="btn btn-outline btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default FloorPlanForm;
