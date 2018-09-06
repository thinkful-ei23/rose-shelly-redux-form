import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import './complaint-form.css';
import { required, number, length } from './validators';
import Input from './input';

export class ComplaintForm extends React.Component {
	onSubmit(values) {
    console.log(values);

    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .then(() => console.log('Submitted with values', values))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
}
	render() {
		return (
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="tracking-number-field">Tracking Number</label>
				<Field
					name="tracking-number-field"
					id="tracking-number"
					type="text"
					component={Input}
					validate={[required, number, length]}
				/>
				<label htmlFor="what-is-your-issue">What is your Issue?</label>
				<Field
					component={Input}
					element="select"
					name="what-is-your-issue"
					id="what-is-your-issue"
				>
					<option value="delay">My delivery hasn't arrived</option>
					<option value="wrong">The wrong item was delivered</option>
					<option value="missing">Part of my order was missing</option>
					<option value="damaged">Some of my order arrived damaged</option>
					<option value="other">Other (give details below)</option>
				</Field>
				<label htmlFor="details">Give more details (optional)</label>
				<Field name="details" id="details" textarea="text" component={Input} />
				<button>Submit</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'complaint'
})(ComplaintForm);
