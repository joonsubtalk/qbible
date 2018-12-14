import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postsAC';
import Gram from '../../component/Gram/Gram';
class Home extends Component {

	componentDidMount() {
		const { plans, activePlan, posts, bible } = this.props;

		if (posts.length === 0) {
			plans[activePlan].plan.map((plan)=> {
				const chapterObj = bible[plan.book][plan.chapter];

				const newPlan = {
					...plan,
					maxVerse: Object.keys(chapterObj).length
				}
				this.props.populatePost(newPlan)
			});
		}
	}

	render() {
		const { posts } = this.props;
		return (
			<div className="o-home">
				{posts.map((post, idx) => {
					return <Gram key={post.book} id={idx} />
				})}
			</div>)
	}
}

function mSTP(state) {

	return {
		posts : state.posts.post,
		plans : state.bible.biblePlan,
		bible : state.bible.bible,
		activePlan : state.bible.selectedBiblePlan,
	};

}

function mDTP(dispatch) {

	return {
		populatePost : (data) => {
			dispatch(addPost(data));
		}
	};

}

export default connect(mSTP, mDTP)(Home);
