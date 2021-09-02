// Import
import React from 'react';

import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Component
const Header = ({ user, showLogin, onLogout }) => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
			<Container>
				<Navbar.Brand href='/'>PointBase</Navbar.Brand>

				<Navbar.Toggle />

				<Navbar.Collapse>
					<Nav className='me-auto'>
						<Nav.Link as={NavLink} to='/' exact>Dashboard</Nav.Link>
					</Nav>

					<Nav>
						{
							user !== null ? (
								<NavDropdown title={user.name}>
									<NavDropdown.Item onClick={onLogout}>Log Out</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Button className='mt-2 mt-lg-0' variant='outline-light' onClick={showLogin}>Log In</Button>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

// Export
export default Header;
