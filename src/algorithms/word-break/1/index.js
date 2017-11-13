import React from "react";

import Header from "presentational/Header";
import Modal from "presentational/Modal";
import { createTable, createButtons, createDashboard } from "./redux/container";

const Table = createTable();
const Dashboard = createDashboard();
const Buttons = createButtons();

const WordBreakI = () => (
  <div align="center">
    <Header title="Word Break I" />
    <Dashboard />
    <Table />
    <Buttons />
    <Modal />
  </div>
);

export default WordBreakI;
