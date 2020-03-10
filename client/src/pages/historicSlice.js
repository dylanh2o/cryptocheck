import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

var dataAssetsHistoric5 = [];


export const fetchHistoricCurrency = createAsyncThunk(
	'cryptocurrencies/fetchHistoricCurrency',
	async () => {
//recuperer toutes les logo des crypto
		const requestHistoric = await fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1DAY&time_start=1900-01-01T00:00:00&limit=10000', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'F9065291-99B7-44B7-9F3C-4C02D0131B28'}
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
		BCH: [],
		BTC: [],
		LTC: [],
		ETH: [],
		ZEC: [],
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
				state.currency = action.payload;
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

