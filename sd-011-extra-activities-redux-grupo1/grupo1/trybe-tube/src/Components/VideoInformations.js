import React from 'react';

class VideoInformations extends React.Component {
  render() {
    const video = this.props.video;

    const videoDetails = (
      <div className="videoDetails">
        <p className="p1">{video.publicado}</p>
        <p className="p2">{video.publicado_por}</p>
      </div>
    );

    const comments = video.comentarios.map((item) => {
      return (
        <div>
          <p>{item.nome}</p>
          <p>{item.conteudo}</p>
          <br></br>
        </div>
      );
    });
    return (
      <div>
        {videoDetails}

       <h2>COMENTÁRIOS</h2>
        {comments}
      </div>
    );
  }
}

export default VideoInformations;