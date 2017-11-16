import React from "react";

import {
  createModal,
  createHeader,
  createButtons,
  createDashboard
} from "./redux/container";

const Modal = createModal();
const Header = createHeader();
const Buttons = createButtons();
const DashBoard = createDashboard();

const KnapsackProblem = () => (
  <div align="center">
    <Header />
    <DashBoard />
    <Buttons />
    <Modal />
  </div>
);

export default KnapsackProblem;
