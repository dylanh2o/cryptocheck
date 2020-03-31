import React from 'react';
import {Input, AutoComplete} from 'antd';
import {useSelector} from "react-redux";


const SearchInput = () => {
	const data = useSelector(state => state.currency.currency);
	const options = [];
	for (var i = 0; i < data.length; i++) {
		options.push({value: data[i].name});
		options.push({value: data[i].asset_id});
	}

	function search(value) {
		var valueLower = value.toUpperCase();
		for (var i = 0; i < data.length; i++) {
			if (data[i].name.toUpperCase() === valueLower) {
				window.location.replace("/Currency/" + data[i].asset_id);
			}

			if (data[i].asset_id.toUpperCase() === valueLower) {
				window.location.replace("/Currency/" + data[i].asset_id);
			}
		}
	}

	return (
		<div>
			<AutoComplete
				style={{width: 200}}
				options={options}
				filterOption={(inputValue, option) =>
					option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				}
			>
				<Input.Search size="large" placeholder="Recherche"
				              onSearch={value => search(value)}
				/>
			</AutoComplete>

		</div>
	);
};


export default SearchInput;