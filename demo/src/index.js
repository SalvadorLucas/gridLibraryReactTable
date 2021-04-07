import React, { Component } from "react";
import { render } from "react-dom";

class Demo extends Component {
  render() {
    return <div></div>;
  }
}

render(<Demo />, document.querySelector("#demo"));
