import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import styled from 'styled-components';

import Dragula from 'react-dragula';
import hash from 'string-hash';
import Popup from "reactjs-popup";

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
  position: relative;
`;

// const SiteName = styled.div`
//   position: absolute;
//   border-radius: 3px;
//   bottom: 4px;
//   right: 0px;
//   width: auto;
//   max-width: 299;
//   height: 16px;
//   overflow: hidden;
//   font-family: verdana, arial, "Times New Roman";
//   font-size: 14px;
//   background-color: #ede92d;
//   background-image: linear-gradient(#ede92d, #fffdaa);
//   color: #07162c;
// `;

const Delete = styled.input`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  :hover {
    width: 35px;
    height: 35px;
  }
`;

const TypeLabel = styled.input`
position: absolute;
border-radius: 3px;
border: none;
bottom: 4px;
right: 0px;
width: 100%;
// max-width: 300;
text-align: center;
height: 16px;
overflow: hidden;
font-family: verdana, arial, "Times New Roman";
font-size: 14px;
background-color: #ede92d;
background-image: linear-gradient(#ede92d, #fffdaa);
color: #07162c;
`;



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
    };

    this.subLink = this.subLink.bind(this);
  }


  subLink(event) {
    enterLink.value = '';
    let inputLink = event.newLink;

    if (inputLink.includes('//')) {
      inputLink = inputLink.split('//');
      inputLink = 'https://'.concat(inputLink[1]);
    } else {
      inputLink = 'https://'.concat(inputLink)
    }
    if (!this.state.links.includes(inputLink)) {
      $.ajax({
        url: "/submit",
        method: "POST",
        data: {newLink: inputLink},
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
      alert('That link is already saved');
    }
  }

  deleteLink(siteName) {
    let newSiteList = this.state.links;
    for (var i = 0; i < newSiteList.length; i++) {
      if (newSiteList[i] === siteName) {
        newSiteList.splice(i, 1);
      }
    }
    this.setState({
      links: newSiteList
    })
  }

  changeLabel(event) {
    let linkLabel = event.currentTarget.textContent
    console.log('TEST CHANGE LABEL EVENT: ', linkLabel)

    event.currentTarget.textContent = 'THISWORKS'

    // PopupExample()

  }





  dragulaDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };


  render() {
    if (this.state.links.length) {
      return (
        <MainWrap>
          <Submit>
            <SubmitLink subLink={this.subLink.bind(this)} numOfLinks={this.state.links.length} />
          </Submit>
          <Wrapper className='container' ref={this.dragulaDecorator}>
            {this.state.links.map((site, i) => {
              return <Tile key={i}>
                <a href={site} target="_blank">
                  <img src={'images/' + hash(site) + '.png'} style={{height:"200px", width:"300px"}} title={site}/>
                </a>
                <TypeLabel placeholder={site}></TypeLabel>
                <Delete type="image" id={site} src="xbutton.png" title="Remove" onClick={() => {this.deleteLink(site)}}></Delete>
              </Tile>
            })}
          </Wrapper>
        </MainWrap>
      )
    } else {
      return (
        <MainWrap>
          <Submit>
            <SubmitLink subLink={this.subLink.bind(this)} numOfLinks={this.state.links.length}/>
          </Submit>
        </MainWrap>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));