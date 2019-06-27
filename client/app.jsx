import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import styled from 'styled-components';

import Dragula from 'react-dragula';

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

const SiteName = styled.div`
  position: absolute;
  border-radius: 3px;
  bottom: 4px;
  right: 0px;
  width: auto;
  height: 16px;
  font-family: verdana, arial, "Times New Roman";
  font-size: 14px;
  background-color: #ede92d;
  background-image: linear-gradient(#ede92d, #fffdaa);
  color: #07162c;
`;

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



  dragulaDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };


  render() {
    let num = 0;
    if (this.state.links.length) {
      return (
        <MainWrap>
          <Submit>
            <SubmitLink subLink={this.subLink.bind(this)} numOfLinks={this.state.links.length} />
          </Submit>
          <Wrapper className='container' ref={this.dragulaDecorator}>
            {this.state.links.map((site, i) => {
              return <Tile key={i}>
                <a href={"https://www." + site.split('.')[0] + "." + site.split('.')[1]} target="_blank">
                  <img src={'images/' + site.split('.')[0] + '.png'} style={{height:"200px", width:"300px"}} title={site}/>
                  <SiteName>{site}</SiteName>
                </a>
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