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

export const getPictureThunk = (payload) => function getPictureThunkCb(dispatch) {

	dispatch(getPictureRequest(payload.id));

	const height = Math.floor(400);
	const width = Math.floor(400);
	const url = `https://source.unsplash.com/${width}x${height}/?${payload.query},nature`;

	return fetch(url)
		.then((data) => {
			return dispatch(getPictureSuccess({id:payload.id, pic: data.url}));
		})
		.catch((error) => {
			console.log('fail');
			// return dispatch(getBibleFailure());
		});

} 