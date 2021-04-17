import React, { Component } from "react";
import { render } from "react-dom";
import Request from './Request'

class Demo extends Component {
  render() {
    return <div><Request/></div>;
  }
}

render(<Demo />, document.querySelector("#demo"));
