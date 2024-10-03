import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateFloorPlan = () => {
  const newFloorPlan = async ({ title, price, storey, size, details }) => {
    const success = handleInputErrors({
      title,
      price,
      storey,
      size,
      details,
    });
    if (!success) return;

    await axios
      .post("api/floorplan", { title, price, storey, size, details })
      .then(function (res) {
        toast.success(
          `Saved Successfully: ${res.data.message || "Floor Plan created"}`
        );
      })
      .catch(function (error) {
        toast.error(
          `Error saving floorplan: ${
            error.response?.data?.message || error.message
          }`
        );
      });
  };

  return { newFloorPlan };
};

function handleInputErrors({ title, price, storey, size, details }) {
  if (!title || !price || !storey || !size || !details) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

export default useCreateFloorPlan;
