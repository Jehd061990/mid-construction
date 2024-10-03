import { useEffect, useState } from "react";
import "./dashboard.css";

// CONTEXT
import { useFloorPlanContext } from "../../context/FloorPlanContext";
// HOOKS
import useGetFloorPlans from "../../hooks/useGetFloorPlans";
import useDeleteFloorPlan from "../../hooks/useDeleteFloorPlan";

const FloorPlanTable = () => {
  const { state, dispatch } = useFloorPlanContext();
  const { fetchFloorPlans } = useGetFloorPlans();
  const { deleteFloorPlan } = useDeleteFloorPlan();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Display 10 items per page
  const [pageGroupSize] = useState(3); // Display 3 pages at a time

  // Calculate the total number of pages
  const totalPages = Math.ceil(state.floorplans.length / itemsPerPage);

  // Calculate the start and end indices for the current page slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentFloorPlans = state.floorplans.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchFloorPlans();
  }, [state.floorplans]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPageGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(startPage + pageGroupSize);
    }
  };

  const handlePreviousPageGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - pageGroupSize);
    }
  };

  const delFloorPlan = (id) => {
    deleteFloorPlan(id);
  };

  const editFloorPlan = (plan) => {
    dispatch({ type: "SET_CURRENT_FLOOR_PLAN", payload: [plan] });
    // console.log([plan]);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="overflow-x-auto">
      <h1 className={`empty-table ${currentFloorPlans.length ? "hidden" : ""}`}>
        No Data - Please Create
      </h1>

      <table
        className={`table table-zebra-zebra flr-tbl ${
          !currentFloorPlans.length ? "opacity-0" : ""
        }`}
      >
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Storey</th>
            <th>Floor Size</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currentFloorPlans.map((plan, index) => {
            return (
              <tr key={plan.id}>
                <th>{indexOfFirstItem + index + 1}</th>
                <td>{plan.title}</td>
                <td>{plan.storey === 1 ? "ground" : plan.storey} floor</td>
                {/* Apply formatNumberWithCommas to size and price */}
                <td>{formatNumberWithCommas(plan.size)} sqm</td>
                <td>${formatNumberWithCommas(plan.price)}</td>
                <td>
                  <button onClick={() => delFloorPlan(plan.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
                <td>
                  {/* <label htmlFor="my_modal_7">edit</label> */}
                  <a href="#form-section" onClick={() => editFloorPlan(plan)}>
                    <span className="material-symbols-outlined">edit</span>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        className={`flex justify-end items-center mt-4 ${
          !currentFloorPlans.length ? "opacity-0" : ""
        }`}
      >
        <button onClick={handlePreviousPageGroup} disabled={startPage === 1}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`btn ${currentPage === page ? "btn-active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button onClick={handleNextPageGroup} disabled={endPage === totalPages}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>

      {/* Modal to edit floor plan */}
      {/* <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">This modal works with a hidden checkbox!</p>

            <div className="modal-action">
              <label htmlFor="my_modal_7" className="btn">
                Close!
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div> */}
    </div>
  );
};

export default FloorPlanTable;
