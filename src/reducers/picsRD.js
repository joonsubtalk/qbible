import { GET_PIC_REQUEST,
	GET_PIC_SUCCESS,
	GET_PIC_FAILURE,
 } from '../config/actionTypes';

export const defaultState = {
	isPicLoading : false,
	isPicLoaded : false,
	pictures : {}
};

function picsRD(state = defaultState , action ) {

	switch (action.type) {

		case GET_PIC_REQUEST: {
			return {
				...state,
				isPicLoading : true
			}
		}

		case GET_PIC_SUCCESS: {

			const {pic, query, verse, chapter, book} = action.payload;

			//construct it
			const newObj = Object.assign({}, state.pictures, {
				[book] : {
					[chapter] : {
						[verse] : {
							query, pic
						}
					}
				}
			});

			return Object.assign({}, state, {
				isPicLoading : false,
				isPicLoaded : true,
				pictures : Object.assign({}, state.pictures[book], newObj)
			});
		}

		case GET_PIC_FAILURE: {
			return Object.assign({}, state, {
				isPicLoading : false,
				isPicLoaded : false
			});
		}

		default: {

			return state;

		}

	}

}

export default picsRD;
