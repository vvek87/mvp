import React from 'react';

import styled from 'styled-components';


const Button = styled.button`
  border: 1px solid black;
  border-radius : 6px;
  background-color: #ede92d;
  background-image: linear-gradient(#ede92d, #fffdaa);
  box-shadow: 0 1px 1px #7c7b33;
  color: black;
  margin-left:10px;
  margin-right: 5px;
  padding: 8px 20px;
  font-family: verdana;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

const Text = styled.div`
  color: white;
`;

export default class SubmitLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Text>
          Enter a link like example.com:
        </Text>
          <input type="text" id="enterLink"></input>
        <Button type="submit" onClick={() => {this.props.submitLink({newLink: enterLink.value})}}>Submit</Button>
      </div>
    );
  }
}