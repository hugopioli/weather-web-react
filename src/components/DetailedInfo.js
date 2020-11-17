import React from 'react';
import { Table, TableRow, TableBody, TableCell } from '@material-ui/core';
import moment from 'moment';
import { FadeTransform } from 'react-animation-components';

const DetailedInfo = ({ high, low, humidity, windSpeed, sunrise, sunset }) => (
	<FadeTransform in 
		transformProps={{
			exitTransform: 'scale(0.5) translateY(-50%)'
		}}>
		<div className="whole-details-area">
			<h4>Mas detalles</h4>
				<Table className="weather-details">
					<TableBody>
						<TableRow>
							<TableCell>Maxima</TableCell>
							<TableCell className="cell-data">{high}&deg;</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Minima</TableCell>
							<TableCell className="cell-data">{low}&deg;</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Humedad</TableCell>
							<TableCell className="cell-data">{humidity}%</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Velocidad del viento</TableCell>
							<TableCell className="cell-data">{windSpeed} m/s</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Amanecer</TableCell>
							<TableCell className="cell-data">{moment.unix(sunrise).format('h:mA')}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Ocaso</TableCell>
							<TableCell className="cell-data">{moment.unix(sunset).format('h:mA')}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
		</div>
	</FadeTransform>
);

export default DetailedInfo;
