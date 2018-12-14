import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hammer from 'react-hammerjs';
import {incrementVerse, decrementVerse, setVerse} from '../../actions/verseAC';
import { getPictureThunk } from '../../actions/picAC';
import Progress from '../Progress/Progress';
import { BLACKLIST } from '../../data/variables';
import { shuffle } from '../../config/utils';

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

	componentDidMount() {
		const {posts, id} = this.props;
		const {book, chapter, activeVerse} = posts[id];
		// preloadAFewImage
		// getMaxChapter

		this.loadAllVersesInChapter(book, chapter);
		this.loadActiveVerse(id, activeVerse);
		// this.loadImageForVerse(id, book, chapter, activeVerse);
		this.lookAheadLoadImage(id, book, chapter, activeVerse);
	}

	createCommaSeparatedQuery = (id, book, chapter, verse) => {

		const {bible} = this.props;
		const text = (bible.bible[book][chapter][verse]).toLowerCase();
		const wordsArr = text.split(' ');
		const possibleSearchQueryList = wordsArr.filter((word)=> {
			return word.replace(/[^a-zA-Z ]/g, '').length > 2
				&& !BLACKLIST.includes(word.replace(/[^a-zA-Z ]/g, ''))
		});

		// mix it up
		shuffle(possibleSearchQueryList);
		let queryArr = [];
		
		possibleSearchQueryList.some((search, idx) => {
			if (idx > 3) return;
			queryArr.push(search.replace(/[^a-zA-Z ]/g, ""));
		})


		// remove the chaff
		const uniqueQueryArray = queryArr.filter(function(item, pos) {
			return queryArr.indexOf(item) === pos;
		})
		const query = uniqueQueryArray.join(',');

		return query;
	}

	loadImageForVerse = (id, book, chapter, verse) => {
		const {pictures, isPicLoaded} = this.props.pics;
		if (isPicLoaded && pictures[book][chapter][verse] !== undefined)
			return;

		const fontChoice = Math.floor(Math.random()*6);
		const query = this.createCommaSeparatedQuery(id, book, chapter, verse);
		this.props.getPicture({
			id,
			book,
			chapter,
			verse,
			query: query,
			fontChoice
		})
	}

	lookAheadLoadImage = (id, book, chapter, activeVerse) => {
		
		const {pictures, isPicLoaded} = this.props.pics;
		let fontChoice = 0;
		let query = '';
		for (let verse = activeVerse; verse <= activeVerse+5; verse++){
			// is there even a verse for it to load?
			if (verse > this.props.posts[id].maxVerse)	return;

			// no need if already loaded
			if (isPicLoaded && pictures[book][chapter][verse] !== undefined)
			return;

			fontChoice = Math.floor(Math.random()*6);
			query = this.createCommaSeparatedQuery(id, book, chapter, verse);
			this.props.getPicture({
				id,
				book,
				chapter,
				verse,
				query: query,
				fontChoice
			})
		}
	}

	loadActiveVerse = (id, verse) => {
		this.props.setVerse({id, activeVerse : verse});
	}

	loadAllVersesInChapter = (book, chapter, verse=1) => {
		const {bible} = this.props;
		const chapterObj = bible.bible[book][chapter];
		let chapterArray = [];

		for (let i = 1; i <= Object.keys(chapterObj).length; i++) {
			chapterArray.push(chapterObj[i]);
		}
		this.setState({chapterArr: chapterArray});
	}

	nextVerse = () => {
		const {posts, id, pics} = this.props;
		const {book, chapter, activeVerse} = posts[id];
		if (activeVerse+1 > this.props.posts[id].maxVerse)	return;
		this.props.incrementVerse(id);
		this.loadImageForVerse(id, book, chapter, activeVerse+1);
		if (pics.pictures[book][chapter][activeVerse+3]) return;
		this.lookAheadLoadImage(id, book, chapter, activeVerse+3);
	}

	toggleContextHandler = () => {
		this.setState(prevState => ({
			showContext: !prevState.showContext
		}));
	}

	verseJumpHandler = (verse) => {
		const { pics, id, posts } = this.props;
		const {pictures, isPicLoaded} = pics;
		const {chapter, book} = posts[id];
		
		this.props.setVerse({id, activeVerse: verse});
		// no need to get pic if already loaded
		if (isPicLoaded && pictures[book][chapter][verse] !== undefined) return;
		this.loadImageForVerse(id, book, chapter, verse);
	}

	render() {
		const { pics, id, posts, bible } = this.props;
		const {chapter, activeVerse, book} = posts[id];
		const text = bible.bible[book][chapter][activeVerse];
		const postInfo = pics.isPicLoaded
			&& pics.pictures[book]
			&& pics.pictures[book][chapter]
			&& pics.pictures[book][chapter][activeVerse];
		const imageURL = postInfo
			? postInfo.pic
			: '';
		const tags = postInfo
			? postInfo.query
			: '';
		const keywords = tags.split(',');

		const font = postInfo
			? postInfo.fontChoice
			: '';
		let modifiers = '';

		if (text) {
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
		}

		modifiers += ` c-gram--font${font}`;
		if (this.state.showContext)
			modifiers += ` c-gram--showContext`;
		return (
			<div className={`c-gram ${modifiers}`}>
				<div className="c-gram__container">
					<div className="c-gram__title">{book} {chapter}</div>
					{ posts[id].isPicLoading 
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
						<div className="c-gram__gramInfo">
							{posts[id].book} {posts[id].chapter}:{posts[id].activeVerse} <span className="c-gram__keywords">{keywords.map((keyword, idx)=> <span key={`${idx}${keyword}`}>#{keyword}</span>)}</span>
						</div>
						<button className="c-gram__seeMoreButton" onClick={this.toggleContextHandler}>
						{ !this.state.showContext
							? <div>
								<svg viewBox="0 0 9.64797592163086 5.574477195739746" className="svg c-gram__seeMoreIcon" width="100%" height="100%"><path d="M4.823 5.574a.744.744 0 0 1-.53-.22l-4-4A.75.75 0 1 1 1.354.293l3.47 3.47 3.47-3.47a.75.75 0 1 1 1.061 1.061l-4 4a.752.752 0 0 1-.532.22z"></path></svg> See context
							</div>
							: <div>
								<svg viewBox="0 0 9.633416175842285 5.647106170654297" className="svg c-gram__seeMoreIcon" width="100%" height="100%"><path d="M8.824 5.574a.744.744 0 0 1-.53-.22l-3.47-3.47-3.47 3.47a.75.75 0 1 1-1.061-1.06l4-4a.75.75 0 0 1 1.061 0l4 4a.75.75 0 0 1-.53 1.28z"></path></svg> Less context
							</div>
						}
						</button>
					{
						this.state.showContext && bible.isBibleLoaded
						? (
							this.state.chapterArr.map((chapter, idx)=> {
								let additionalClasses = '';
								if (idx + 1 === posts[id].activeVerse)
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
		posts : state.posts.post,
		bible : state.bible,
		pics : state.pics
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