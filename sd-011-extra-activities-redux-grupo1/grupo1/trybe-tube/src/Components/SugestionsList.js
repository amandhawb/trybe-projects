import React from 'react';
import { Link } from 'react-router-dom';

class SugestionsList extends React.Component {
  render() {
    const data = this.props.data;

    const items = data.map((item, index) => {
      return (
        <div className="suggestion-item">
          <div>{item.titulo}</div>
          <img 
            className='thumbnail' 
            src={item.imagem} 
            onClick={() => this.props.handleSelectedVideo(index)}>
          </img>
        </div>
        )
    })

    return (
      <div className='sugestion-list'>
        <h3>Se você curtiu esse vídeo, dê uma olhada nesses! =)</h3>
        {items}
      </div>
    )
  }
}

export default SugestionsList;