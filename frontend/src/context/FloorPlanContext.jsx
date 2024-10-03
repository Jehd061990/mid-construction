import { createContext, useContext, useReducer } from "react";

const initialState = { floorplans: [], onefloorplan: [] };

const floorPlanReducer = (state, action) => {
  switch (action.type) {
    case "GET_FLOOR_PLANS":
      return { floorplans: action.payload };
    case "SET_CURRENT_FLOOR_PLAN":
      // console.log("SET_CURRENT_FLOOR_PLAN action payload:", action.payload);
      return { ...state, onefloorplan: action.payload };
    case "DELETE_FLOOR_PLAN":
      return {
        ...state,
        floorplan: state.floorplans.filter(
          (floorplan) => floorplan.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const useFloorPlanContext = () => {
  return useContext(FloorPlanContext);
};

export const FloorPlanContext = createContext();

export const FloorPlanContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(floorPlanReducer, initialState);

  return (
    <FloorPlanContext.Provider value={{ state, dispatch }}>
      {children}
    </FloorPlanContext.Provider>
  );
};
