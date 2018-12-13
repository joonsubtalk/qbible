import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {getBibleThunk, getBibleVariablesThunk, getBiblePlanThunk} from './actions/bibleAC';
import { addPost } from './actions/postsAC';

import Home from './container/Home/Home';
import Footer from './component/Footer/Footer';
import Queue from './component/Queue/Queue';
import Loader from './component/Loader/Loader';

class App extends Component {

	componentDidMount() {
		this.props.loadBible();
		this.props.loadBibleVariables();
		this.props.loadBiblePlan();
	}

	render() {
		const {bible} = this.props;

		return (
			<Router>
				<div className="App">
					<Queue />
						{bible.isBibleLoaded
						&& bible.isBibleVariableLoaded
						&& bible.isBiblePlanLoaded
						? (<React.Fragment>
							<Route exact path="/" component={Home} />
							<Route path="/about" component={this.Home} />
							<Route path="/topics" component={this.Home} />
							{/* {
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
							} */
							}
							</React.Fragment>)
						: <Loader />}
					<Footer />
				</div>
			</Router>
		)
	}
}

function mSTP(state) {

	return {
		bible : state.bible
	};

}

function mDTP(dispatch) {

	return {
		loadBible : () => {
			dispatch(getBibleThunk());
		},
		loadBibleVariables : () => {
			dispatch(getBibleVariablesThunk());
		},
		loadBiblePlan : () => {
			dispatch(getBiblePlanThunk());
		},
		addPost : (data) => {
			dispatch(addPost(data));
		}
	};

}

export default connect(mSTP, mDTP)(App);
