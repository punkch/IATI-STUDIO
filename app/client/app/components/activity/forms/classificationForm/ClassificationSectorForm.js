import React, {Component, PropTypes} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {renderNarrativeFields, renderField, renderSelectField} from '../../helpers/FormHelper'
import {GeneralLoader} from '../../../general/Loaders.react.jsx'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getCodeListItems, getSectors, createSector, updateSector, deleteSector} from '../../../../actions/activity'
import handleSubmit from '../../helpers/handleSubmit'
import {sectorsSelector, publisherSelector} from '../../../../reducers/createActivity.js'
import {withRouter} from 'react-router'

const renderSector = ({fields, languageOptions, sectorVocabularyOptions, sectorOptions, meta: {touched, error, dirty}}) => {
    if (!fields.length && !dirty) {
        fields.push({})
    }
    return (
        <div>
            {fields.map((sector, index) =>
                <div key={index}>
                    <div className="field-list">
                        <div className="row no-margin">
                            <Field
                                component={renderSelectField}
                                name={`${sector}.vocabulary[code]`}
                                textName={`${sector}.vocabulary[code]`}
                                label="Sector vocabulary"
                                selectOptions={sectorVocabularyOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${sector}.vocabulary_uri`}
                                    textName={`${sector}.vocabulary_uri`}
                                    type="url"
                                    component={renderField}
                                    label="Vocabulary URI"
                                />
                            </div>
                            <Field
                                component={renderSelectField}
                                name={`${sector}.sector[code]`}
                                textName={`${sector}.sector[code]`}
                                label="Sector"
                                selectOptions={sectorOptions}
                                defaultOption="Select one of the following options"
                            />
                            <div className="columns small-6">
                                <Field
                                    name={`${sector}.percentage`}
                                    type="number"
                                    component={renderField}
                                    label="Percentage"
                                />
                            </div>
                        </div>
                        {/* @TODO uncomment when issue #949 is fixed
                        <div className="row no-margin">
                            <FieldArray
                                name={`${sector}.narratives`}
                                component={renderNarrativeFields}
                                languageOptions={languageOptions}
                            />
                        </div>
                        */}
                    </div>
                    <div className="columns">
                        <button className="control-button add" type="button" onClick={() => fields.push({})}>Add More
                        </button>
                        <button type="button" title="Remove Title" className="control-button remove float-right"
                                onClick={() => fields.remove(index)}>Delete
                        </button>
                        {touched && error && <span className="error">{error}</span>}
                    </div>
                    <br/><br/>
                </div>
            )}
        </div>
    )
};

const validate = values => {
    const errors = {};

    const regions = values.sector || [];

    errors.sector = regions.map(regionData => {
        let sectorErrors = {};

        if (!regionData.sector) {
            sectorErrors.sector = {code: 'Required'}
        }

        if (!regionData.vocabulary) {
            sectorErrors.vocabulary = {code: 'Required'}
        }

        if (regionData.percentage && regionData.percentage > 100 || regionData.percentage < 0) {
            sectorErrors.percentage = 'Percentage should be between 0 and 100'
        }

        return sectorErrors
    });

    return errors
};

class SectorForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    /**
     * Submit geopolitical's region data and redirect to location form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, data, publisher} = this.props;
        let sectorData = formData.sector;

        sectorData = sectorData.map(function (sectorFormData) {
            if (sectorFormData.sector && sectorFormData.sector.code) {
                sectorFormData.sector.name = sectorFormData.sector.code
            }
            return sectorFormData;
        });

        handleSubmit(
            publisher.id,
            'sector',
            activityId,
            data,
            sectorData,
            this.props.createSector,
            this.props.updateSector,
            this.props.deleteSector,
        ).then((result) => {
            if (!result.error) {
                this.props.router.push(`/publisher/activities/${this.props.activityId}/classifications/policy`)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    componentWillMount() {
        this.props.getCodeListItems('SectorVocabulary');
        this.props.getCodeListItems('Sector');
        this.props.getCodeListItems('Language');
        if (this.props.publisher && this.props.publisher.id) {
            this.props.getSectors(this.props.publisher.id, this.props.activityId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const oldData = this.props.data
            const newData = nextProps.data

            // TODO: is a bug in redux-form, check https://github.com/erikras/redux-form/issues/2058 - 2016-12-22

            // change each item
            newData.forEach((d, i) => this.props.change(`sector[${i}]`, d))

            // remove any removed elements if newData < oldData
            for (let i = newData.length; i < oldData.length; i++) {
                this.props.array.remove('sector', i)
            }
        }

        if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher) {
            this.props.getSectors(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {codeLists, handleSubmit, submitting, activityId, isFetching} = this.props;

        if (!codeLists['SectorVocabulary'] || isFetching || !codeLists['Sector'] || !codeLists['Language']) {
            return <GeneralLoader />
        }

        return (
            <div className="columns small-centered small-12">
                <h2 className="page-title with-tip">Sector</h2>
                <Tooltip className="inline" tooltip="Description text goes here">
                    <i className="material-icons">info</i>
                </Tooltip>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <FieldArray
                        name="sector"
                        component={renderSector}
                        languageOptions={codeLists["Language"]}
                        sectorVocabularyOptions={codeLists["SectorVocabulary"]}
                        sectorOptions={codeLists["Sector"]}
                    />
                    <div className="columns small-12">
                        <Link className="button"
                              to={`/publisher/activities/${activityId}/geopolitical-information/location`}>Back to
                            Geopolitical</Link>
                        <button className="button float-right" type="submit" disabled={submitting}>
                            Continue to Policy
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const sector = sectorsSelector(state);
    const isFetching = state.activity.isFetching;

    return {
        data: sector,
        isFetching: isFetching,
        codeLists: state.codeLists,
        initialValues: {"sector": sector},  // populate initial values for redux form
        publisher: publisherSelector(state),
        ...props,
    }
}

SectorForm = reduxForm({
    form: 'classifications-sector',     // a unique identifier for this form
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(SectorForm);

SectorForm = connect(mapStateToProps, {
    getCodeListItems,
    getSectors,
    createSector,
    updateSector,
    deleteSector
})(SectorForm);

export default withRouter(SectorForm)
