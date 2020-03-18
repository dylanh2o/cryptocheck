import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit';
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from 'history'
import currencySlice from './pages/currencySlice';
import realTimeSlice from './pages/realTimeSlice';
import historicSlice from './pages/historicSlice';
import historic1DSlice from './pages/historicSlice';
import historic7DSlice from './pages/historicSlice';
import historic1MSlice from './pages/historicSlice';
import historic1YSlice from './pages/historicSlice';

const reducers = history => combineReducers({
	router: connectRouter(history),
	currency: currencySlice,
	realTime: realTimeSlice,
	historic: historicSlice,
	historic1D: historic1DSlice,
	historic7D: historic7DSlice,
	historic1M: historic1MSlice,
	historic1Y: historic1YSlice

});
export const history = createBrowserHistory();

export default configureStore({
	reducer: reducers(history),
	mw: applyMiddleware(routerMiddleware(history))
});
