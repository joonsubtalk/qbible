import { INCREMENT_VERSE,
	DECREMENT_VERSE,
	SET_VERSE,
	ADD_POST,
	GET_PIC_SUCCESS,
	GET_PIC_REQUEST,
	GET_PIC_FAILURE,
 } from '../config/actionTypes';

export const defaultState = {
	post : []
};

/*
post = {
	chapter
	verse
	book
}
*/

function postsRD(state = defaultState , action ) {

	switch (action.type) {

		case ADD_POST: {

			return {
				...state,
				post: [...state.post, action.payload]
			}

		}

		case INCREMENT_VERSE: {
			return {
				...state,
				post: state.post.map((single, i) => i === action.payload
					? {...single, activeVerse: state.post[action.payload].activeVerse+1}
					: single
				)
			}

		}

		case DECREMENT_VERSE: {

			return {
				...state,
				post: state.post.map((single, i) => i === action.payload && state.post[action.payload].activeVerse > 1
					? {...single, activeVerse: state.post[action.payload].activeVerse-1}
					: single
				)
			}

		}

		case SET_VERSE: {
			return {
				...state,
				post: state.post.map((single, i) => i === action.payload.id
					? {...single, activeVerse: action.payload.activeVerse}
					: single
				)
			}

		}

		case GET_PIC_REQUEST: {
			return {
				...state,
				post: state.post.map((single, i) => i === action.payload.id
					? {...single, isPicLoading: true}
					: single
				)
			}
		}

		case GET_PIC_SUCCESS: {
			return {
				...state,
				post: state.post.map((single, i) => i === action.payload.id
					? {...single, isPicLoading: false}
					: single
				)
			}
		}

		default: {

			return state;

		}

	}

}

export default postsRD;
