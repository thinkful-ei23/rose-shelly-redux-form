import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import './complaint-form.css';

export class ComplaintForm extends React.Component {
  onSubmit(values) {
    console.log(values);
  }
  render() {

    return (
      <form onSubmit={this.props.handleSubmit(values => 
        this.onSubmit(values)
      )}>
      <label htmlFor="tracking-number-field">Tracking Number</label>
      <Field name="tracking-number-field" id="tracking-number" type="text" component="input" />
      <label htmlFor="what-is-your-issue">What is your Issue?</label>
      <select name="what-is-your-issue" id="what-is-your-issue">
        <option value="delay" >My delivery hasn't arrived</option>
        <option value="wrong" >The wrong item was delivered</option>
        <option value="missing" >Part of my order was missing</option>
        <option value="damaged" >Some of my order arrived damaged</option>
        <option value="other" >Other (give details below)</option>
      </select> 
      <label htmlFor="details">Give more details (optional)</label>
      <Field name="details" id="details" type="textarea" component="input" /> 
      </form>
      
     
    );
  }
}

export default reduxForm({
  form: 'complaint'
})(ComplaintForm);
