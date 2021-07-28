import React from 'react';

class OpenVideo extends React.Component {
  render() {
    const {video} = this.props;
    return (
      <div>
        <h3>{video.titulo}</h3>
        <img src={video.imagem} className="video"></img>
      </div>
    )
  }
}

export default OpenVideo;