import { combineReducers } from 'redux';
import bibleRD from './bibleRD';
import postsRD from './postsRD';
import picsRD from './picsRD';

const rootReducer = combineReducers({
	bible : bibleRD,
	posts : postsRD,
	pics : picsRD
});

export default rootReducer;
