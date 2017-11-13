import React from "react";

import {
  createTable,
  createButtons,
  createDashboard,
  createHeader,
  createModal
} from "./redux/container";

const Header = createHeader();
const Modal = createModal();
const Table = createTable();
const Dashboard = createDashboard();
const Buttons = createButtons();

const WordBreakI = () => (
  <div align="center">
    <Header />
    <Dashboard />
    <Table />
    <Buttons />
    <Modal />
  </div>
);

export default WordBreakI;
