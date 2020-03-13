import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

var dataAssetsInfo5 = [];
var dataAssetsLogo5 = [];
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
			headers: {'X-CoinAPI-Key': 'C09420D1-71FE-48D4-AFB8-5B1E33F55442'}
		});

		const data = await request.json();
		for (let i = 0; i < data.length; i++) {
			if ((data[i].asset_id === 'BTC') || (data[i].asset_id === 'ETH') || (data[i].asset_id === 'ZEC') || (data[i].asset_id === 'LTC') || (data[i].asset_id === 'BCH')) {
				dataAssetsInfo5.push(data[i]);

			}

		}
		//dataAssetsLogo5 = [];
//recuperer tout les logo des crypto
		const requestLogo = await fetch('https://rest.coinapi.io/v1/assets/icons/{12px}', {
			method: 'GET',
			headers: {'X-CoinAPI-Key': 'C09420D1-71FE-48D4-AFB8-5B1E33F55442'}
		});

		const dataLogo = await requestLogo.json();
		for (let i = 0; i < dataLogo.length; i++) {
			if ((dataLogo[i].asset_id === 'BTC') || (dataLogo[i].asset_id === 'ETH') || (dataLogo[i].asset_id === 'ZEC') || (dataLogo[i].asset_id === 'LTC') || (dataLogo[i].asset_id === 'BCH')) {
				dataAssetsLogo5.push(dataLogo[i]);

			}
		}

		dataAssetsInfo5.sort((a, b) => (a.asset_id > b.asset_id) ? 1 : -1);
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
		}

	}
});




export default currencySlice.reducer;

