import React from 'react';
import Card from './Card';
import './Card.css';

interface Post {
  title: string;
  text: string;
}
interface State {
  posts: Post[] | [];
}

class CardContainer extends React.Component<any, State> {
  constructor(props: any) {
    // Render Phase #1 (Only Mounting)
    super(props);
    this.state = {
      posts: [],
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    // Render Phase #2
    console.group(['getDerivedStateFromProps']);
    console.log('props', props);
    console.log('state', state);
    console.groupEnd();
  }

  componentDidMount() {
    // Commit Phase (Only Mounting)
    console.group(['componentDidMount']);
    console.groupEnd();
    window.addEventListener('scroll', this.onScroll);
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    // Render Phase #3 (Only Update)
    console.group(['shouldComponentUpdate']);
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);
    console.groupEnd();
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    // Pre-Commit Phase (Only Upate) - can read the DOM
    console.group(['getSnapshotBeforeUpdate']);
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.groupEnd();
    return {
      scrollHeight: document.body.scrollHeight,
      innerHeight: window.innerHeight,
    };
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    // Commit-Phase (Only Update)
    console.group(['componentDidUpdate']);
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.log('snapshot', snapshot);
    console.groupEnd();
    if (snapshot.scrollHeight > snapshot.innerHeight) {
      console.log('go to bottom');
      window.scrollTo(0, snapshot.scrollHeight);
    }
  }

  componentWillUnmount() {
    console.group(['componentWillUnmount']);
    console.groupEnd();
    window.removeEventListener('scroll', this.onScroll);
  }

  onClickAddCard = () => {
    const newPost = {
      title: 'new title',
      text: 'new text',
    };
    this.setState({
      posts: [...this.state.posts, newPost],
    });
  };

  onScroll = () => {
    console.log(window.innerHeight);
  };

  renderCards = () => {
    return this.state.posts.map((post, i) => {
      return (
        <div key={i}>
          <Card post={post} />
        </div>
      );
    });
  };

  render() {
    // Render Phase #4
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <button className='btn' onClick={this.onClickAddCard}>
            +
          </button>
        </div>
        {this.renderCards()}
      </div>
    );
  }
}

export default CardContainer;
