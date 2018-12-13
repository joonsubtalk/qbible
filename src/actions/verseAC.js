import { INCREMENT_VERSE,
	DECREMENT_VERSE,
	SET_VERSE } from '../config/actionTypes';

export const incrementVerse = (payload) => {

	return {
		type : INCREMENT_VERSE,
		payload
	};

};

export const decrementVerse = (payload) => {

	return {
		type : DECREMENT_VERSE,
		payload
	};

};

export const setVerse = (payload) => {

	return {
		type : SET_VERSE,
		payload
	};

};
