import React from "react";
import Tree from "react-d3-tree";

const nodeSvgShape = {
  shape: "circle",
  shapeProps: {
    r: 12,
    fill: "green",
    stroke: "green"
  }
};

const containerStyles = {
  width: "155px",
  height: "135px",
  textAlign: "center",
  backgroundColor: "",
  transform: "scale(0.45)"
};

class Node {
  constructor(name) {
    this.name = name;
    this.nodeSvgShape = nodeSvgShape;
    this.children = [];
  }
}

// a l c h e m i s t
// 0 1 2 3 4 5 6 7 8

//           (m)
//      (h)       (s)
//   (l)   (e)  (i)  (t)
// (a) (c)

const nodes = "alchemist"
  .toUpperCase()
  .split("")
  .map(char => new Node(char));

nodes[5].children.push(nodes[3], nodes[7]);
nodes[3].children.push(nodes[1], nodes[4]);
nodes[1].children.push(nodes[0], nodes[2]);
nodes[7].children.push(nodes[6], nodes[8]);

const root = [nodes[5]];

const Logo = () => (
  <div style={containerStyles}>
    <Tree
      textLayout={{ x: -9, y: 0 }}
      zoom={1}
      pathFunc="straight"
      data={root}
      orientation="vertical"
      translate={{ x: 85, y: 15 }}
      collapsible={false}
      separation={{ siblings: 0.22, nonSiblings: 0.22 }}
      transitionDuration={0}
      zoomable={false}
      depthFactor={35}
    />
  </div>
);

const simpleContainerStyles = {
  width: "110px",
  height: "110px",
  textAlign: "center",
  backgroundColor: "",
  transform: "scale(0.5)"
};

const simpleNodes = "alche"
  .toUpperCase()
  .split("")
  .map(char => new Node(char));

simpleNodes[3].children.push(simpleNodes[1], simpleNodes[4]);
simpleNodes[1].children.push(simpleNodes[0], simpleNodes[2]);
const simpleRoot = [simpleNodes[3]];

const SimpleLogo = () => (
  <div style={simpleContainerStyles}>
    <Tree
      textLayout={{ x: -6, y: 0 }}
      zoom={1}
      pathFunc="straight"
      data={simpleRoot}
      orientation="vertical"
      translate={{ x: 66, y: 20 }}
      collapsible={false}
      separation={{ siblings: 0.3, nonSiblings: 0.3 }}
      transitionDuration={0}
      zoomable={false}
      depthFactor={30}
    />
  </div>
);

const showSimple = true;

export default (showSimple ? SimpleLogo : Logo);
