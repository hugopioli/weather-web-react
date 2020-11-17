import React from 'react';

const Location = (props) => {
	return(
		<div>
			<h3 className="main-description">{props.description}</h3>
			<h2 className="main-city">{props.city}, {props.country}</h2>
			<p className="main-feels-like">Sensación térmica: {Math.round(props.feels_like)}&deg;</p>
		</div>
		)
}

export default Location; 
