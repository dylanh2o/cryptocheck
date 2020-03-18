import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';



export const fetchHistoric1YCurrency = createAsyncThunk(
	'cryptocurrencies/fetchHistoricCurrency',
	async currency => {
		var date=new Date();
		date.setDate(date.getDate()-366);
		let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

		const requestHistoric = await fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_' + currency + '_USD/history?period_id=1DAY&time_start='+formattedDate+'T00:00:00&limit=10', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'C09420D1-71FE-48D4-AFB8-5B1E33F55442'}
		});
		return await requestHistoric.json();


	}
);


export const historic1YSlice = createSlice({
	name: 'historic1Y',
	initialState: {
		state: 'loading',
		error: null,
		historic: [],
	},
	reducers: {},
	extraReducers: {
		[fetchHistoric1YCurrency.pending]: (state, action) => {
			if (state.state !== 'loading') {
				state.state = 'loading';
			}
		},
		[fetchHistoric1YCurrency.fulfilled]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'ready';
				state.historic = action.payload;
			}
		},
		[fetchHistoric1YCurrency.rejected]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'error';
				state.error = action.error.message;

			}
		}

	}


});


export default historic1YSlice.reducer;

