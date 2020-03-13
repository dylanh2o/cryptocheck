import React, {useEffect} from 'react';
import {Chart, Legend, Axis, Tooltip, Geom} from "bizcharts";
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {hydrateRealTimeCurrency} from "../pages/realTimeSlice";
import {fetchHistoricCurrency} from "../pages/historicSlice";

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

useEffect(()=>{
	for (let i = 0; i < data2.length; i++) {

		var dateTMP = data2[i].time_period_start;
		var priceTMP = data2[i].price;
		var dataObject = {["date"]: dateTMP.substr(0, 10), ["price"]: priceTMP};
		dataTMP.push(dataObject);

	}
},[]);

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

	const cols = {
		date: {
			alias: "Date"
		},
		price: {
			alias: currency
		}
	};
console.log(dataTMP);
	return (
		<div>
			<Chart height={400} data={dataTMP} scale={cols} >
				<Axis
					name="date"
					title={null}
					tickLine={null}
					line={{
						stroke: "#E6E6E6"
					}}
				/>
				<Axis
					name="price"
					line={false}
					tickLine={null}
					grid={null}
					title={null}
				/>
				<Tooltip/>
				<Geom
					type="line"
					position="date*price"
					size={1}
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