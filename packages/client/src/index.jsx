// Import
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import axios from 'axios';

import './styles/global.scss';

import Navigation from './components/Navigation';
import Login from './components/Login';

// Pages
import DashboardPage from './pages/Dashboard';
import ErrorPage from './pages/Error';

// Root Component
class Root extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLogin: false,
			user: null
		};
	}

	// Handle Mount
	async componentDidMount() {
		// Emit Request
		await axios.get('/api/auth').then(({ data }) => data && this.setState({ user: data }));
	}

	// Render HTML
	render = () => {
		return (
			<Router>
				<Navigation user={this.state.user} showLogin={() => this.setState({ showLogin: true })} onLogout={this.onLogout} />
				<Login show={this.state.showLogin} onHide={() => this.setState({ showLogin: false })} onLogin={this.onLogin} />

				<main>
					<Container className='pt-4 pt-lg-5'>
						<Switch>
							<Route path='/' exact>
								<DashboardPage />
							</Route>

							<Route>
								<ErrorPage />
							</Route>
						</Switch>
					</Container>
				</main>
			</Router>
		);
	}

	// Handle Login
	onLogin = async ({ email, password }) => {
		// Emit Request
		const { data } = await axios.post('/api/auth/login', { email, password });

		// Update State
		this.setState({ user: data });
	}

	// Handle Logout
	onLogout = async () => {
		// Emit Request
		await axios.get('/api/auth/logout');

		// Update State
		this.setState({ user: null });
	}
}

// Render to DOM
ReactDOM.render(<Root />, document.getElementById('root'));
