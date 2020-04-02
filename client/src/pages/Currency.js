import React from 'react';
import Page from "./page";
import './Currency.css';
import InfoCrypto from "../components/InfoCrypto";
import GraphicCrypto from "../components/GraphicCrypto";
import GraphicCryptoRealTime from "../components/GraphicCryptoRealTime";
import Graphic1DCrypto from "../components/Graphic1DCrypto";
import Graphic7DCrypto from "../components/Graphic7DCrypto";
import Graphic1MCrypto from "../components/Graphic1MCrypto";
import Graphic1YCrypto from "../components/Graphic1YCrypto";
import {Tabs} from 'antd';

const {TabPane} = Tabs;

const Currency = () => {


	return (


		<Page>
			<>

				<div className="center">
					<InfoCrypto/>
				</div>
				<div>

					<Tabs defaultActiveKey="1" size="large">
						<TabPane tab="Now" key="1">
							<GraphicCryptoRealTime/>
						</TabPane>
						<TabPane tab="1 Day" key="2">
							<Graphic1DCrypto/>
						</TabPane>
						<TabPane tab="7 Days" key="3">
							<Graphic7DCrypto/>
						</TabPane>
						<TabPane tab="1 Month" key="4">
							<Graphic1MCrypto/>
						</TabPane>
						<TabPane tab="1 Years" key="5">

							<Graphic1YCrypto/>
						</TabPane>
						<TabPane tab="All Time" key="6">
							<GraphicCrypto/>
						</TabPane>

					</Tabs>
				</div>


			</>
		</Page>
	);
};


export default Currency;