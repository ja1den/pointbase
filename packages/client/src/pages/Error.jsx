// Import
import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

// Component
const ErrorPage = () => {
	return (
		<Fragment>
			<header>
				<h1>Error!</h1>
				<p>The page requested does not exist.</p>
			</header>

			<p>Click <Link to='/'>here</Link> to return home.</p>
		</Fragment>
	);
}

// Export
export default ErrorPage;
