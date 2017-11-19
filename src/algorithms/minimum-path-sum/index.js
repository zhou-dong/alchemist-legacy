import React from "react";

import {
  createModal,
  createHeader,
  createButtons,
  createDashboard,
  createTable,
  createDataDisplay
} from "./redux/container";

const Modal = createModal();
const Header = createHeader();
const Buttons = createButtons();
const DashBoard = createDashboard();
const Table = createTable();
const DisplayTable = createDataDisplay();

export default () => (
  <div align="center">
    <Header />
    <DashBoard />
    <DisplayTable />
    <Table />
    <Buttons />
    <Modal />
  </div>
);
