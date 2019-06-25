import React from 'react';

export default class SubmitLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text"></input>
        <input type="submit" value="Submit"></input>
      </div>
    );
  }

}