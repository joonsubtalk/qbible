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
			const {pic, query, verse, chapter, book, fontChoice} = action.payload;
			//Does the book exist?
			if (state.pictures[book]) {
				// Is there already a chapter?
				if (state.pictures[book][chapter]) {
					// Yes
					const newObj = Object.assign({}, state.pictures[book][chapter], {
						[verse] : {query, pic, fontChoice}
					});

					// what the chapter should have
					const chapterObj = Object.assign({}, state.pictures[book], {
						[chapter] : newObj
					});

					// what the Book should have
					const picObj = Object.assign({}, state.pictures, {
						[book] : chapterObj
					});

					return Object.assign({}, state, {
						isPicLoading : false,
						isPicLoaded : true,
						pictures : Object.assign({}, state.pictures, picObj)
					});
				} else {
					// Nah
					const newObj = Object.assign({}, state.pictures[book], {
						[chapter] : {
							[verse] : {
								query, pic, fontChoice
							}
						}
					});

					const picObj = Object.assign({}, state.pictures, {
						[book] : newObj
					});

					return Object.assign({}, state, {
						isPicLoading : false,
						isPicLoaded : true,
						pictures : Object.assign({}, state.pictures, picObj)
					});
				}
			} else {
				const newObj = Object.assign({}, state.pictures, {
					[book] : {
						[chapter] : {
							[verse] : {
								query, pic, fontChoice
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
