import React from "react";
import Tree from "react-d3-tree";
import { debug } from "util";

const nodeSvgShape = {
  shape: "circle",
  shapeProps: {
    r: 12,
    fill: "green",
    stroke: "green"
  }
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

//           1(m)
//      2(h)       3(s)
//   4(l)  5(e)  6(i) 7(t)
// 8(a) 9(c)

const nodes = "alchemist"
  .toUpperCase()
  .split("")
  .map(char => new Node(char));

nodes[5].children.push(nodes[3], nodes[7]);
nodes[3].children.push(nodes[1], nodes[4]);
nodes[1].children.push(nodes[0], nodes[2]);
nodes[7].children.push(nodes[6], nodes[8]);

const root = [nodes[5]];

const containerStyles = {
  width: "100%",
  height: "25em",
  textAlign: "center",
  backgroundColor: ""
};

const saveSvg = (svgEl, name) => {
  debugger;
  svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], {
    type: "image/svg+xml;charset=utf-8"
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const T = () => (
  <Tree
    textLayout={{ x: -6, y: 0 }}
    zoom={1}
    pathFunc="straight"
    data={root}
    orientation="vertical"
    translate={{ x: 200, y: 100 }}
    collapsible={false}
    separation={{ siblings: 0.25, nonSiblings: 0.25 }}
    transitionDuration={0}
    zoomable={false}
    depthFactor={35}
  />
);

const Logo = () => (
  <div style={containerStyles}>
    <Tree
      textLayout={{ x: -6, y: 0 }}
      zoom={1}
      pathFunc="straight"
      data={root}
      orientation="vertical"
      translate={{ x: 200, y: 100 }}
      collapsible={false}
      separation={{ siblings: 0.25, nonSiblings: 0.25 }}
      transitionDuration={0}
      zoomable={false}
      depthFactor={35}
    />
  </div>
);

export default Logo;
