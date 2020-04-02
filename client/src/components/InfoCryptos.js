import React from 'react';
import {List, Avatar} from 'antd';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

var dataAssets = [];
const InfoCryptos = () => {

	const data = useSelector(state => state.currency.currency);
	dataAssets = [];
	for (var i = 0; i < data.length; i++) {
		if ((data[i].asset_id === 'BTC') || (data[i].asset_id === 'ETH')) {
			dataAssets.push(data[i]);
		}
	}
	return (

		<div>

			<List
				itemLayout="horizontal"
				dataSource={dataAssets}
				renderItem={item => (

					<List.Item>
						<div>

							<Link to={'/Currency/' + item.asset_id}><Avatar src={item.url}/></Link>
							<h2><Link to={'/Currency/' + item.asset_id}>    {item.name}({item.asset_id})</Link></h2>
							<div className="info">
								<div className="infoGauche">
									Price:
								</div>
								<div>
									{Math.round(item.price_usd)} USD - {Math.round(item.price_usd / 1.06751)} CHF
								</div>
							</div>
						</div>
					</List.Item>
				)}
			/>
		</div>
	)
};

export default InfoCryptos;