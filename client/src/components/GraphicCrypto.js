import React, {useEffect, useState} from 'react';
import {List} from 'antd';
import {Chart, Legend, Axis, Tooltip, Geom} from "bizcharts";
import {useParams} from 'react-router-dom';


const GraphicCrypto = () => {
	const currency = useParams().id;
	const currencyWS = 'GEMINI_SPOT_' + currency + '_USD';
	const [data, setData] = useState([]);


	useEffect(() => {
		window.websocket.send(
			JSON.stringify({
				type: "hello",
				apikey: "F9065291-99B7-44B7-9F3C-4C02D0131B28",
				"heartbeat": false,
				"subscribe_data_type": ["quote"],
				"subscribe_filter_asset_id": [currency]
			})
		);
		const onMessage = (message) => {
			const dataFromServer = JSON.parse(message.data);
			if (dataFromServer.symbol_id === currencyWS) {
				setData(state=>{
					const tmp=[...state];
					tmp.push(dataFromServer);
					return tmp
				});
			}
		};
		window.websocket.addEventListener('message', onMessage);
		return () => {
			window.websocket.removeEventListener('message', onMessage);
		}
	}, []);

	const data2 = [
		{genre: 10000, sold: 1000},
		{genre: 9000, sold: 1500},
		{genre: 7000, sold: 1500},
		{genre: 8000, sold: 2000}
	];
	const cols = {
		sold: {alias: 'BTC'},
		genre: {alias: 'USDT'}
	};

	return (
		<div>
			<Chart width={600} height={400} data={data2} scale={cols}>
				<Axis name="genre" title/>
				<Axis name="sold" title/>
				<Legend position="top" dy={-20}/>
				<Tooltip/>
				<Geom type="line" position="genre*sold" color="genre"/>
			</Chart>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<>
						{Math.round(item.ask_price)} usd - {Math.round(item.ask_price / 1.06751)} CHF
					</>
				)}
			/>
		</div>
	)
};

export default GraphicCrypto;