import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format, formatDistance } from 'date-fns';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {getBibleThunk, loadBibleVariables} from './actions/bibleAC';
import { addPost } from './actions/postsAC';
import { getPictureThunk } from './actions/picAC';


import Gram from './component/Gram/Gram';
import Queue from './component/Queue/Queue';
import data from './data/esv.json';
import { BOOKS, CHAPTERS } from './data/variables.js';

class App extends Component {

  state = {
    imgs: {},
    data: null,
    verse: 1,
    keyword: '',
    book: 'Genesis',

    currentDate: null
  }

  componentDidMount() {
    this.renderCurrentDate();
    this.setup(0,'star');
    this.getData();
    this.props.loadBible();
    this.loadBibleVariables();
  }

  populatePost = () => {
    const text = {
      'chapter' : format(new Date(), 'D'),
      'verse' : 1,
      'book' : 'Proverbs'
    };
    const query = this.props.bible
      ? 'nature'
      : '';

    this.props.addPost(text);
    this.props.getPicture(text, query);
  }

  loadBibleVariables = () => {
    this.props.loadBibleVariables({'chapters' : CHAPTERS, 'bibleOrder' : BOOKS });
  }

  renderCurrentDate = () => {
    this.setState({ currentDate : format(new Date(), 'D') });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.verse !== this.props.verse) {
      this.next();
    }
    if (nextState.currentDate !== this.state.currentDate) {
      this.populatePost();
    }
  }

  setup = (rando = 1, query = '') => {
    const height = Math.floor(400)+rando;
    const width = Math.floor(400)+rando;
    const images = `https://source.unsplash.com/${width}x${height}/?${query},nature`;
    this.setState({imgs : images});
  }

  getData = () => {
    this.setState({data : data});
  }

  next = () => {
    const BLACKLIST = ['and', 'over','god','things','years','set','kinds', 'the','had','among','even', 'went','shall','from','him','any','will','our','have','because','accordingly','though','required','sake','through','who','those','are','you','your','about','with','all','not','for','hovering','has','overcome','gathered','under','face','midst','bearing','which','were','saw','said','one','spirit','together','so','first','second','separated','separate', 'form','forth', 'there','kind','day','rule','expanse','deep','was','beginning','that','let','called','without','darkness','void','into','according','them','place',]
    const {bible, verse} = this.props;
    const text = (bible[this.state.book][1][verse+1]).toLowerCase();
    const words = text.split(' ');
    const search = words.filter((word)=>word.replace(/[^a-zA-Z ]/g, "").length > 2 && !BLACKLIST.includes(word.replace(/[^a-zA-Z ]/g, "")))
    const contextual1 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
    const contextual2 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
    const contextual3 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");

    this.setState({keyword : `${contextual1},${contextual2},${contextual3}`});
    this.setup(this.props.verse, `${contextual1},${contextual2},${contextual3}`);
  }

  Home = () => {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }

  render() {
    const {imgs, data, keyword} = this.state;
    const {posts} = this.props;
    if (data) {
      
      return (
        <Router>
          <div>
            <div className="App">
            <Queue />
            {
              posts.post.length > 0
              ? posts.post.map((post, idx)=> {
                  const {book, chapter, verse} = post;
                  const text = data[book][chapter][verse];
                  const title = `${book} ${chapter}:${verse}`;

                  return <Gram text={text}
                    key={`${book}`}
                    id={idx}
                    title={title}
                    image={imgs}
                    keyword={keyword} />
                })
              : null
            }
            </div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>

            <Route exact path="/" component={this.Home} />
            <Route path="/about" component={this.Home} />
            <Route path="/topics" component={this.Home} />
          </div>
      </Router>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

function mSTP(state) {

	return {
    bible : state.bible.bible,
    posts : state.posts,
	};

}

function mDTP(dispatch) {

	return {
    getPicture : (data) => {
			dispatch(getPictureThunk(data));
    },
		loadBible : () => {
			dispatch(getBibleThunk());
    },
    loadBibleVariables : (data) => {
      dispatch(loadBibleVariables(data));
    },
    addPost : (data) => {
      dispatch(addPost(data));
    }
	};

}

export default connect(mSTP, mDTP)(App);
