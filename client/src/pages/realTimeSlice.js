import {createSlice} from '@reduxjs/toolkit';



export const realTimeSlice = createSlice({
	name: 'RealTime',
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
		hydrateRealTimeCurrency: (state,action) =>{
	state[action.payload.currency].push(action.payload.data);
}
	}




});


export const  { hydrateRealTimeCurrency} = realTimeSlice.actions;

export default realTimeSlice.reducer;

