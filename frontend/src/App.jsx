import "./App.css";

// COMPONENTS
import FloorPlanForm from "./component/dashboard/FloorPlanForm";
import FloorPlanUpdateForm from "./component/dashboard/FloorPlanUpdateForm";
import FloorPlanTable from "./component/dashboard/FloorPlanTable";

function App() {
  return (
    <>
      <h1 id="form-section">MID-Construction Exam</h1>
      <div className=" p-4 flex items-center gap-10 justify-center flex-col lg:flex-row lg:items-start">
        <div className="floorplan-form ">
          <div className="create-section">
            <FloorPlanForm />
          </div>
          {/* <div className="update-section open"> */}
          <FloorPlanUpdateForm />
          {/* </div> */}
        </div>
        <FloorPlanTable />
      </div>
    </>
  );
}

export default App;
