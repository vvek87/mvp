import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import styled from 'styled-components';

import SubmitLink from './components/submitLink.jsx';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1280px;
  background-color: 'grey';
`;

const Submit = styled.div`
  margin: 20px;
`;

const Tile = styled.div`
  margin: 8px;
`;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };

    this.submitLink = this.submitLink.bind(this);
  }


  submitLink(event) {
    if (!this.state.links.includes(event.newLink)) {
      var link = event
      $.ajax({
        url: "/submit",
        method: "POST",
        data: link,
        "Content-Type": "application/json",
        success: (newLink) => {
          var allLinks = this.state.links;
            allLinks.push(newLink);
            this.setState({
              links: allLinks
            })
        },
        error: (err) => { console.log('create bookmark error: ', err); }
      });
    } else {
      alert(event.newLink + ' is already saved');
    }
  }

  render() {
    if (this.state.links.length) {
      return (
        <MainWrap>
          <Submit>
            <SubmitLink submitLink={this.submitLink.bind(this)}/>
          </Submit>
          <Wrapper>
            {this.state.links.map((site, i) => {
              return <Tile key={i}>
                <a href={"https://www." + site.split('.')[0] + "." + site.split('.')[1]} target="_blank">
                  <img src={'images/' + site.split('.')[0] + '.png'} style={{height:"200px", width:"300px"}} title={site}/>
                </a>
              </Tile>
            })}
          </Wrapper>
        </MainWrap>
      )
    } else {
      return (
        <MainWrap>
          <Submit>
            <SubmitLink submitLink={this.submitLink.bind(this)}/>
          </Submit>
        </MainWrap>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));