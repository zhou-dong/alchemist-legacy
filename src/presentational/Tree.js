import React from "react";
import Tree from "react-d3-tree";

const containerStyles = {
  width: "100%",
  height: "100vh",
  textAlign: "center"
};

export default ({ id, data, translate }) => (
  <div id={id} style={containerStyles}>
    <Tree
      data={data}
      orientation="vertical"
      translate={translate}
      collapsible={false}
    />
  </div>
);
