import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


var dataAssetsHistoric5 = [];
export const fetchHistoricCurrency = createAsyncThunk(
	'cryptocurrencies/fetchHistoricCurrency',
	async () => {
//recuperer toutes les logo des crypto
		const requestHistoric = await fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1DAY&time_start=1900-01-01T00:00:00&limit=10000', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': '418BFD29-C1F4-4AA9-801F-2B09682EFAB4'}
		});
		const data = await requestHistoric.json();
		dataAssetsHistoric5.push(data);
		console.log(dataAssetsHistoric5);
		return dataAssetsHistoric5;

	}
);


export const historicSlice = createSlice({
	name: 'historic',
	initialState: {
		state: 'loading',
		error: null,
	historic:[],
	},
	reducers: {

	},
	extraReducers: {
		[fetchHistoricCurrency.pending]: (state, action) => {
			if (state.state !== 'loading') {
				state.state = 'loading';
			}
		},
		[fetchHistoricCurrency.fulfilled]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'ready';
				state.historic = action.payload;
			}
		},
		[fetchHistoricCurrency.rejected]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'error';
				state.error = action.error.message;

			}
		}

	}


});


export default historicSlice.reducer;

