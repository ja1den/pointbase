// Import
import React from 'react';

import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Component
const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
			<Container>
				<Navbar.Brand href='/'>PointBase</Navbar.Brand>

				<Navbar.Toggle />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/'>Dashboard</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

// Export
export default Header;
