import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import {Tooltip} from '../../../general/Tooltip.react.jsx'
import {Link} from 'react-router';
import {renderField} from '../../helpers/FormHelper'
import { getActivity, updateActivity } from '../../../../actions/activity'
import {publisherSelector} from '../../../../reducers/createActivity'
import {reduxForm} from  'redux-form'

import { withRouter } from 'react-router'


const validate = values => {
    const errors = {};

    if (!values.capitalSpend) {
        errors.type = 'Required'
    }
    return errors
};

class FinancialCapitalForm extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Submit financial's capital data and redirect to status form.
     *
     * @param formData
     */
    handleFormSubmit(formData) {
        const {activityId, publisher} = this.props;
        console.log('<<<formData', formData);

        this.props.updateActivity(publisher.id, {
            id: activityId,
            ...formData.activity,
        });

        this.props.router.push(`/publisher/activities/${activityId}/document-link/document-link`)
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.activityId !== nextProps.activityId || this.props.publisher !== nextProps.publisher)
        if (this.props.activityId &&  this.props.publisher) {
            this.props.getActivity(nextProps.publisher.id, nextProps.activityId)
        }
    }

    render() {
        const {handleSubmit, submitting, activityId} = this.props;

        return (
            <div>
                <div className="columns small-centered small-12">
                    <h2 className="page-title with-tip">Status</h2>
                    <Tooltip className="inline" tooltip="Description text goes here">
                        <i className="material-icons">info</i>
                    </Tooltip>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className="field-list">
                            <div className=""><h6>Capital Spend</h6></div>
                            <div className="row no-margin">
                                <div className="columns small-6">
                                    <Field
                                        name="activity.capital_spend.percentage"
                                        type="number"
                                        component={renderField}
                                        label="Capital Spend"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="columns small-12">
                            <Link className="button" to={`/publisher/activities/${activityId}/financial/transaction`}>
                                Back to transaction
                            </Link>
                            <button className="button float-right" type="submit" disabled={submitting}>
                                Continue to documents
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

FinancialCapitalForm = reduxForm({
    form: 'financial-capital-form',     // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate
})(FinancialCapitalForm);


function mapStateToProps(state, props) {
    const {activityId} = props;
    let currentActivity = state.activity.activity && state.activity.activity[activityId];
    console.log('<<currentActivity', currentActivity);

    return {
        submitting: state.activity.submitting,
        activity: state.activity.activity,
        initialValues: {"activity": currentActivity},  // populate initial values for redux form
        publisher: publisherSelector(state),
    }
}

FinancialCapitalForm = connect(mapStateToProps, {
    getActivity,
    updateActivity,
})(FinancialCapitalForm);

export default withRouter(FinancialCapitalForm)

