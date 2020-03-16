import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";

import CanvasJSReact from './canvasjs.react';

const dataPoints = [];
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const dataTmp = [];
const GraphicCryptoRealTime = () => {
	const dispatch = useDispatch();
	const currency = useParams().id;
	const currencyWS = 'GEMINI_SPOT_' + currency + '_USD';
	const data = useSelector(state => state.realTime[currency]);

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
		(async () => {
			for (let i = 0; i < data.length; i++) {

				var dateTMP = data[i].time_exchange;
				var priceTMP = data[i].ask_price;
				console.log(priceTMP);
				var dataObject = {["x"]: new Date(dateTMP.substr(0, 10)), ["y"]: priceTMP};
				dataPoints.push(dataObject);
				console.log(options.data[0].dataPoints);
			}
		})();
	}, []);


	let current_datetime = new Date();
	let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

	const options = {
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Graphique BTC/USD (" + formatted_date + ")"
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