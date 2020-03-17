import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";

import CanvasJSReact from './canvasjs.react';

const dataPoints = [];
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GraphicCryptoRealTime = () => {
	const dispatch = useDispatch();
	const currency = useParams().id;
	const currencyWS = 'GEMINI_SPOT_' + currency + '_USD';
	const data = [];
	data["BTC"] = [];
	data["BCH"] = [];
	data["ETH"] = [];
	data["ZEC"] = [];
	data["LTC"] = [];
	data[currency] = useSelector(state => state.realTime[currency]);

	console.log(data);
	console.log(dataPoints);
	useEffect(() => {

		window.websocket.send(
			JSON.stringify({
				type: "hello",
				apikey: "C09420D1-71FE-48D4-AFB8-5B1E33F55442",
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
	useEffect(() => {

		for (let i = 0; i < data[currency].length; i++) {
			let priceTMP = data[currency][i].ask_price;
			let date = data[currency][i].time_exchange;
			let formatDate = date.substr(0, 11);
			let formatHeure = Number(date.substr(11, 2)) + 1;
			let formatMS = date.substr(13, 6);
			let dateTMP = formatDate + formatHeure + formatMS;
			var dataObject = {["x"]: new Date(dateTMP), ["y"]: priceTMP};
			if (dataPoints.length < 100) {
				dataPoints.push(dataObject);
			} else {
				dataPoints.splice(0, 1);
				dataPoints.push(dataObject);
			}
		}
		console.log(dataPoints);

	},);


	let current_datetime = new Date();
	let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":"+ current_datetime.getMinutes() ;

	const options = {
		theme: "light1",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Graphique " + currency + "/USD (" + formatted_date + ")"
		},
		axisX: {
			valueFormatString: "DD-MM-YY HH:mm:ss"
		},
		axisY: {
			includeZero: false,
			prefix: "$",
			title: "Price (in USD)"
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: currency,
			yValueFormatString: "$###0.00",
			xValueFormatString: "DD-MM-YY HH:mm:ss",
			dataPoints: dataPoints
		}
		]
	};
	return (
		<div>
			<CanvasJSChart options={options}

			/>
		</div>


	)
};

export default GraphicCryptoRealTime;