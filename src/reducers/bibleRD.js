import { GET_BIBLE_ESV_REQUEST,
	GET_BIBLE_ESV_SUCCESS,
	GET_BIBLE_ESV_FAILURE,
	LOAD_BIBLE_VARIABLES
 } from '../config/actionTypes';

export const defaultState = {
	bible : {},
	isBibleLoading : false,
	isBibleLoaded : false,
	chapters : {},
	bibleOrder : []
};

function bibleRD(state = defaultState , action ) {

	switch (action.type) {

		case LOAD_BIBLE_VARIABLES: {
			return Object.assign({}, state, {
				chapters : action.payload.chapters,
				bibleOrder : action.payload.bibleOrder
			});
		}

		case GET_BIBLE_ESV_REQUEST: {

			return Object.assign({}, state, {
				isBibleLoading : true
			});

		}

		case GET_BIBLE_ESV_SUCCESS: {

			return Object.assign({}, state, {
				isBibleLoading : false,
				isBibleLoaded : true,
				bible : action.payload
			});

		}

		case GET_BIBLE_ESV_FAILURE: {

			return Object.assign({}, state, {
				isBibleLoading : false,
				isBibleLoaded : false
			});

		}

		default: {

			return state;

		}

	}

}

export default bibleRD;
