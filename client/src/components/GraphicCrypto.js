import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {fetchHistoricCurrency} from "../pages/historicSlice";
import CanvasJSReact from './canvasjs.react';
const dataPoints=[];
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphicCrypto = () => {
	const dispatch = useDispatch();
	const currency = useParams().id;

	const data = useSelector(state => state.historic);
	useEffect(() => {
		(async () => {
		//	await dispatch(fetchHistoricCurrency(currency));
			for (let i = 0; i < data2.length; i++) {

				var dateTMP = data2[i].time_period_start;
				var priceTMP = data2[i].price; //_high;
				var dataObject = {["x"]: new Date(dateTMP.substr(0, 10) ), ["y"]: priceTMP};
				dataPoints.push(dataObject);
			}
			//console.log(JSON.stringify(options.data[0].dataPoints));
			console.log(options.data[0].dataPoints);
		})();
	}, []);


	useEffect(() => {

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


	const options = {
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Graphique BTC/USD (all time)"
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

export default GraphicCrypto;