import React from 'react';
import Page from "./page";
import './Cryptocurrencies.css';
import InfoCrypto from "../components/InfoCrypto";
import GraphicCrypto from "../components/GraphicCrypto";
import GraphicCryptoRealTime from "../components/GraphicCryptoRealTime";


const Currency = () => {


	return (


		<Page>
			<>
				<h1>Currency</h1>
<InfoCrypto/>
				<GraphicCrypto/>
				<GraphicCryptoRealTime/>
			</>
		</Page>
	);
};


export default Currency;