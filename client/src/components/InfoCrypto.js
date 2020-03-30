import React from 'react';
import {List, Avatar} from 'antd';
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

var dataAssets = [];
const InfoCrypto = () => {
	const params = useParams();
	const data = useSelector(state => state.currency.currency);
	dataAssets = [];
	for (var i = 0; i < data.length; i++) {
		if (data[i].asset_id === params.id) {
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

					<Avatar src={item.url}/>
					<h1>	{item.name}({item.asset_id})</h1>

<div className="info">
	<div className="infoGauche">
		Start:<br/>
		Volume(1 jours):<br/>
		Price:
	</div>
	<div>
		{item.data_start}<br/>
		{item.volume_1day_usd} USD<br/>
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

export default InfoCrypto;