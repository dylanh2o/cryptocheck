import React from 'react';
import Page from "./page";
import './Home.css';
import InfoCryptos from "../components/InfoCryptos";
import {Link} from "react-router-dom";

const Home = () => {

	return (
		<Page>
			<h1>Crypto Check</h1>
			<h3>Bienvenu sur Crypto Check, sur ce site tu trouveras des graphiques pour suivre l’évolution de tes
				cryptomonnaies préférées.</h3>
			<h4>Clique <Link to="/Cryptocurrencies">ici</Link> pour aller sur la page de nos cryptomonnaies</h4>
			<div className="centerHome">
				<InfoCryptos/>
			</div>
		</Page>
	);
};

export default Home;