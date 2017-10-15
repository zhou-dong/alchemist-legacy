import React from "react";

import { createTable, createButtons } from "./redux/container";

const EditDistanceTable = createTable();
const EditDistanceButtons = createButtons();

const EditDistance = ({ table, buttons }) => (
  <div align="center">
    <EditDistanceTable />
    <EditDistanceButtons />
  </div>
);

export default EditDistance;
