import React from "react";
import { Route, Link } from "react-router-dom";

import MaxHeap from "trees/max-heap";

const Algorithm = ({ match }) => {
  switch (match.params.name) {
    case "max-heap":
      return <MaxHeap />;
    default:
      return <h3>can not find algorithm: [{match.params.name}]</h3>;
  }
};

export default ({ match }) => (
  <div>
    <Link to={match.url + "/max-heap"}>Heap</Link>
    <Route path={`${match.url}/:name`} component={Algorithm} />
  </div>
);
