import React from 'react';
interface Props {
  post: {
    title: string;
    text: string;
  };
}

class Card extends React.Component<Props> {
  render() {
    return (
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-title'>{this.props.post.title}</h3>
          <div className='card-text'>{this.props.post.text}</div>
        </div>
      </div>
    );
  }
}

export default Card;
