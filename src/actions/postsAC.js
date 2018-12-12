import { UPDATE_POST,
	ADD_POST,
	} from '../config/actionTypes';

export const updatePost = (payload) => {

	return {
		type : UPDATE_POST,
		payload
	};

};

export const addPost = (payload) => {
	return {
		type : ADD_POST,
		payload
	};

};