import React, { Component } from 'react';
import { connect } from 'react-redux';
class Progress extends Component {

  render() {
    
    const {posts, pid, bible} = this.props;
    let progressLocation = null;

    if (pid !== undefined && pid !== null
        && bible.isBibleLoaded) {
        const {book, chapter} = posts.post[pid];
        const activeVerseLocation = posts.post[pid].verse;
        let chapterObj = {}
        chapterObj = bible.bible[book][chapter];
        if (activeVerseLocation === 1)
            progressLocation = 0;
        else if (activeVerseLocation < Object.keys(chapterObj).length/2)
            progressLocation = 1;
        else if (activeVerseLocation === Object.keys(chapterObj).length/2)
            progressLocation = 2;
        else if (activeVerseLocation < Object.keys(chapterObj).length)
            progressLocation = 3;
        else if (activeVerseLocation === Object.keys(chapterObj).length)
            progressLocation = 4;
    }

    return (
      <div className={`c-progress c-progress--${progressLocation}`}>
        <ul className="c-progress__list">
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
            <li className="c-progress__item">
                <div className="c-progress__circles">
                    <div className="c-progress__content"></div>
                </div>
            </li>
        </ul>
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

export default connect(mSTP, null)(Progress);