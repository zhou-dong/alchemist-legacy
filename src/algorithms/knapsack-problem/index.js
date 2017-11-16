import React from "react";

import { createModal, createHeader, createButtons } from "./redux/container";

const Modal = createModal();
const Header = createHeader();
const Buttons = createButtons();

const KnapsackProblem = () => (
  <div align="center">
    <Header />
    <Modal />
    <Buttons />
  </div>
);

export default KnapsackProblem;
