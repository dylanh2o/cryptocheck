import React from 'react';
import Page from "./page";
import ListCrypto from '../components/ListCrypto';

import './Cryptocurrencies.css';

const Cryptocurrencies = () => {


	return (


		<Page>
			<h1>Cryptocurrencies</h1>
			<div className="center">
				<ListCrypto/>
			</div>
		</Page>
	);
};


export default Cryptocurrencies;