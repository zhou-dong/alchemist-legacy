import React from "react";

import {
  createTable,
  createButtons,
  createDashboard,
  createModal,
  createHeader
} from "./redux/container";

const Table = createTable();
const Buttons = createButtons();
const Dashboard = createDashboard();
const Modal = createModal();
const Header = createHeader();

const EditDistance = () => (
  <div align="center">
    <Header />
    <Dashboard />
    <Table />
    <Buttons />
    <Modal />
  </div>
);

export default EditDistance;
