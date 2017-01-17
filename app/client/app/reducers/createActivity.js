/*
 * Create Activity reducers
 */

import _ from 'lodash'
import { createSelector } from 'reselect'
import * as ActionTypes from '../actions/activity'

const initialState = { }

function activity(state = initialState, action) {
    // if (action.type.startsWith('REQUEST')) {
    //     return { ...state, submitting: true, }
    // }
    switch (action.type) {
        // case ActionTypes.GET_CODE_LIST_ITEMS_SUCCESS:
        //     return Object.assign({}, state, {
        //         [action.extra]: action.response
        //     });
        case ActionTypes.GET_ACTIVITY_SUCCESS:
        case ActionTypes.CREATE_ACTIVITY_SUCCESS:
        case ActionTypes.GET_DESCRIPTIONS_SUCCESS:
        case ActionTypes.CREATE_DESCRIPTION_SUCCESS:
        case ActionTypes.UPDATE_DESCRIPTION_SUCCESS:
        case ActionTypes.CREATE_DATE_SUCCESS:
        case ActionTypes.UPDATE_DATE_SUCCESS:
        case ActionTypes.GET_STATUS_SUCCESS:
        case ActionTypes.CREATE_STATUS_SUCCESS:
        case ActionTypes.UPDATE_STATUS_SUCCESS:
        case ActionTypes.CREATE_CONTACT_SUCCESS:
        case ActionTypes.UPDATE_CONTACT_SUCCESS:
        case ActionTypes.GET_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.CREATE_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.UPDATE_DOCUMENT_LINK_SUCCESS:
        case ActionTypes.GET_PARTICIPATING_ORGANISATIONS_SUCCESS:
        case ActionTypes.CREATE_PARTICIPATING_ORGANISATION_SUCCESS:
        case ActionTypes.UPDATE_PARTICIPATING_ORGANISATION_SUCCESS:
        case ActionTypes.GET_RECIPIENT_COUNTRIES_SUCCESS:
        case ActionTypes.CREATE_RECIPIENT_COUNTRY_SUCCESS:
        case ActionTypes.UPDATE_RECIPIENT_COUNTRY_SUCCESS:
        case ActionTypes.CREATE_REGION_SUCCESS:
        case ActionTypes.UPDATE_REGION_SUCCESS:
        case ActionTypes.UPDATE_ACTIVITY_SUCCESS:
                return _.merge({}, state, action.response.entities)

        case ActionTypes.DELETE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'descriptions': _.omit(state.descriptions, action.id),
            }
        case ActionTypes.DELETE_PARTICIPATING_ORGANISATION_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'participatingOrganisations': _.omit(state.participatingOrganisations, action.id),
            }
        case ActionTypes.DELETE_RECIPIENT_COUNTRY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'recipientCountries': _.omit(state.recipientCountries, action.id),
            }
        case ActionTypes.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                ...state.entities,
                'activity': {},
            }

        case ActionTypes.ADD_BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
            // case ActionTypes.ADD_DOCUMENT_LINK_REQUEST:
        case ActionTypes.ADD_DOCUMENT_LINK_SUCCESS:
            return Object.assign({}, state, {
                activity: action.response
            });
        // case ActionTypes.ADD_DOCUMENT_LINK_FAILURE:
        default:
            return state
    }
}

export const activitiesSelector = createSelector(
    state => state.entities.activities,
    (activities) => _.map(activities, x => x) // to array
)

export const publisherSelector = createSelector(
    /*
     * Select the publisher object from the first admin_group (if the user is in one)
    */
    state => state.user.oipaUser && state.user.oipaUser.admin_groups[0] && state.user.oipaUser.admin_groups[0].publisher,
    (p) => p
)

export const descriptionsSelector = createSelector(
    state => state.activity.descriptions,
    (descriptions) => _.map(descriptions, x => x) // to array
)

export const datesSelector = createSelector(
    state => state.activity.dates,
    (dates) => _.map(dates, x => x) // to array
)

export const contactsSelector = createSelector(
    state => state.activity.contact_info,
    (contact_info) => _.map(contact_info, x => x) // to array
)

export const statusSelector = createSelector(
    state => state.activity.activity_status,
    (activity_status) => _.map(activity_status, x => x) // to array
)

export const budgetsSelector = createSelector(
    state => state.activity.budgets,
    (budgets) => _.map(budgets, x => x) // to array
)

export const capitalSelector = createSelector(
    state => state.activity.capitals,
    (capitals) => _.map(capitals, x => x) // to array
)

export const transactionsSelector = createSelector(
    state => state.activity.transactions,
    (transactions) => _.map(transactions, x => x) // to array
)

export const plannedDisbursementsSelector = createSelector(
    state => state.activity.plannedDisbursements,
    (plannedDisbursements) => _.map(plannedDisbursements, x => x) // to array
)

export const documentLinksSelector = createSelector(
    state => state.activity.documentLink,
    (documentLink) => _.map(documentLink, x => x) // to array
)

export const policySelector = createSelector(
    state => state.activity.policy,
    (policy) => _.map(policy, x => x) // to array
)

export const locationsSelector = createSelector(
    state => state.activity.locations,
    (locations) => _.map(locations, x => x)  // to array
)

export const regionsSelector = createSelector(
    state => state.activity.recipient_region,
    (recipient_region) => _.map(recipient_region, x => x) // to array
)

export const humanitarianScopesSelector = createSelector(
    state => state.activity.humanitarianScopes,
    (humanitarianScopes) => _.map(humanitarianScopes, x => x) // to array
)

export const participatingOrganisationsSelector = createSelector(
    state => state.activity.participatingOrganisations,
    (participatingOrganisations) => _.map(participatingOrganisations, x => x) // to array
)

export const recipientCountriesSelector = createSelector(
    state => state.activity.recipientCountries,
    (recipient_countries) => _.map(recipient_countries, x => x) // to array
)

export const relationsSelector = createSelector(
    state => state.activity.relations,
    (relations) => _.map(relations, x => x) // to array
)

export default activity
