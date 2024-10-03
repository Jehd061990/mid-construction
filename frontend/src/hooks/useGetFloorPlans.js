import axios from "axios";
import { useFloorPlanContext } from "../context/FloorPlanContext";

const useGetFloorPlans = () => {
  const { dispatch } = useFloorPlanContext();

  const fetchFloorPlans = async () => {
    const result = await axios
      .get("api/floorplan")
      .then(function (res) {
        dispatch({ type: "GET_FLOOR_PLANS", payload: res.data });
      })
      .catch(function (error) {
        console.log(`Error fetching floor plans: ${error}`);
      });
  };

  return { fetchFloorPlans };
};

export default useGetFloorPlans;
