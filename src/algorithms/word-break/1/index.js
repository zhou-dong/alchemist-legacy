import React from "react";

import {
  createTable,
  createButtons,
  createDashboard,
  createHeader,
  createModal,
  createDictionary
} from "./redux/container";

const Header = createHeader();
const Modal = createModal();
const Table = createTable();
const Dashboard = createDashboard();
const Buttons = createButtons();
const Dictionary = createDictionary();

const WordBreakI = () => (
  <div align="center">
    <Header />
    <Dashboard />
    <Dictionary />
    <Table />
    <Buttons />
    <Modal />
  </div>
);

export default WordBreakI;
