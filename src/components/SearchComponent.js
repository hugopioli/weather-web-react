import React from 'react';
import { MenuItem, TextField, Button } from '@material-ui/core';

const SearchComponent = ({ handleChange, city, handleSubmit }) => (
	<div>
		<form>
			<MenuItem className="menu-item">
				<TextField
					placeholder="Buscar Ciudad"
					type="text"
					onChange={handleChange}
					value={city}
					label="Ciudad"
					color="secondary"
				/>
				<Button type="submit" onClick={handleSubmit} className="location-button">
					<i className="fas fa-search" />
				</Button>
			</MenuItem>
		</form>
	</div>
);

export default SearchComponent;
