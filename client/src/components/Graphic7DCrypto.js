import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {fetchHistoric7DCurrency} from "../pages/historic7DSlice";
import CanvasJSReact from './canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphicCrypto = () => {

	const dispatch = useDispatch();
	const currency = useParams().id;
	const data = useSelector(state => state.historic7D.historic);
	const options = {
		theme: "light1",
		animationEnabled: true,
		exportEnabled: true,
		backgroundColor: "black",
		title: {
			text: currency + "/USD (7 Days)"
		},
		axisX: {
			valueFormatString: "DD-MM-YY hh:mm",
			labelFontColor: "white"
		},
		axisY: {
			includeZero: false,
			prefix: "$",
			title: "Price (in USD)",
			labelFontColor: "white"
		},
		data: [{
			type: "line",
			lineColor: "orange",
			color: "orangered",
			lineThickness: 2,
			showInLegend: true,
			name: currency,
			yValueFormatString: "$###0.00",
			xValueFormatString: "DD-MM-YY  hh:mm",
			dataPoints: []
		}
		]
	};
	const [opts, setOpts] = useState(options);
	useEffect(() => {
		(async () => {
			let dataPoints = [];
			await dispatch(fetchHistoric7DCurrency(currency));

			for (let i = 0; i < data.length; i++) {
				var dateTMP = data[i].time_period_start;
				var priceTMP = data[i].price_high;
				var dataObject = {["x"]: new Date(dateTMP.substr(0, 16)), ["y"]: priceTMP};
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