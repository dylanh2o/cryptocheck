import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";

import CanvasJSReact from './canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
				"subscribe_filter_asset_id": ['USD']
			})
		);
		const onMessage = (message) => {
			console.log(message.data);
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


	const options = {
		theme: "light1",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: currency + "/USD (Now)"
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
			type: "spline",
			showInLegend: true,

			name: currency,
			yValueFormatString: "$###0.00",
			xValueFormatString: "DD-MM-YY HH:mm:ss",
			dataPoints: []
		}
		]
	};
	const [opts, setOpts] = useState(options);

	useEffect(() => {
		let dataPoints = [];
		for (let i = 0; i < data.length; i++) {
			let priceTMP = data[i].ask_price;
			let date = data[i].time_exchange;
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
		const tmp = {...options};
		tmp.data[0].dataPoints = dataPoints;
		setOpts(tmp);

	}, [data]);


	return (
		<div>
			<CanvasJSChart options={opts}

			/>
		</div>


	)
};

export default GraphicCryptoRealTime;