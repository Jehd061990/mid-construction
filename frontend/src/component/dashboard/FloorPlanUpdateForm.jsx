import { useState, useEffect } from "react";

// Hook
import useUpdateFloorPlan from "../../hooks/useUpdateFloorPlan";

// Context
import { useFloorPlanContext } from "../../context/FloorPlanContext";

import React from "react";

import "./dashboard.css";

const FloorPlanUpdateForm = () => {
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    storey: "",
    size: "",
    details: "",
  });

  const { state } = useFloorPlanContext();

  const { updateFloorPlan } = useUpdateFloorPlan();

  useEffect(() => {
    if (state.onefloorplan && state.onefloorplan.length > 0) {
      const floorplan = state.onefloorplan[0];

      setFormData({
        title: floorplan.title,
        storey: floorplan.storey,
        size: floorplan.size,
        details: floorplan.details,
      });

      setPrice(floorplan.price);

      setId(floorplan.id);
    }
  }, [state.onefloorplan]);

  const dataInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    const unformattedPrice = formData.price
      ? formData.price.replace(/,/g, "")
      : "";

    const dataToSubmit = {
      ...formData,
      price: unformattedPrice,
    };

    updateFloorPlan(dataToSubmit, id);
  };

  return (
    <div
      className={`update-section floorplan-form flex flex-col gap-5 ${
        id ? "open" : "close"
      } h-full w-full bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100
`}
    >
      <h1 className="update-section">Update</h1>
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
          className="textarea textarea-bordered w-full"
          name="details"
          placeholder="ex. A bungalow is a small, usually one..."
          value={formData.details}
          onChange={dataInput}
        ></textarea>
        <div className="flex justify-center gap-5">
          <button type="submit" className="btn btn-primary w-20">
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline btn-secondary w-20"
            onClick={() => {
              setId("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FloorPlanUpdateForm;
