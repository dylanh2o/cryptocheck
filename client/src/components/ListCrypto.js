import React from 'react';
import {List, Avatar} from 'antd';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const ListCrypto = () => {
	const dataAssets = useSelector(state => state.currency.currency);

	return (
		<div>

			<List
				itemLayout="horizontal"
				dataSource={dataAssets}
				renderItem={item => (

					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.url}/>}
							title={<Link to={'/Currency/' + item.asset_id}>{item.name}</Link>}
						/>

					</List.Item>
				)}
			/>
		</div>
	)
};

export default ListCrypto;