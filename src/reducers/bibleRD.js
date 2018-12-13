import { GET_BIBLE_ESV_REQUEST,
	GET_BIBLE_ESV_SUCCESS,
	GET_BIBLE_ESV_FAILURE,
	GET_BIBLE_VARIABLE_REQUEST,
	GET_BIBLE_VARIABLE_SUCCESS,
	GET_BIBLE_VARIABLE_FAILURE,
	GET_BIBLE_PLAN_REQUEST,
	GET_BIBLE_PLAN_SUCCESS,
	GET_BIBLE_PLAN_FAILURE,
	SET_BIBLE_PLAN
 } from '../config/actionTypes';

export const defaultState = {
	bible : {},
	isBibleLoading : false,
	isBibleLoaded : false,
	isBibleVariableLoading : false,
	isBibleVariableLoaded : false,
	isBiblePlanLoading : false,
	isBiblePlanLoaded : false,
	chapters : {},
	bibleOrder : [],
	selectedBiblePlan : 0,
	biblePlan : []
};

function bibleRD(state = defaultState , action ) {

	switch (action.type) {

		case SET_BIBLE_PLAN: {
			return {
				...state,
				selectedBiblePlan: action.payload
			}
		}

		case GET_BIBLE_PLAN_SUCCESS: {
			return {
				...state,
				biblePlan: [...state.biblePlan, action.payload],
				isBiblePlanLoading : false,
				isBiblePlanLoaded : true
			}
		}

		case GET_BIBLE_PLAN_REQUEST: {
			return Object.assign({}, state, {
				isBiblePlanLoading : true
			});
		}

		case GET_BIBLE_PLAN_FAILURE: {
			return Object.assign({}, state, {
				isBiblePlanLoading : false,
				isBiblePlanLoaded : false
			});
		}

		case GET_BIBLE_VARIABLE_SUCCESS: {
			return Object.assign({}, state, {
				chapters : action.payload.chapters,
				bibleOrder : action.payload.bibleOrder,
				isBibleVariableLoading : false,
				isBibleVariableLoaded : true,
			});
		}

		case GET_BIBLE_VARIABLE_REQUEST: {
			return Object.assign({}, state, {
				isBibleVariableLoading : true
			});
		}

		case GET_BIBLE_VARIABLE_FAILURE: {
			return Object.assign({}, state, {
				isBibleVariableLoading : false,
				isBibleVariableLoaded : false,
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
