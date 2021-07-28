import logo from './logo.svg';
import './App.css';
import OpenVideo from './Components/OpenVideo';
import VideoInformations from './Components/VideoInformations';

import data from './data';
import SugestionsList from './Components/SugestionsList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedVideoIndex: 0,
    };
    this.handleSelectedVideo = this.handleSelectedVideo.bind(this);
  }

  handleSelectedVideo(index) {
    this.setState({
      selectedVideoIndex: index
    })
  }
  render() {
    const { selectedVideoIndex } = this.state
    return (
      <div className="App">
        <div className='left-side'>
          <h1>TrybeTube</h1>
          <OpenVideo video={data[selectedVideoIndex]} />
          <VideoInformations video={data[selectedVideoIndex]} />
        </div>
        <div className='right-side'>
        <SugestionsList 
          data={data} 
          handleSelectedVideo={this.handleSelectedVideo}
        />
        </div>
      </div>
    );
  }
}

export default App;
