import React, {useState, useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Currency from '../pages/Currency';
import Cryptocurrencies from '../pages/Cryptocurrencies';
import SearchInput from "./SearchInput";
import {AnimatePresence} from "framer-motion";
import {fetchInfoCurrency} from "../pages/currencySlice";
import {useDispatch} from "react-redux";


window.websocket = null;

const AppLayout = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const wsConnect = () => {

			window.websocket = new WebSocket('wss://ws-sandbox.coinapi.io/v1/');
			window.websocket.onopen = () => {
				setLoading(false);
			};
		};
		wsConnect();
	}, []);

	useEffect(() => {
		(async () => {
			await dispatch(fetchInfoCurrency());

		})();
	}, []);

	return loading ? 'Loading...' : (
		<>
			<div className="CadreHeader">
				<span className="Logo">Crypto Check</span>
				<SearchInput/>
			</div>

			<div className="Menu">
				<Link to="/">Home</Link>
				&nbsp;|&nbsp;
				<Link to="/Cryptocurrencies">Cryptocurrencies</Link>
			</div>
			<Route
				render={({location}) => (
					<AnimatePresence initial={false} exitBeforeEnter>
						<Switch location={location} key={location.pathname}>
							<Route path="/" exact component={Home}/>
							<Route path="/Currency/:id" exact component={Currency}/>
							<Route path="/Cryptocurrencies" component={Cryptocurrencies}/>
						</Switch>
					</AnimatePresence>
				)}
			/>

		</>
	);
};

export default AppLayout;