import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


var dataAssetsHistoric5 = [];
export const fetchHistoricCurrency = createAsyncThunk(
	'cryptocurrencies/fetchHistoricCurrency',
	async currency => {
//recuperer toutes les logo des crypto
		console.log(currency);
		const requestHistoric = await fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_' + currency + '_USD/history?period_id=1DAY&time_start=1900-01-01T00:00:00&limit=100', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'C09420D1-71FE-48D4-AFB8-5B1E33F55442'}
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
		historic: [],
	},
	reducers: {},
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

