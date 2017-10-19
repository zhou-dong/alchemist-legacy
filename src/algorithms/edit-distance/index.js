import React from "react";

import { createTable, createButtons, createDashboard } from "./redux/container";

import Header from "presentational/Header";

const Table = createTable();
const Buttons = createButtons();
const Dashboard = createDashboard();

const EditDistance = () => (
  <div align="center">
    <Header title="Edit Distance" />
     <Dashboard />
    <Table />
    <Buttons />
  </div>
);

export default EditDistance;
