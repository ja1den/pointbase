// Import
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './styles/global.scss';

import Layout from './components/Layout';
import Header from './components/Header';

import HomePage from './pages/Home';

// Root Component
const Root = () => {
	// Render HTML
	return (
		<Router>
			<Header />

			<main>
				<Layout>
					<Switch>
						<Route path='/' exact>
							<HomePage />
						</Route>
					</Switch>
				</Layout>
			</main>
		</Router>
	);
}

// Render to DOM
ReactDOM.render(<Root />, document.getElementById('root'));
