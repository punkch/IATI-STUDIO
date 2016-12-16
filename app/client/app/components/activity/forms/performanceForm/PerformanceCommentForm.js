import React, { Component } from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderField} from '../../helpers/FormHelper'
import {connect} from 'react-redux'
import { getCodeListItems, createActivity } from '../../../../actions/activity'

const renderAdditionalRenderPerformanceCommentForm = ({fields, meta: {touched, error}}) => (
  <div>
    {fields.map((description, index) =>
      <div className="field-list" key={index}>
        <RenderPerformanceCommentForm/>
      </div>
    )}
    <div className="columns">
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
      <button
        type="button"
        title="Remove Title"
        className="control-button remove float-right"
        onClick={() => fields.pop()}>Delete
      </button>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);


const RenderPerformanceCommentForm = () =>
 (
  <div>
    <div className="row no-margin">
      <div className="columns small-6">
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Name"
        />
      </div>
      <div className="columns small-6">
        <Field
          name="value"
          type="text"
          component={renderField}
          label="Value"
        />
      </div>
    </div>
    <div className="row no-margin">
      <div className="columns small-6">
        <Field
          name="IATIEquivalent"
          type="text"
          component={renderField}
          label="IATI equivalent"
        />
      </div>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.IATIEquivalent) {
    errors.type = 'Required'
  }
  return errors
};

class PerformanceCommentForm extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="columns small-centered small-12">
        <h2 className="page-title with-tip">Comment</h2>
        <Tooltip className="inline" tooltip="Description text goes here">
          <i className="material-icons">info</i>
        </Tooltip>
        <div className="field-list">
          <RenderPerformanceCommentForm/>
        </div>
        <FieldArray
          name="additionalCommentScope"
          component={renderAdditionalRenderPerformanceCommentForm}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    activity: state.activity
  }
}

PerformanceCommentForm = reduxForm({
  form: 'performance-comment',     // a unique identifier for this form
  destroyOnUnmount: false,
  validate
})(PerformanceCommentForm);


PerformanceCommentForm = connect(mapStateToProps, {getCodeListItems, createActivity})(PerformanceCommentForm);
export default PerformanceCommentForm;