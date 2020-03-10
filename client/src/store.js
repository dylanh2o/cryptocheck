import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit';
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from 'history'
import currencySlice from './pages/currencySlice';
import realTimeSlice from './pages/realTimeSlice';
import historicSlice from './pages/historicSlice';


const reducers = history => combineReducers({
	router: connectRouter(history),
	currency: currencySlice,
	realTime: realTimeSlice,
	historic: historicSlice,

});
export const history = createBrowserHistory();

export default configureStore({
	reducer: reducers(history),
	mw: applyMiddleware(routerMiddleware(history))
});
