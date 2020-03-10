import React, {useEffect} from 'react';
import {List} from 'antd';
import {Chart, Legend, Axis, Tooltip, Geom} from "bizcharts";
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";

const GraphicCrypto = () => {
	const dispatch = useDispatch();
	const currency = useParams().id;
	const currencyWS = 'GEMINI_SPOT_' + currency + '_USD';


	const data = useSelector(state => state.historic[currency]);

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
				dispatch(hydrateRealTimeCurrency({currency, data: dataFromServer}))
			}
		};
		window.websocket.addEventListener('message', onMessage);
		return () => {
			window.websocket.removeEventListener('message', onMessage);
		}
	}, []);

	const data2 = [
		{
			month: "2011-01-01",
			price: 84.0
		},
		{
			month: "2012-02-01",
			price: 14.9
		},
		{
			month: "2013-03-01",
			price: 17.0
		},
		{
			month: "2014-04-01",
			price: 20.2
		},
		{
			month: "2015-05-01",
			price: 55.6
		},
		{
			month: "2016-06-01",
			price: 56.7
		},
		{
			month: "2017-07-01",
			price: 30.6
		},
		{
			month: "2018-08-01",
			price: 63.2
		},
		{
			month: "2019-09-01",
			price: 24.6
		},
		{
			month: "2020-10-01",
			price: 14.0
		}
	];
	const cols = {
		month: {
			alias: "Date"
		},
		price: {
			alias: {currency}
		}
	};

	return (
		<div>
			<Chart height={400} data={data2} scale={cols} >
				<Axis
					name="month"
					title={null}
					tickLine={null}
					line={{
						stroke: "#E6E6E6"
					}}
				/>
				<Axis
					name={currency}
					line={false}
					tickLine={null}
					grid={null}
					title={null}
				/>
				<Tooltip />
				<Geom
					type="line"
					position="month*acc"
					size={1}
					color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
					shape="smooth"
					style={{
						shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
						shadowBlur: 60,
						shadowOffsetY: 6
					}}
				/>
			</Chart>
		</div>



	)
};

export default GraphicCrypto;