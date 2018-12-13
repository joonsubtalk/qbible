import { GET_BIBLE_ESV_REQUEST,
	GET_BIBLE_ESV_SUCCESS,
	GET_BIBLE_ESV_FAILURE, 
	GET_BIBLE_VARIABLE_REQUEST,
	GET_BIBLE_VARIABLE_SUCCESS,
	GET_BIBLE_VARIABLE_FAILURE,
	GET_BIBLE_PLAN_REQUEST,
	GET_BIBLE_PLAN_SUCCESS,
	GET_BIBLE_PLAN_FAILURE,
	SET_BIBLE_PLAN} from '../config/actionTypes';

import data from '../data/esv.json';
import { BOOKS, CHAPTERS, READ_PLAN } from '../data/variables.js';

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

export const getBibleVariableRequest = () => {

	return {
		type : GET_BIBLE_VARIABLE_REQUEST
	};

};

export const getBibleVariableSuccess = (payload) => {

	return {
		type : GET_BIBLE_VARIABLE_SUCCESS,
		payload
	};

};

export const getBibleVariableFailure = () => {

	return {
		type : GET_BIBLE_VARIABLE_FAILURE
	};

};

export const getBiblePlanRequest = () => {

	return {
		type : GET_BIBLE_PLAN_REQUEST
	};

};

export const getBiblePlanSuccess = (payload) => {

	return {
		type : GET_BIBLE_PLAN_SUCCESS,
		payload
	};

};

export const getBiblePlanFailure = () => {

	return {
		type : GET_BIBLE_PLAN_FAILURE
	};

};

export const setBiblePlan = (payload) => {

	return {
		type : GET_BIBLE_PLAN_FAILURE,
		payload
	};

};

export const getBiblePlanThunk = () => function getBiblePlanThunkCb(dispatch) {

	dispatch(getBibleVariableRequest());

	setTimeout(()=>{
		console.log('change me in productions!');
		dispatch(getBiblePlanSuccess({plan : READ_PLAN}));
	}, Math.floor((Math.random()*200)+100));

} 

export const getBibleVariablesThunk = () => function getBibleVariablesThunkCb(dispatch) {

	dispatch(getBibleVariableRequest());

	setTimeout(()=>{
		console.log('change me in productions!');
		dispatch(getBibleVariableSuccess({bibleOrder: BOOKS, chapters: CHAPTERS}));
	}, Math.floor((Math.random()*200)+100));

} 

export const getBibleThunk = () => function getBibleThunkCb(dispatch) {

	dispatch(getBibleRequest());

	setTimeout(()=>{
		console.log('change me in productions!');
		dispatch(getBibleSuccess(data));
	}, Math.floor((Math.random()*2000)+200));

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
