import React, { createContext, useReducer } from 'react';


const actions = {
	ALERT_ERROR: 'ALERT_ERROR',
	ALERT_CLEAR: 'ALERT_CLEAR',
    SET_LAT: 'SET_LAT',
	SET_LON: 'SET_LON',
	SET_CITY: 'SET_CITY',
	SET_COUNTRY: 'SET_COUNTRY',
}

const initialState = {
    selectedCityLat: {
		latitud: null,	
	},
	selectedCityLon: {
		longitud: null,
	},
	selectedCity: {
		city:null,
	},
	selectedCountry: {
		country:null
	},
	alert: {},
	
};


const store = createContext(initialState);
const { Provider } = store;

let currentState = null;
let dispatch = null;
let dispatchToPromise = null;


const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		var newState = null;
		switch (action.type) {
			case actions.ALERT_ERROR:
				newState = {
					...state,
					alert: {
						type: 'danger',
						message: action.payload
					}
				}
				break;
                case actions.ALERT_CLEAR:
				newState = {
					...state,
					alert: {
					}
				}
				break;
			case actions.SET_LAT:
				newState = {
					...state,
					selectedCityLat: {
						latitud: action.payload,	
					} 
				}
				break;	
			case actions.SET_LON:
				newState = {
					...state,
					selectedCityLon: {
						longitud: action.payload,
					} 
				}
				break;
				case actions.SET_CITY:
				newState = {
					...state,
					selectedCity: {
						city: action.payload,
					} 
				}
				break;
				case actions.SET_COUNTRY:
				newState = {
					...state,
					selectedCountry: {
						country: action.payload
					} 
				}
				break;
			default:
				throw new Error();
		};
		currentState = { ...newState };
		return newState;
	}, initialState);
	setDispatcher(dispatch);
	setDispatchToPromise(async (action) => {
		dispatch(action);
	});

	return <Provider value={{ state, dispatch, dispatchToPromise }}>{children}</Provider>;
};

function setDispatcher(dispatch1) {
	if (!dispatch) {
		dispatch = dispatch1;
	}
}

function setDispatchToPromise(dispatchToPromise1) {
	if (!dispatchToPromise) {
		dispatchToPromise = dispatchToPromise1;
	}
}

export { store, StateProvider, actions, currentState, dispatch, dispatchToPromise }

