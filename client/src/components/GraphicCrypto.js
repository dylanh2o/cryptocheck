import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";
import {fetchHistoricCurrency} from "../pages/historicSlice";

import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GraphicCrypto = () => {
	const dispatch = useDispatch();
	const currency = useParams().id;
	const currencyWS = 'GEMINI_SPOT_' + currency + '_USD';
	const data = useSelector(state => state.historic[currency]);
	const dataTMP = [];
	useEffect(() => {
		(async () => {
			await dispatch(fetchHistoricCurrency(currency));
		})();
	}, []);


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

	useEffect(() => {
		for (let i = 0; i < data2.length; i++) {

			var dateTMP = data2[i].time_period_start;
			var priceTMP = data2[i].price;
			var dataObject = {["date"]: dateTMP.substr(0, 10), ["price"]: priceTMP};
			dataTMP.push(dataObject);

		}
	}, []);

	const data2 = [

		{
			time_period_start: "2011-09-13T8739734",
			price: 6
		},
		{
			time_period_start: "2011-09-14T44545",
			price: 14
		},
		{
			time_period_start: "2011-09-15T343",
			price: 17
		}

	];


	console.log(dataTMP);


	const options = {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Number of iPhones Sold"
		},
		axisY: {
			title: "Number of iPhones ( in Million )",
			includeZero: false,
		},
		data: [
			{
				type: "area",
				xValueFormatString: "YYYY",
				yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{x: new Date(2017, 0), y: 7.6},
					{x: new Date(2016, 0), y: 7.3},
					{x: new Date(2015, 0), y: 6.4},
					{x: new Date(2014, 0), y: 5.3},
					{x: new Date(2013, 0), y: 4.5},
					{x: new Date(2012, 0), y: 3.8},
					{x: new Date(2011, 0), y: 3.2}
				]
			}
		]
	};
	return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
		</div>


	)
};

export default GraphicCrypto;