// Import
import React from 'react';

import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import { object, string } from 'yup';

// Schema
const LoginSchema = object().shape({
	email: string().email('Invalid email address.').required('Required.'),
	password: string().required('Required.')
});

// Component
const Login = (props) => {
	// Handle Submit
	const onSubmit = (data, { resetForm }) => {
		// Submit
		props.onLogin?.(data);

		// Reset
		resetForm();

		// Hide
		props.onHide?.();
	}

	// Render HTML
	return (
		<Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={onSubmit}>
			{({ errors, touched, resetForm, handleSubmit }) => (
				<Modal show={props.show} onHide={props.onHide} onExited={resetForm}>
					<Modal.Header closeButton>
						<Modal.Title>Log In</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form noValidate>
							<Form.Group className='mb-3'>
								<Form.Label>Email</Form.Label>
								<Field type='email' name='email' as={Form.Control} isInvalid={touched.email && !!errors.email} />
								<ErrorMessage name='email' type='invalid' component={Form.Control.Feedback} />
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Field type='password' name='password' as={Form.Control} isInvalid={touched.password && !!errors.password} />
								<ErrorMessage name='password' type='invalid' component={Form.Control.Feedback} />
							</Form.Group>
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary' onClick={props.onHide}>Close</Button>
						<Button variant='primary' onClick={handleSubmit}>Log In</Button>
					</Modal.Footer>
				</Modal>
			)}
		</Formik>
	);
}

// Export
export default Login;
