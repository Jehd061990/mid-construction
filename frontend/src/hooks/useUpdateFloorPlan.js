import toast from "react-hot-toast";
import axios from "axios";

const useUpdateFloorPlan = () => {
  const updateFloorPlan = async (floorPlanData, id) => {
    await axios
      .put(`api/floorplan/${id}`, floorPlanData)
      .then(function (res) {
        toast.success(
          `Successful: ${res.data.message || "Updated Successfully"}`
        );
      })
      .catch(function (error) {
        toast.error(
          error.response?.data?.message || "Failed to update floor plan"
        );
      });
  };

  return { updateFloorPlan };
};

export default useUpdateFloorPlan;
