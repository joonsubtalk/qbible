import { GET_BIBLE_ESV_REQUEST,
	GET_BIBLE_ESV_SUCCESS,
	GET_BIBLE_ESV_FAILURE, 
	LOAD_BIBLE_VARIABLES} from '../config/actionTypes';

import data from '../data/esv.json';

export const getBibleRequest = (payload) => {

	return {
		type : GET_BIBLE_ESV_REQUEST,
		payload
	};

};

export const getBibleSuccess = (payload) => {

	return {
		type : GET_BIBLE_ESV_SUCCESS,
		payload
	};

};

export const getBibleFailure = () => {

	return {
		type : GET_BIBLE_ESV_FAILURE
	};

};

export const loadBibleVariables = (payload) => {

	return {
		type : LOAD_BIBLE_VARIABLES,
		payload : payload
	};

};

export const getBibleThunk = () => function getBibleThunkCb(dispatch) {

	dispatch(getBibleRequest());

	setTimeout(()=>{
		console.log('change me in productions!');
		dispatch(getBibleSuccess(data));
	}, 200);

	// return fetch('./data/esv.json')
	// 	.then(response => response.json())
	// 	.then((json) => {
	// 		return dispatch(getBibleSuccess(data));
	// 	})
	// 	.catch((error) => {
	// 		return dispatch(getBibleFailure());
	// 	});

} 

// export const decrementVerse = (payload) => {

// 	return {
// 		type : DECREMENT_VERSE,
// 		payload
// 	};

// };
