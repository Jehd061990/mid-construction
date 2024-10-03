import axios from "axios";
import toast from "react-hot-toast";

import { useFloorPlanContext } from "../context/FloorPlanContext";

const useDeleteFloorPlan = () => {
  const { dispatch } = useFloorPlanContext();

  const deleteFloorPlan = async (id) => {
    await axios
      .delete(`/api/floorplan/${id}`)
      .then(function (res) {
        toast.success(
          `Deleted Successfully: ${res.data.message || "Floor plan deleted"}`
        );
        dispatch({ type: "DELETE_FLOOR_PLAN", payload: id });
      })
      .catch(function (error) {
        toast.error(
          `Error deleting floor plan:: ${
            error.response?.data?.message || error.message
          }`
        );
      });
  };
  return { deleteFloorPlan };
};

export default useDeleteFloorPlan;
