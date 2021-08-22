// Import
import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import './styles/global.scss';

// Root Component
const Root: React.FC = () => {
	// Render HTML
	return (
		<Container>
			<header>
				<h1>PointBase</h1>
				<p>Point tracking system for Sports Day.</p>
			</header>
		</Container>
	);
}

// Render to DOM
ReactDOM.render(<Root />, document.getElementById('root'));
