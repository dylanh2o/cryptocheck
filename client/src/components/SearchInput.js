import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = () => (
	<div>
		<Search
			placeholder="Recherche"
			onSearch={value => console.log(value)}
			style={{ width: 200 }}
		/>

	</div>
);

export default SearchInput;