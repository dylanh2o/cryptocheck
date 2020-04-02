import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AppLayout from './components/AppLayout'
import store from './store';
import {Provider} from 'react-redux';
import 'antd/dist/antd.min.css';

const App = () => (
	<>
		<Switch>
			<Route path="/" component={AppLayout}/>
		</Switch>
	</>
);

const AppContainer = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
);

export default AppContainer;