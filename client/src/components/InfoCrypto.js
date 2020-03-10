import React from 'react';
import {List, Avatar} from 'antd';
import { useSelector } from "react-redux";
import {Link, useParams} from 'react-router-dom';
var dataAssets=[];
const InfoCrypto = () => {
	const params = useParams();
	const data = useSelector(state => state.currency.currency);
	dataAssets=[];
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
						<List.Item.Meta
							avatar={<Avatar src={item.url}/>}
							title={<Link to={'/Currency/' + item.asset_id}>{item.name}</Link>}
							description={item.asset_id}
						/>

						Lancement:{item.data_start}<br/>
						Volume(1 heure):{item.volume_1hrs_usd} usd<br/>
						Volume(1 jours):{item.volume_1day_usd} usd<br/>
						Volume(1 mois): {item.volume_1mth_usd} usd<br/>
						Prix: {Math.round(item.price_usd)} usd - {Math.round(item.price_usd/1.06751)} CHF
					</List.Item>
				)}
			/>
		</div>
	)
};

export default InfoCrypto;