import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import styled from 'styled-components';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (
      <div>
        Test if react is functioning properly
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));