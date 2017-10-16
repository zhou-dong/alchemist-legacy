import React from "react";

import { createTable, createButtons, createDashboard } from "./redux/container";
import {PageHeader} from 'react-bootstrap';

const Table = createTable();
const Buttons = createButtons();
const Dashboard = createDashboard();

const EditDistance = ({ table, buttons }) => (
  <div align="center">
    <PageHeader>Edit Distance<small></small></PageHeader>
    <Dashboard />
    <Table />
    <Buttons />
  </div>
);

export default EditDistance;
