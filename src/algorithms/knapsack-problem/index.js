import React from "react";

import {
  createModal,
  createHeader,
  createButtons,
  createDashboard,
  createTable
} from "./redux/container";

const Modal = createModal();
const Header = createHeader();
const Buttons = createButtons();
const DashBoard = createDashboard();
const Table = createTable();

const KnapsackProblem = () => (
  <div align="center">
    <Header />
    <DashBoard />
    <Table />
    <Buttons />
    <Modal />
  </div>
);

export default KnapsackProblem;
