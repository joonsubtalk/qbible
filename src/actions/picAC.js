import { GET_PIC_REQUEST,
	GET_PIC_SUCCESS,
	GET_PIC_FAILURE,
	} from '../config/actionTypes';

export const getPictureRequest = (payload) => {
	return {
		type : GET_PIC_REQUEST,
		payload
	};

};

export const getPictureSuccess = (payload) => {

	return {
		type : GET_PIC_SUCCESS,
		payload
	};

};

export const getPictureFailure = (payload) => {

	return {
		type : GET_PIC_FAILURE,
		payload
	};

};

/*
payload:
	book,
	chapter,
	verse,
	query: query,
*/
export const getPictureThunk = (payload) => function getPictureThunkCb(dispatch) {

	dispatch(getPictureRequest(payload));

	const height = Math.floor(400);
	const width = Math.floor(400);
	const url = `https://source.unsplash.com/${width}x${height}/?${payload.query},nature`;

	return fetch(url)
		.then((data) => {
			const {book, chapter, verse, query, fontChoice, id} = payload;
			return dispatch(getPictureSuccess({id, book, chapter, verse, query, pic: data.url, fontChoice}));
		})
		.catch((error) => {
			console.log('fail');
			// return dispatch(getBibleFailure());
		});

} 