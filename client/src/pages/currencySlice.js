import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

var dataAssetsInfo5 = [];
var dataAssetsLogo5 = [];
var dataAssetsTest5 =[];
var dataAssets5 = [];

//fonction pour fusionner deux tableaux d'objets avec une clé similaire
function mergeArrayObjects(arr1, arr2) {
	return arr1.map((item, i) => {
		if (item.id === arr2[i].id) {
			//fusionne deux objets
			return Object.assign({}, item, arr2[i])
		}

		return null;
	})
}

export const fetchInfoCurrency = createAsyncThunk(
	'cryptocurrencies/fetchInfoCurrency',
	async () => {

//recuperer toutes les info des crypto
		const request = await fetch('https://rest.coinapi.io/v1/assets', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'F9065291-99B7-44B7-9F3C-4C02D0131B28'}
		});

		const data = await request.json();
		for (var i = 0; i < data.length; i++) {
			if ((data[i].asset_id === 'BTC') || (data[i].asset_id === 'ETH') || (data[i].asset_id === 'USDT') || (data[i].asset_id === 'XRP') || (data[i].asset_id === 'BCH')) {
				dataAssetsInfo5.push(data[i]);
			}
		}
		dataAssetsInfo5.sort((a, b) => (a.asset_id > b.asset_id) ? 1 : -1);
		return dataAssetsInfo5;
	}
);

export const fetchLogoCurrency = createAsyncThunk(
	'cryptocurrencies/fetchLogoCurrency',
	async () => {
		dataAssetsLogo5 = [];
//recuperer toutes les logo des crypto
		const request = await fetch('https://rest.coinapi.io/v1/assets/icons/{12px}', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'F9065291-99B7-44B7-9F3C-4C02D0131B28'}
		});

		const data = await request.json();
		for (var i = 0; i < data.length; i++) {
			if ((data[i].asset_id === 'BTC') || (data[i].asset_id === 'ETH') || (data[i].asset_id === 'USDT') || (data[i].asset_id === 'XRP') || (data[i].asset_id === 'BCH')) {
				dataAssetsLogo5.push(data[i]);
			}
		}

		dataAssetsLogo5.sort((a, b) => (a.asset_id > b.asset_id) ? 1 : -1);
		dataAssets5 = (mergeArrayObjects(dataAssetsInfo5, dataAssetsLogo5));
		dataAssets5.sort((a, b) => (a.name > b.name) ? 1 : -1);
		return dataAssets5;
	}
);




export const currencySlice = createSlice({
	name: 'currency',
	initialState: {
		state: 'loading',
		error: null,
		currency: []
	},
	reducers: {

	},
	extraReducers: {
		[fetchInfoCurrency.pending]: (state, action) => {
			if (state.state !== 'loading') {
				state.state = 'loading';
			}
		},
		[fetchInfoCurrency.fulfilled]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'ready';
				state.currency = action.payload;
			}
		},
		[fetchInfoCurrency.rejected]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'error';
				state.error = action.error.message;

			}
		}, [fetchLogoCurrency.pending]: (state, action) => {
			if (state.state !== 'loading') {
				state.state = 'loading';
			}
		},
		[fetchLogoCurrency.fulfilled]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'ready';
				state.currency = action.payload;
			}
		},
		[fetchLogoCurrency.rejected]: (state, action) => {
			if (state.state === 'loading') {
				state.state = 'error';
				state.error = action.error.message;

			}
		}

	}
});


export const getCryptocurrenciesCurrencys = state => state.currency.currency;



export default currencySlice.reducer;

