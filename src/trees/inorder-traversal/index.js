import React from "react";
import Tree from "react-d3-tree";

const defaultRadius = 10;

const node = (name, style, children) => ({
  name: name,
  attributes: {},
  nodeSvgShape: style,
  children: children
});

const circleStyle = color => ({
  shape: "circle",
  shapeProps: { r: defaultRadius, fill: color }
});

const yellowCircle = circleStyle("yellow");
const greenCircle = circleStyle("green");

const myTreeData = [
  node("A", greenCircle, [node("B", yellowCircle), node("C", yellowCircle)])
];

const containerStyles = {
  width: "100%",
  height: "100vh",
  textAlign: "center"
};

export default () => {
  const translate = { x: 100, y: 50 };
  return (
    <div id="treeWrapper" style={containerStyles}>
      <Tree
        data={myTreeData}
        orientation="vertical"
        translate={translate}
        collapsible={false}
      />
    </div>
  );
};
