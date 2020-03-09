import React, {useEffect} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Currency from '../pages/Currency';
import Cryptocurrencies from '../pages/Cryptocurrencies';
import Exchanges from '../pages/Exchanges';
import SearchInput from "./SearchInput";
import {AnimatePresence} from "framer-motion";
import {fetchInfoCurrency, fetchLogoCurrency, fetchTest} from "../pages/currencySlice";
import {useDispatch} from "react-redux";
window.websocket= null;

const AppLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {

		console.log('test1');
		const wsConnect = () => {

			window.websocket = new WebSocket('wss://ws-sandbox.coinapi.io/v1/');
		};

		wsConnect();

	}, []);

	useEffect(()=>{
		(async () => {
			await dispatch(fetchInfoCurrency());
			await dispatch(fetchLogoCurrency());
		})();
	},[]);

	return (
		<>
			<div className="CadreHeader">
				<span className="Logo">Crypto Check</span>
				<SearchInput/>
			</div>

			<div className="Menu">
				<Link to="/">Home</Link>
				&nbsp;|&nbsp;
				<Link to="/Cryptocurrencies">Cryptocurrencies</Link>
				&nbsp;|&nbsp;
				<Link to="/Exchanges">Exchanges</Link>
			</div>
			<Route
				render={({location}) => (
					<AnimatePresence initial={false} exitBeforeEnter>
						<Switch location={location} key={location.pathname}>
							<Route path="/" exact component={Home}/>
							<Route path="/Currency/:id" exact component={Currency}/>
							<Route path="/Cryptocurrencies" component={Cryptocurrencies}/>
							<Route path="/Exchanges" component={Exchanges}/>
						</Switch>
					</AnimatePresence>
				)}
			/>

		</>
	);
};

export default AppLayout;