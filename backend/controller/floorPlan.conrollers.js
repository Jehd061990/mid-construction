import { pool } from "../db/sqlConnection.js";

const getAllFloorPlan = async (_req, res) => {
  try {
    const [row] = await pool.query("SELECT * FROM floor_plan ORDER BY id DESC");

    res.status(200).json(row);
  } catch (error) {
    console.log(`Error in getAllFloorPlan Controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOneFloorPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const [row] = await pool.query("SELECT * FROM floor_plan WHERE id = ?", [
      id,
    ]);
    if (row.length === 0) {
      console.log(`Invalid floorplan id: ${id}`);
      return res.status(404).json({ message: "Floorplan design not found" });
    }

    return res.status(200).json(row);
    // return row;
  } catch (error) {
    console.log(`Error in getOneFloorPlan Controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createFloorPlan = async (req, res) => {
  const { title, price, storey, size, details } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO floor_plan (title,price,storey,size,details) VALUES (?, ?, ?, ?, ?)`,
      [title, price, storey, size, details]
    );

    if (result) {
      const [fetch] = await pool.query(
        `SELECT * FROM floor_plan WHERE id = ${result.insertId}`
      );
      res.status(200).json(fetch);
    }
  } catch (error) {
    console.log(`Error in createFloorPlan Controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateFloorPlan = async (req, res) => {
  const { id } = req.params;
  const { title, price, storey, size, details } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE floor_plan SET title = ?, price = ?, storey = ?, size = ?, details = ? WHERE id = ?`,
      [title, price, storey, size, details, id]
    );

    if (result) {
      const [fetch] = await pool.query(
        "SELECT * FROM floor_plan WHERE id = ?",
        [id]
      );
      res.status(200).json(fetch);
    }
  } catch (error) {
    console.log(`Error in updateFloorPlan Controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFloorPlan = async (req, res) => {
  const { id } = req.params;

  try {
    const [row] = await pool.query("SELECT * FROM floor_plan WHERE id = ?", [
      id,
    ]);
    if (row.length === 0) {
      console.log(`Invalid floorplan id: ${id}`);
      return res.status(404).json({ message: "Floorplan design not found" });
    } else {
      const [del] = await pool.query("DELETE FROM floor_plan WHERE id = ?", [
        id,
      ]);

      if (del) {
        res.status(200).json({ message: "Floor Plan Deleted" });
      }
    }
  } catch (error) {
    console.log(`Error in deleteFloorPlan Controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getAllFloorPlan,
  getOneFloorPlan,
  createFloorPlan,
  updateFloorPlan,
  deleteFloorPlan,
};
