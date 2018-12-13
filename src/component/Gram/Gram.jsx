import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import {incrementVerse, decrementVerse, setVerse} from '../../actions/verseAC';
import { getPictureThunk } from '../../actions/picAC';
import Progress from '../Progress/Progress';

const LoadingGram = () => {
	return (<div className="c-gram">
		<div className="c-gram__container">
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
		</div>
	</div>);
}

class Gram extends Component {

	state = {
		showContext : false,
		chapterArr : [],
		keywords : []
	}

	toggleContextHandler = () => {
		this.setState(prevState => ({
			showContext: !prevState.showContext
		}));

		if (this.props.bible.isBibleLoaded && this.state.chapterArr.length === 0) {
			this.setupChapterContext()
		}
	}

	nextVerse = () => {
		const BLACKLIST = ['and','its','but','weighs','heart','over','god','things','years','set','kinds', 'the','had','among','even', 'went','shall','from','him','any','will','our','have','because','accordingly','though','required','sake','through','who','those','are','you','your','about','with','all','not','for','hovering','has','overcome','gathered','under','face','midst','bearing','which','were','saw','said','one','spirit','together','so','first','second','separated','separate', 'form','forth', 'there','kind','day','rule','expanse','deep','was','beginning','that','let','called','without','darkness','void','into','lie','according','them','place',]
		const {id, bible, posts} = this.props;
		const {chapter, verse, book} = posts.post[id];
		const text = (bible.bible[book][chapter][verse+1]).toLowerCase();
		const words = text.split(' ');
		const search = words.filter((word)=>word.replace(/[^a-zA-Z ]/g, "").length > 2 && !BLACKLIST.includes(word.replace(/[^a-zA-Z ]/g, "")))
		const contextual1 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const contextual2 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const contextual3 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const contextual4 = search[Math.floor(Math.random()*search.length)].replace(/[^a-zA-Z ]/g, "");
		const queryArr = [contextual1, contextual2, contextual3, contextual4];
		const uniqueQueryArray = queryArr.filter(function(item, pos) {
			return queryArr.indexOf(item) === pos;
		})
		const query = uniqueQueryArray.join(',');
		this.props.incrementVerse(id);

		this.setState({keywords : uniqueQueryArray})
		this.props.getPicture({id: id, query : query});
	}

	setupChapterContext = () => {
		const { id, posts, bible } = this.props;
		const {book, chapter} = posts.post[id];
		let chapterArr = [];
		let chapterObj = {}
		chapterObj = bible.bible[book][chapter];
		for (let i = 1; i <= Object.keys(chapterObj).length; i++) {
			chapterArr.push(chapterObj[i]);
		}
		this.setState({chapterArr: chapterArr});
	}

	verseJumpHandler = (verse) => {
		this.props.setVerse({id: this.props.id, verse: verse-1});
		this.nextVerse();
	}

	render() {
		const { title, text, image, id, posts, bible } = this.props;
		let modifiers = '';
		const imageURL = posts
			? posts.post[id].pic
			: image
		const rando = Math.floor(Math.random()*6);

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
		if (this.state.showContext)
			modifiers += ` c-gram--showContext`;
		return (
			<div className={`c-gram ${modifiers}`}>
				<div className="c-gram__container">
					<div className="c-gram__title">{title}</div>
					{ posts.post[id].isPicLoading 
						? (	<LoadingGram /> )
						: (<Hammer onSwipeLeft={this.nextVerse}
							onSwipeRight={() => {this.props.decrementVerse(id)}}>
							<div className="c-gram__imageContainer">
								<div className="c-gram__text">{text}</div>
								<div className="c-gram__gradient"></div>
								<div className="c-gram__image">
									<img src={imageURL} alt={this.props.keyword} />
								</div>
								<Progress pid={id}/>
							</div>
						</Hammer>
						)
					}
					<div className="c-gram__seeMore">
						<div>
							{posts.post[id].book} {posts.post[id].chapter}:{posts.post[id].verse} {this.state.keywords.map((keyword, idx)=> <span key={`${idx}${keyword}`}>#{keyword}</span>)}
						</div>
						<button onClick={this.toggleContextHandler}>
						{ !this.state.showContext
							? 'See context'
							: 'less context'
						}
						</button>
					{
						this.state.showContext && bible.isBibleLoaded
						? (
							this.state.chapterArr.map((chapter, idx)=> {
								let additionalClasses = '';
								if (idx + 1 === posts.post[id].verse)
									additionalClasses = 'c-gram--current';
								return <div key={idx} className={`c-gram__verseLine ${additionalClasses}`} onClick={()=>{this.verseJumpHandler(idx+1)}}><span className={`c-gram__verse ${additionalClasses}`}>{idx+1}</span> {chapter}</div>
							})
						)
						: null
					}
					</div>
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
		setVerse : (payload) => {
			dispatch(setVerse(payload));
		},
	};

}

export default connect(mSTP, mDTP)(Gram);