// Import
import React from 'react';

import { Container } from 'react-bootstrap';

// Component
const Layout = (props) => {
	return <Container className='pt-4 pt-lg-5'>{props.children}</Container>;
}

// Export
export default Layout;
