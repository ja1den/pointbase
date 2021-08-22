// Import
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './styles/global.scss';

import colors from '@lib/colors';

// Root Component
const Root: React.FC = () => {
	const [color, setColor] = useState<string | null>(null);

	// Request a Color
	const requestColor = () => {
		axios.get('/api/color').then(res => setColor(res.data))
			.catch(console.error);
	};

	// Emit Request
	useEffect(() => void requestColor(), []);

	// Bind 'onClick'
	useEffect(() => {
		document.body.onclick = requestColor;

		return () => {
			document.body.onclick = null;
		};
	}, [color]);

	// List Elements
	const elements: JSX.Element[] = [];

	for (let i = 0; i < colors.length; i++) {
		elements.push(
			<li key={i} style={{
				backgroundColor:
					colors[i] === color ? colors[i] : '#EEE'
			}} />
		);
	}

	// Render HTML
	return <ul className='colors' children={elements} />;
}

// Render to DOM
ReactDOM.render(<Root />, document.getElementById('root'));
