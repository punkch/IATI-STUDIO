import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../general/Tooltip.react.jsx'
import {GeneralLoader} from '../../general/Loaders.react.jsx'
import {renderLanguageSelect, renderField} from '../helpers/FormHelper'

const renderOrganisationSelect = ({name, label, selectOptions, defaultOption, meta: {touched, error}}) => (
  <div className="columns small-6">
    <label>{label}</label>
    <div>
      <Field name={name} component="select">
        <option>{defaultOption}</option>
        {
          selectOptions.map((role, index) => <option key={index} value={role.code}>{role.name}</option>)
        }
      </Field>
    </div>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

const renderParticipatingOrganisation = ({fields, roleOptions, typeOptions, languageOptions}) => (
  <div className="field-list">
    <div>
      <h6>Participating organisation </h6>
      <Field
        component={renderOrganisationSelect}
        name="role[code]"
        label="Organisation role"
        selectOptions={roleOptions}
        defaultOption="Select an organisation role"
      />
      <div className="columns small-6">
        <Field
          name="identifier"
          type="text"
          component={renderField}
          label="Identifier"
        />
      </div>
      <Field
        component={renderOrganisationSelect}
        name="type[code]"
        label="Organisation Type"
        selectOptions={typeOptions}
        defaultOption="Select an organisation type"
      />
      <div className="columns small-6">
        <Field
          name="activity_id"
          type="text"
          component={renderField}
          label="Activity ID"
        />
      </div>
      <FieldArray name="additionalTitles" component={renderTitles} languageOptions={languageOptions}/>
    </div>
    {fields.map((organisations, index) =>
      <div key={index}>
        <h6>Participating organisation #{index + 1}</h6>
        <Field
          component={renderOrganisationSelect}
          name={`${organisations}.role`}
          label="Organisation role"
          selectOptions={roleOptions}
          defaultOption="Select an organisation role"
        />
        <div className="columns small-6">
          <Field
            component={renderField}
            name={`${organisations}.identifier`}
            label="Identifier"
            type="text"
          />
        </div>
        <Field
          component={renderOrganisationSelect}
          name={`${organisations}.type`}
          label="Organisation Type"
          selectOptions={typeOptions}
          defaultOption="Select an organisation type"
        />
        <div className="columns small-6">
          <Field
            name={`${organisations}.activityId`}
            type="text"
            component={renderField}
            label="Activity ID"
          />
        </div>
        <FieldArray
          name={`${organisations}.additionalTitles`}
          component={renderTitles}
          languageOptions={languageOptions}
        />
        <button
          type="button"
          title="Remove Title"
          className="control-button remove float-right"
          onClick={() => fields.pop()}
        >Delete
        </button>
      </div>
    )}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </div>
  </div>
);

const renderTitles = ({fields, languageOptions, meta: {touched, error}}) => (
  <div className="field-list">
    <div>
      <h6>Narrative</h6>
      <div className="columns small-6">
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Organisation Name"
        />
      </div>
      <Field
        component={renderLanguageSelect}
        name="titleLanguage[code]"
        label="Language"
        languageOptions={languageOptions}
      />
    </div>
    {fields.map((title, index) =>
      <div key={index}>
        <h6>Narrative</h6>
        <div className="columns small-6">
          <Field
            name={`${title}.name`}
            type="text"
            component={renderField}
            label={`Organisation Name #${index + 1}`}
          />
        </div>
        <Field
          component={renderLanguageSelect}
          name={`${title}.language[code]`}
          label={`Language #${index + 1}`}
          languageOptions={languageOptions}
        />
        <button
          type="button"
          title="Remove Title"
          className="control-button remove float-right"
          onClick={() => fields.pop()}>Delete
        </button>
      </div>
    )}
    {touched && error && <li className="error">{error}</li>}
    <div>
      <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More</button>
    </div>
  </div>
);

const validate = values => {
  const errors = {};

  if (!values.activityId) {
    errors.activityId = 'Required'
  }
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.role) {
    errors.role = 'Required'
  }
  if (!values.identifier) {
    errors.identifier = 'Required'
  }
  if (!values.type) {
    errors.type = 'Required'
  }
  if (!values.actionid) {
    errors.actionid = 'Required'
  }
  if (!values.titleLanguage) {
    const titleLanguageCodeObj = {};
    titleLanguageCodeObj.code = 'Required';
    errors.titleLanguage = titleLanguageCodeObj
  }

  if (values.renderTitlesData) {
    const titlesArrayErrors = [];

    values.renderTitlesData.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.role) {
        titleErrors.role = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.identifier) {
        titleErrors.identifier = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.type) {
        titleErrors.type = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.activityId) {
        titleErrors.activityId = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
    });

    if (titlesArrayErrors.length) {
      errors.renderTitlesData = titlesArrayErrors
    }
  }

  if (values.additionalTitles) {
    const titlesArrayErrors = [];

    values.additionalTitles.forEach((title, titleIndex) => {
      const titleErrors = {};
      if (!title || !title.name) {
        titleErrors.name = 'Required';
        titlesArrayErrors[titleIndex] = titleErrors
      }
      if (!title || !title.language) {
        const codeObj = {};
        codeObj.code = 'Required';
        titleErrors.language = codeObj;
        titlesArrayErrors[titleIndex] = titleErrors
      }
    });

    if (titlesArrayErrors.length) {
      errors.additionalTitles = titlesArrayErrors
    }
  }
  return errors
};

class ParticipatingOrganisationForm extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCodeListItems('OrganisationRole');
    this.props.getCodeListItems('OrganisationType');
  }

  render() {
    const {handleSubmit, submitting, previousPage, activity} = this.props;

    if (!activity["OrganisationRole"] || !activity["OrganisationType"]) {
      return <GeneralLoader/>
    }

    return (
      <div>
        <div className="row controls">
          <div className="columns small-centered small-12">
            <h2 className="page-title with-tip">IATI activity</h2>
            <Tooltip className="inline" tooltip="Info text goes here"><i className="material-icons">info</i></Tooltip>
            <hr />
          </div>
        </div>
        <form onSubmit={handleSubmit} name="participatingOrganisation">
          <div className="row">
            <div className="columns small-12">
              <div className="field-list">
                <FieldArray
                  name="renderTitlesData"
                  component={renderParticipatingOrganisation}
                  roleOptions={activity["OrganisationRole"]}
                  typeOptions={activity["OrganisationType"]}
                  languageOptions={activity["Language"]}
                />
              </div>
            </div>
            <div className="columns small-12">
              <button type="button" className="button" onClick={previousPage}>Back to basic information</button>
              <button className="button float-right" type="submit" disabled={submitting} onClick={handleSubmit}>
                Continue to geopolitical information
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'syncValidation',
  destroyOnUnmount: false,
  validate

})(ParticipatingOrganisationForm)