import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import {incrementVerse, decrementVerse} from '../../actions/verseAC';
import { getPictureThunk } from '../../actions/picAC';
import Progress from '../Progress/Progress';

const LoadingGram = () => {
	return (<div className="c-gram">
		<div className="c-gram__container">
			<div className="c-gram__title">
				<div className="c-gram__loadingTextBar gradient"></div>
			</div>
			<div className="c-gram__imageContainer">
				<div className="c-gram__text">
					<div className="c-gram__loadingTextBar gradient"></div>
				</div>
				<div className="c-gram__gradient"></div>
				<div className="c-gram__image gradient">
					<div className="c-gram__loadingImage"></div>
				</div>
				<Progress />
			</div>
			<div className="c-gram__seeMore">
				<div className="c-gram__loadingTextBar gradient"></div>
			</div>
		</div>
	</div>);
}

class Gram extends Component {

	nextVerse = () => {
		const BLACKLIST = ['and','but','over','god','things','years','set','kinds', 'the','had','among','even', 'went','shall','from','him','any','will','our','have','because','accordingly','though','required','sake','through','who','those','are','you','your','about','with','all','not','for','hovering','has','overcome','gathered','under','face','midst','bearing','which','were','saw','said','one','spirit','together','so','first','second','separated','separate', 'form','forth', 'there','kind','day','rule','expanse','deep','was','beginning','that','let','called','without','darkness','void','into','according','them','place',]
		const {id, bible, posts} = this.props;
		const {chapter, verse, book} = posts.post[id];
		const text = (bible.bible[book][chapter][verse+1]).toLowerCase();
		const words = text.split(' ');
		const search = words.filter((word)=>word.replace(/[^a-zA-Z ]/g, "").length > 2 && !BLACKLIST.includes(word.replace(/[^a-zA-Z ]/g, "")))
		const contextual1 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const contextual2 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const contextual3 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const query = `${contextual1},${contextual2},${contextual3}`;
		this.props.incrementVerse(id);
		// console.log(query);
		this.props.getPicture({id: id, query : query});
	}

	render() {
		const { title, text, image, id, posts } = this.props;
		let modifiers = '';
		const imageURL = posts
			? posts.post[id].pic
			: image
		const rando = Math.floor(Math.random()*5);

		if (text.length < 75) {
			modifiers = 'c-gram--tiny';
		}
		else if (text.length < 150) {
			modifiers = 'c-gram--small';
		}
		else if (text.length < 300) {
			modifiers = 'c-gram--medium';
		} else {
			modifiers = 'c-gram--long';
		}

		modifiers += ` c-gram--font${rando}`;
		return posts.post[id].isPicLoading 
		? (	<LoadingGram /> )
		: (
			<div className={`c-gram ${modifiers}`}>
				<div className="c-gram__container">
					<div className="c-gram__title">{title}</div>
					<Hammer onSwipeLeft={this.nextVerse}
						onSwipeRight={() => {this.props.decrementVerse(id)}}>
						<div className="c-gram__imageContainer">
							<div className="c-gram__text">{text}</div>
							<div className="c-gram__gradient"></div>
							<div className="c-gram__image">
								<img src={imageURL} alt={this.props.keyword} />
							</div>
							<Progress />
						</div>
					</Hammer>
					<div className="c-gram__seeMore">in context: {this.props.keyword}</div>
				</div>
			</div>
		)
	}
}

function mSTP(state) {
	return {
		posts : state.posts,
		bible : state.bible
	};

}

function mDTP(dispatch) {

	return {
		incrementVerse : (id) => {
			dispatch(incrementVerse(id));
		},
		getPicture : (data) => {
			dispatch(getPictureThunk(data));
		},
		decrementVerse : (id) => {
			dispatch(decrementVerse(id));
		},
	};

}

export default connect(mSTP, mDTP)(Gram);