import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import SubmitLink from './components/submitLink.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: ['ign']
    };

  }

  componentDidMount() {
    $.ajax({
      url: '/test',
      method: 'GET',
      success: (bookmarkData) => {
        let updateSites = this.state.links;

        for (var i = 0; i < bookmarkData.length; i++) {
          if (updateSites.includes(bookmarkData[i])) {
            bookmarkData.splice(i, 1)
          }
        }

        updateSites.push(bookmarkData);
        console.log('success get request in app.jsx');
        this.setState({
          links: updateSites
        });
      },
      error: (err) => { console.log('get reviews error: ', err); }
    });
  }

  render() {
    console.log('this.sate.length: ', this.state.links)
    if (this.state.links.length) {
      return (
        <div>
          <SubmitLink />
          {this.state.links.map((site, i) => {
            return <div>
              <a href={"https://www." + site + ".com"}>
                <img src={require("../public/images/" + site + ".png")} target="blank" />
              </a>
            </div>
          })}
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));