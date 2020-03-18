import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {fetchHistoric1DCurrency} from "../pages/historic1DSlice";
import CanvasJSReact from './canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphicCrypto = () => {

	const dispatch = useDispatch();
	const currency = useParams().id;
	const data = useSelector(state => state.historic.historic);
	const options = {
		theme: "light1",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: currency + "/USD (1 Day)"
		},
		axisX: {
			valueFormatString: "DD-MM-YY"
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
			xValueFormatString: "DD-MM-YY",
			dataPoints: []
		}
		]
	};
	const [opts, setOpts] = useState(options);
	useEffect(() => {
		(async () => {
			let dataPoints = [];
			await dispatch(fetchHistoric1DCurrency(currency));

			for (let i = 0; i < data.length; i++) {
				var dateTMP = data[i].time_period_start;
				var priceTMP = data[i].price_high;
				var dataObject = {["x"]: new Date(dateTMP.substr(0, 10)), ["y"]: priceTMP};
				dataPoints.push(dataObject);
			}
			const tmp = {...options};
			tmp.data[0].dataPoints = dataPoints;
			setOpts(tmp);
		})();
	}, []);


	return (
		<div>
			<CanvasJSChart options={opts}

			/>
		</div>


	)
};

export default GraphicCrypto;