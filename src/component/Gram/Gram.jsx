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
		this.loadImageForVerse(id, book, chapter, activeVerse);
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
		const query = this.createCommaSeparatedQuery(id, book, chapter, verse);
		this.props.getPicture({
			book,
			chapter,
			verse,
			query: query,
		})
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

	//

	toggleContextHandler = () => {
		this.setState(prevState => ({
			showContext: !prevState.showContext
		}));

		if (this.props.bible.isBibleLoaded && this.state.chapterArr.length === 0) {
			this.setupChapterContext()
		}
	}

	nextVerse = () => {
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
		const { pics, id, posts, bible } = this.props;
		const {chapter, verse, book} = posts[id];
		const text = bible.bible[book][chapter][verse];
		let modifiers = '';

		const imageURL = pics.isPicLoaded && pics.pictures[book] && pics.pictures[book][chapter]
			? pics.pictures[book][chapter][verse].pic
			: '';
		const tags = pics.isPicLoaded && pics.pictures[book] && pics.pictures[book][chapter]
			? pics.pictures[book][chapter][verse].query
			: '';
		const rando = Math.floor(Math.random()*6);

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

		modifiers += ` c-gram--font${rando}`;
		if (this.state.showContext)
			modifiers += ` c-gram--showContext`;
		return (
			<div className={`c-gram ${modifiers}`}>
				<div className="c-gram__container">
					<div className="c-gram__title">{'title'}</div>
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
						<div>
							{posts[id].book} {posts[id].chapter}:{posts[id].verse} {tags} {this.state.keywords.map((keyword, idx)=> <span key={`${idx}${keyword}`}>#{keyword}</span>)}
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
								if (idx + 1 === posts[id].verse)
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