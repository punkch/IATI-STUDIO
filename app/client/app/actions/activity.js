/*
 * Async actions
 */

import {CALL_API} from '../middleware/api'
import {arrayOf} from 'normalizr'
import * as Schemas from '../schemas'
import _ from 'lodash'

/*
 * Get x activities 
 */
export const GET_ACTIVITIES_REQUEST = 'GET_ACTIVITIES_REQUEST';
export const GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAILURE = 'GET_ACTIVITIES_FAILURE';

export function fetchActivities(publisherId, filters={}, nextPage=1, reset) {
    return {
        filters,
        pageCount: nextPage,
        reset,
        [CALL_API]: {
            types: [GET_ACTIVITIES_REQUEST, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_FAILURE],
            endpoint: 'Activity.getAll',
            schema: {
                results: arrayOf(Schemas.activity),
            },
            payload: [publisherId, filters, nextPage]
        }
    }
}

/*
/*
 * Get activities (paginated)
 */
export const getActivities = (publisherId, searchValue) => (dispatch, getState) => {
    const {
        pageCount = 1,
        next,
    } = getState().pagination.activities

    if (pageCount !== 1 && !next) {
        return null
    }

    //console.log('reached...');

    return dispatch(fetchActivities(publisherId, searchValue, pageCount, false))
}

/*
 * A new search (resets pagination)
 */
export const filterActivities = (publisherId, filter) => (dispatch) => {
    return dispatch(fetchActivities(publisherId, filter, 1, true))
}


export const GET_MODIFIED_ACTIVITIES_REQUEST = 'GET_MODIFIED_ACTIVITIES_REQUEST';
export const GET_MODIFIED_ACTIVITIES_SUCCESS = 'GET_MODIFIED_ACTIVITIES_SUCCESS';
export const GET_MODIFIED_ACTIVITIES_FAILURE = 'GET_MODIFIED_ACTIVITIES_FAILURE';
export function getModifiedActivities(publisherId) {
    return {
        [CALL_API]: {
            types: [GET_MODIFIED_ACTIVITIES_REQUEST, GET_MODIFIED_ACTIVITIES_SUCCESS, GET_MODIFIED_ACTIVITIES_FAILURE],
            endpoint: 'Activity.getModified',
            // schema: {
            //     results: arrayOf(Schemas.activity),
            // },
            payload: [ publisherId ]
        }
    }
}

export const GET_READY_TO_PUBLISH_ACTIVITIES_REQUEST = 'GET_READY_TO_PUBLISH_ACTIVITIES_REQUEST';
export const GET_READY_TO_PUBLISH_ACTIVITIES_SUCCESS = 'GET_READY_TO_PUBLISH_ACTIVITIES_SUCCESS';
export const GET_READY_TO_PUBLISH_ACTIVITIES_FAILURE = 'GET_READY_TO_PUBLISH_ACTIVITIES_FAILURE';
export function getReadyToPublishActivities(publisherId) {
    return {
        [CALL_API]: {
            types: [GET_READY_TO_PUBLISH_ACTIVITIES_REQUEST, GET_READY_TO_PUBLISH_ACTIVITIES_SUCCESS, GET_READY_TO_PUBLISH_ACTIVITIES_FAILURE],
            endpoint: 'Activity.getReadyToPublish',
            // schema: {
            //     results: arrayOf(Schemas.activity),
            // },
            payload: [ publisherId ]
        }
    }
}

/*
 * Get activity (Identification form)
 */
export const GET_ACTIVITY_REQUEST = 'GET_ACTIVITY_REQUEST';
export const GET_ACTIVITY_SUCCESS = 'GET_ACTIVITY_SUCCESS';
export const GET_ACTIVITY_FAILURE = 'GET_ACTIVITY_FAILURE';

export function getActivity(publisherId, id) {
    return {
        [CALL_API]: {
            types: [GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE],
            endpoint: 'Activity.get',
            payload: [publisherId, id],
            schema: Schemas.activity,
        }
    }
}

/*
 * Create activity (Identification form)
 */
export const CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST';
export const CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS';
export const CREATE_ACTIVITY_FAILURE = 'CREATE_ACTIVITY_FAILURE';
export function createActivity(publisherId, activity) {
    return {
        [CALL_API]: {
            types: [CREATE_ACTIVITY_REQUEST, CREATE_ACTIVITY_SUCCESS, CREATE_ACTIVITY_FAILURE],
            endpoint: 'Activity.create',
            payload: [publisherId, activity],
            schema: Schemas.activity,
        }
    }
}

/*
 * Update activity (Identification form)
 */
export const UPDATE_ACTIVITY_REQUEST = 'UPDATE_ACTIVITY_REQUEST';
export const UPDATE_ACTIVITY_SUCCESS = 'UPDATE_ACTIVITY_SUCCESS';
export const UPDATE_ACTIVITY_FAILURE = 'UPDATE_ACTIVITY_FAILURE';
export function updateActivity(publisherId, activity) {
    let filterActivity = _.omitBy(activity, _.isNil);

    if (filterActivity.legacy_data && filterActivity.legacy_data.length > 0) {
        filterActivity.legacy_data = filterActivity.legacy_data.map(function (legacy_data) {
            legacy_data.activity = activity.id;
            return legacy_data;
        })
    }

    if (filterActivity.country_budget_items) {
        filterActivity.country_budget_items.activity = activity.id
    }

    return {
        [CALL_API]: {
            types: [UPDATE_ACTIVITY_REQUEST, UPDATE_ACTIVITY_SUCCESS, UPDATE_ACTIVITY_FAILURE],
            endpoint: 'Activity.update',
            payload: [publisherId, JSON.stringify(filterActivity)],
            schema: Schemas.activity,
        }
    }
}

/*
 * Delete activity (Identification form)
 */
export const DELETE_ACTIVITY_REQUEST = 'DELETE_ACTIVITY_REQUEST';
export const DELETE_ACTIVITY_SUCCESS = 'DELETE_ACTIVITY_SUCCESS';
export const DELETE_ACTIVITY_FAILURE = 'DELETE_ACTIVITY_FAILURE';
export function deleteActivity(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_ACTIVITY_REQUEST, DELETE_ACTIVITY_SUCCESS, DELETE_ACTIVITY_FAILURE],
            endpoint: 'Activity.delete',
            payload: [publisherId, id],
        }
    }
}

/*
 * MarkReadyToPublish activity (Identification form)
 */
export const MARK_READY_TO_PUBLISH_ACTIVITY_REQUEST = 'MARK_READY_TO_PUBLISH_ACTIVITY_REQUEST';
export const MARK_READY_TO_PUBLISH_ACTIVITY_SUCCESS = 'MARK_READY_TO_PUBLISH_ACTIVITY_SUCCESS';
export const MARK_READY_TO_PUBLISH_ACTIVITY_FAILURE = 'MARK_READY_TO_PUBLISH_ACTIVITY_FAILURE';
export function markReadyToPublishActivity(publisherId, id) {
    return {
        id,
        [CALL_API]: {
            types: [MARK_READY_TO_PUBLISH_ACTIVITY_REQUEST, MARK_READY_TO_PUBLISH_ACTIVITY_SUCCESS, MARK_READY_TO_PUBLISH_ACTIVITY_FAILURE],
            endpoint: 'Activity.markReadyToPublish',
            payload: [publisherId, id],
        }
    }
}

/*
 * Get descriptions (Identification form)
 */
export const GET_DESCRIPTIONS_REQUEST = 'GET_DESCRIPTIONS_REQUEST';
export const GET_DESCRIPTIONS_SUCCESS = 'GET_DESCRIPTIONS_SUCCESS';
export const GET_DESCRIPTIONS_FAILURE = 'GET_DESCRIPTIONS_FAILURE';

export function getDescriptions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_DESCRIPTIONS_REQUEST, GET_DESCRIPTIONS_SUCCESS, GET_DESCRIPTIONS_FAILURE],
            endpoint: 'Activity.getDescriptions',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.description),
        }
    }
}

/*
 * Create description (Identification form)
 */
export const CREATE_DESCRIPTION_REQUEST = 'CREATE_DESCRIPTION_REQUEST';
export const CREATE_DESCRIPTION_SUCCESS = 'CREATE_DESCRIPTION_SUCCESS';
export const CREATE_DESCRIPTION_FAILURE = 'CREATE_DESCRIPTION_FAILURE';
export function createDescription(publisherId, activityId, description) {
    return {
        [CALL_API]: {
            types: [CREATE_DESCRIPTION_REQUEST, CREATE_DESCRIPTION_SUCCESS, CREATE_DESCRIPTION_FAILURE],
            endpoint: 'Activity.createDescription',
            payload: [publisherId, activityId, JSON.stringify(description)],
            schema: Schemas.description,
        }
    }
}

/*
 * Update description (Identification form)
 */
export const UPDATE_DESCRIPTION_REQUEST = 'UPDATE_DESCRIPTION_REQUEST';
export const UPDATE_DESCRIPTION_SUCCESS = 'UPDATE_DESCRIPTION_SUCCESS';
export const UPDATE_DESCRIPTION_FAILURE = 'UPDATE_DESCRIPTION_FAILURE';
export function updateDescription(publisherId, activityId, id, description) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_DESCRIPTION_REQUEST, UPDATE_DESCRIPTION_SUCCESS, UPDATE_DESCRIPTION_FAILURE],
            endpoint: 'Activity.updateDescription',
            payload: [publisherId, activityId, id, JSON.stringify(description)],
            schema: Schemas.description,
        }
    }
}


/*
 * Delete description (Identification form)
 */
export const DELETE_DESCRIPTION_REQUEST = 'DELETE_DESCRIPTION_REQUEST';
export const DELETE_DESCRIPTION_SUCCESS = 'DELETE_DESCRIPTION_SUCCESS';
export const DELETE_DESCRIPTION_FAILURE = 'DELETE_DESCRIPTION_FAILURE';
export function deleteDescription(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_DESCRIPTION_REQUEST, DELETE_DESCRIPTION_SUCCESS, DELETE_DESCRIPTION_FAILURE],
            endpoint: 'Activity.deleteDescription',
            payload: [publisherId, activityId, id]
        }
    }
}


/*
 * Create date (BasicInformation form)
 */
export const CREATE_DATE_REQUEST = 'CREATE_DATE_REQUEST';
export const CREATE_DATE_SUCCESS = 'CREATE_DATE_SUCCESS';
export const CREATE_DATE_FAILURE = 'CREATE_DATE_FAILURE';
export function createDate(publisherId, activityId, date) {
    return {
        [CALL_API]: {
            types: [CREATE_DATE_REQUEST, CREATE_DATE_SUCCESS, CREATE_DATE_FAILURE],
            endpoint: 'Activity.createDate',
            payload: [publisherId, activityId, JSON.stringify(date)],
            schema: Schemas.date,
        }
    }
}

/*
 * Update Date (BasicInformation form)
 */
export const UPDATE_DATE_REQUEST = 'UPDATE_DATE_REQUEST';
export const UPDATE_DATE_SUCCESS = 'UPDATE_DATE_SUCCESS';
export const UPDATE_DATE_FAILURE = 'UPDATE_DATE_FAILURE';
export function updateDate(publisherId, activityId, id, date) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_DATE_REQUEST, UPDATE_DATE_SUCCESS, UPDATE_DATE_FAILURE],
            endpoint: 'Activity.updateDate',
            payload: [publisherId, activityId, id, JSON.stringify(date)],
            schema: Schemas.date,
        }
    }
}


/*
 * Delete date (BasicInformation form)
 */
export const DELETE_DATE_REQUEST = 'DELETE_DATE_REQUEST';
export const DELETE_DATE_SUCCESS = 'DELETE_DATE_SUCCESS';
export const DELETE_DATE_FAILURE = 'DELETE_DATE_FAILURE';
export function deleteDate(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_DATE_REQUEST, DELETE_DATE_SUCCESS, DELETE_DATE_FAILURE],
            endpoint: 'Activity.deleteDate',
            payload: [publisherId, activityId, id]
        }
    }
}


/*
 * Create contact (BasicInformation form)
 */
export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
export function createContact(publisherId, activityId, contact) {
    return {
        [CALL_API]: {
            types: [CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAILURE],
            endpoint: 'Activity.createContact',
            payload: [publisherId, activityId, JSON.stringify(contact)],
            schema: Schemas.contact,
        }
    }
}

/*
 * Update Contact (BasicInformation form)
 */
export const UPDATE_CONTACT_REQUEST = 'UPDATE_CONTACT_REQUEST';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILURE = 'UPDATE_CONTACT_FAILURE';
export function updateContact(publisherId, activityId, id, contact) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE],
            endpoint: 'Activity.updateContact',
            payload: [publisherId, activityId, id, JSON.stringify(contact)],
            schema: Schemas.contact,
        }
    }
}


/*
 * Delete Contact (BasicInformation form)
 */
export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';
export function deleteContact(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE],
            endpoint: 'Activity.deleteContact',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get Transaction (Financial form)
 */
export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST';
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS';
export const GET_TRANSACTION_FAILURE = 'GET_TRANSACTION_FAILURE';

export function getTransactions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAILURE],
            endpoint: 'Activity.getTransaction',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.transaction),
        }
    }
}

/*
 * Create transaction (Financial form)
 */
export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';
export function createTransaction(publisherId, activityId, transaction) {
    return {
        [CALL_API]: {
            types: [CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILURE],
            endpoint: 'Activity.createTransaction',
            payload: [publisherId, activityId, JSON.stringify(transaction)],
            schema: Schemas.transaction,
        }
    }
}

/*
 * Update Transaction (Financial form)
 */
export const UPDATE_TRANSACTION_REQUEST = 'UPDATE_TRANSACTION_REQUEST';
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE';
export function updateTransaction(publisherId, activityId, id, transaction) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_TRANSACTION_REQUEST, UPDATE_TRANSACTION_SUCCESS, UPDATE_TRANSACTION_FAILURE],
            endpoint: 'Activity.updateTransaction',
            payload: [publisherId, activityId, id, JSON.stringify(transaction)],
            schema: Schemas.transaction,
        }
    }
}


/*
 * Delete Transaction (Financial form)
 */
export const DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST';
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';
export function deleteTransaction(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_TRANSACTION_REQUEST, DELETE_TRANSACTION_SUCCESS, DELETE_TRANSACTION_FAILURE],
            endpoint: 'Activity.deleteTransaction',
            payload: [publisherId, activityId, id]
        }
    }
}


/*
 * Create plannedDisbursement (Financial form)
 */
export const CREATE_PLANNED_DISBURSEMENT_REQUEST = 'CREATE_PLANNED_DISBURSEMENT_REQUEST';
export const CREATE_PLANNED_DISBURSEMENT_SUCCESS = 'CREATE_PLANNED_DISBURSEMENT_SUCCESS';
export const CREATE_PLANNED_DISBURSEMENT_FAILURE = 'CREATE_PLANNED_DISBURSEMENT_FAILURE';
export function createPlannedDisbursement(publisherId, activityId, plannedDisbursement) {
    return {
        [CALL_API]: {
            types: [CREATE_PLANNED_DISBURSEMENT_REQUEST, CREATE_PLANNED_DISBURSEMENT_SUCCESS, CREATE_PLANNED_DISBURSEMENT_FAILURE],
            endpoint: 'Activity.createPlannedDisbursement',
            payload: [publisherId, activityId, JSON.stringify(plannedDisbursement)],
            schema: Schemas.plannedDisbursement,
        }
    }
}

/*
 * Update PlannedDisbursement (Financial form)
 */
export const UPDATE_PLANNED_DISBURSEMENT_REQUEST = 'UPDATE_PLANNED_DISBURSEMENT_REQUEST';
export const UPDATE_PLANNED_DISBURSEMENT_SUCCESS = 'UPDATE_PLANNED_DISBURSEMENT_SUCCESS';
export const UPDATE_PLANNED_DISBURSEMENT_FAILURE = 'UPDATE_PLANNED_DISBURSEMENT_FAILURE';
export function updatePlannedDisbursement(publisherId, activityId, id, plannedDisbursement) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_PLANNED_DISBURSEMENT_REQUEST, UPDATE_PLANNED_DISBURSEMENT_SUCCESS, UPDATE_PLANNED_DISBURSEMENT_FAILURE],
            endpoint: 'Activity.updatePlannedDisbursement',
            payload: [publisherId, activityId, id, JSON.stringify(plannedDisbursement)],
            schema: Schemas.plannedDisbursement,
        }
    }
}


/*
 * Delete PlannedDisbursement (Financial form)
 */
export const DELETE_PLANNED_DISBURSEMENT_REQUEST = 'DELETE_PLANNED_DISBURSEMENT_REQUEST';
export const DELETE_PLANNED_DISBURSEMENT_SUCCESS = 'DELETE_PLANNED_DISBURSEMENT_SUCCESS';
export const DELETE_PLANNED_DISBURSEMENT_FAILURE = 'DELETE_PLANNED_DISBURSEMENT_FAILURE';
export function deletePlannedDisbursement(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_PLANNED_DISBURSEMENT_REQUEST, DELETE_PLANNED_DISBURSEMENT_SUCCESS, DELETE_PLANNED_DISBURSEMENT_FAILURE],
            endpoint: 'Activity.deletePlannedDisbursement',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Create budget (Financial form)
 */
export const CREATE_BUDGET_REQUEST = 'CREATE_BUDGET_REQUEST';
export const CREATE_BUDGET_SUCCESS = 'CREATE_BUDGET_SUCCESS';
export const CREATE_BUDGET_FAILURE = 'CREATE_BUDGET_FAILURE';
export function createBudget(publisherId, activityId, budget) {
    return {
        [CALL_API]: {
            types: [CREATE_BUDGET_REQUEST, CREATE_BUDGET_SUCCESS, CREATE_BUDGET_FAILURE],
            endpoint: 'Activity.createBudget',
            payload: [publisherId, activityId, JSON.stringify(budget)],
            schema: Schemas.budget,
        }
    }
}

/*
 * Update Budget (Financial form)
 */
export const UPDATE_BUDGET_REQUEST = 'UPDATE_BUDGET_REQUEST';
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS';
export const UPDATE_BUDGET_FAILURE = 'UPDATE_BUDGET_FAILURE';
export function updateBudget(publisherId, activityId, id, budget) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_BUDGET_REQUEST, UPDATE_BUDGET_SUCCESS, UPDATE_BUDGET_FAILURE],
            endpoint: 'Activity.updateBudget',
            payload: [publisherId, activityId, id, JSON.stringify(budget)],
            schema: Schemas.budget,
        }
    }
}


/*
 * Delete Budget (Financial form)
 */
export const DELETE_BUDGET_REQUEST = 'DELETE_BUDGET_REQUEST';
export const DELETE_BUDGET_SUCCESS = 'DELETE_BUDGET_SUCCESS';
export const DELETE_BUDGET_FAILURE = 'DELETE_BUDGET_FAILURE';
export function deleteBudget(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_BUDGET_REQUEST, DELETE_BUDGET_SUCCESS, DELETE_BUDGET_FAILURE],
            endpoint: 'Activity.deleteBudget',
            payload: [publisherId, activityId, id]
        }
    }
}


/*
 * Get recipientCountries (Geopolitical form)
 */
export const GET_RECIPIENT_COUNTRIES_REQUEST = 'GET_RECIPIENT_COUNTRIES_REQUEST';
export const GET_RECIPIENT_COUNTRIES_SUCCESS = 'GET_RECIPIENT_COUNTRIES_SUCCESS';
export const GET_RECIPIENT_COUNTRIES_FAILURE = 'GET_RECIPIENT_COUNTRIES_FAILURE';

export function getRecipientCountries(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_RECIPIENT_COUNTRIES_REQUEST, GET_RECIPIENT_COUNTRIES_SUCCESS, GET_RECIPIENT_COUNTRIES_FAILURE],
            endpoint: 'Activity.getRecipientCountries',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.recipientCountry),
        }
    }
}

/*
 * Create recipientCountry (Geopolitical form)
 */
export const CREATE_RECIPIENT_COUNTRY_REQUEST = 'CREATE_RECIPIENT_COUNTRY_REQUEST';
export const CREATE_RECIPIENT_COUNTRY_SUCCESS = 'CREATE_RECIPIENT_COUNTRY_SUCCESS';
export const CREATE_RECIPIENT_COUNTRY_FAILURE = 'CREATE_RECIPIENT_COUNTRY_FAILURE';
export function createRecipientCountry(publisherId, activityId, recipientCountry) {
    return {
        [CALL_API]: {
            types: [CREATE_RECIPIENT_COUNTRY_REQUEST, CREATE_RECIPIENT_COUNTRY_SUCCESS, CREATE_RECIPIENT_COUNTRY_FAILURE],
            endpoint: 'Activity.createRecipientCountry',
            payload: [publisherId, activityId, JSON.stringify(recipientCountry)],
            schema: Schemas.recipientCountry,
        }
    }
}

/*
 * Update recipientCountry (Geopolitical form)
 */
export const UPDATE_RECIPIENT_COUNTRY_REQUEST = 'UPDATE_RECIPIENT_COUNTRY_REQUEST';
export const UPDATE_RECIPIENT_COUNTRY_SUCCESS = 'UPDATE_RECIPIENT_COUNTRY_SUCCESS';
export const UPDATE_RECIPIENT_COUNTRY_FAILURE = 'UPDATE_RECIPIENT_COUNTRY_FAILURE';
export function updateRecipientCountry(publisherId, activityId, id, recipientCountry) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_RECIPIENT_COUNTRY_REQUEST, UPDATE_RECIPIENT_COUNTRY_SUCCESS, UPDATE_RECIPIENT_COUNTRY_FAILURE],
            endpoint: 'Activity.updateRecipientCountry',
            payload: [publisherId, activityId, id, JSON.stringify(recipientCountry)],
            schema: Schemas.recipientCountry,
        }
    }
}


/*
 * Delete recipientCountry (Geopolitical form)
 */
export const DELETE_RECIPIENT_COUNTRY_REQUEST = 'DELETE_RECIPIENT_COUNTRY_REQUEST';
export const DELETE_RECIPIENT_COUNTRY_SUCCESS = 'DELETE_RECIPIENT_COUNTRY_SUCCESS';
export const DELETE_RECIPIENT_COUNTRY_FAILURE = 'DELETE_RECIPIENT_COUNTRY_FAILURE';
export function deleteRecipientCountry(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_RECIPIENT_COUNTRY_REQUEST, DELETE_RECIPIENT_COUNTRY_SUCCESS, DELETE_RECIPIENT_COUNTRY_FAILURE],
            endpoint: 'Activity.deleteRecipientCountry',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get Region (Geopolitical form)
 */
export const GET_REGION_REQUEST = 'GET_REGION_REQUEST';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_FAILURE = 'GET_REGION_FAILURE';

export function getRegions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_REGION_REQUEST, GET_REGION_SUCCESS, GET_REGION_FAILURE],
            endpoint: 'Activity.getRegions',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.recipientRegion),
        }
    }
}

/*
 * Create Region (Geopolitical form)
 */
export const CREATE_REGION_REQUEST = 'CREATE_REGION_REQUEST';
export const CREATE_REGION_SUCCESS = 'CREATE_REGION_SUCCESS';
export const CREATE_REGION_FAILURE = 'CREATE_REGION_FAILURE';
export function createRegion(publisherId, activityId, region) {
    return {
        [CALL_API]: {
            types: [CREATE_REGION_REQUEST, CREATE_REGION_SUCCESS, CREATE_REGION_FAILURE],
            endpoint: 'Activity.createRegion',
            payload: [publisherId, activityId, JSON.stringify(region)],
            schema: Schemas.recipientRegion,
        }
    }
}

/*
 * Update Region (Geopolitical form)
 */
export const UPDATE_REGION_REQUEST = 'UPDATE_REGION_REQUEST';
export const UPDATE_REGION_SUCCESS = 'UPDATE_REGION_SUCCESS';
export const UPDATE_REGION_FAILURE = 'UPDATE_REGION_FAILURE';
export function updateRegion(publisherId, activityId, id, region) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_REGION_REQUEST, UPDATE_REGION_SUCCESS, UPDATE_REGION_FAILURE],
            endpoint: 'Activity.updateRegion',
            payload: [publisherId, activityId, id, JSON.stringify(region)],
            schema: Schemas.recipientRegion,
        }
    }
}


/*
 * Delete Region (Geopolitical form)
 */
export const DELETE_REGION_REQUEST = 'DELETE_REGION_REQUEST';
export const DELETE_REGION_SUCCESS = 'DELETE_REGION_SUCCESS';
export const DELETE_REGION_FAILURE = 'DELETE_REGION_FAILURE';
export function deleteRegion(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_REGION_REQUEST, DELETE_REGION_SUCCESS, DELETE_REGION_FAILURE],
            endpoint: 'Activity.deleteRegion',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Create Location (Geopolitical form)
 */
export const CREATE_LOCATION_REQUEST = 'CREATE_LOCATION_REQUEST';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';
export function createLocation(publisherId, activityId, location) {
    return {
        [CALL_API]: {
            types: [CREATE_LOCATION_REQUEST, CREATE_LOCATION_SUCCESS, CREATE_LOCATION_FAILURE],
            endpoint: 'Activity.createLocation',
            payload: [publisherId, activityId, JSON.stringify(location)],
            schema: Schemas.location,
        }
    }
}

/*
 * Update Location (Geopolitical form)
 */
export const UPDATE_LOCATION_REQUEST = 'UPDATE_LOCATION_REQUEST';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAILURE = 'UPDATE_LOCATION_FAILURE';
export function updateLocation(publisherId, activityId, id, location) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_LOCATION_REQUEST, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILURE],
            endpoint: 'Activity.updateLocation',
            payload: [publisherId, activityId, id, JSON.stringify(location)],
            schema: Schemas.location,
        }
    }
}


/*
 * Delete Location (Geopolitical form)
 */
export const DELETE_LOCATION_REQUEST = 'DELETE_LOCATION_REQUEST';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_FAILURE = 'DELETE_LOCATION_FAILURE';
export function deleteLocation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_LOCATION_REQUEST, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_FAILURE],
            endpoint: 'Activity.deleteLocation',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get Sector (Classifications form)
 */
export const GET_SECTOR_REQUEST = 'GET_SECTOR_REQUEST';
export const GET_SECTOR_SUCCESS = 'GET_SECTOR_SUCCESS';
export const GET_SECTOR_FAILURE = 'GET_SECTOR_FAILURE';

export function getSectors(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_SECTOR_REQUEST, GET_SECTOR_SUCCESS, GET_SECTOR_FAILURE],
            endpoint: 'Activity.getSectors',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.sector),
        }
    }
}

/*
 * Create Sector (Classifications form)
 */
export const CREATE_SECTOR_REQUEST = 'CREATE_SECTOR_REQUEST';
export const CREATE_SECTOR_SUCCESS = 'CREATE_SECTOR_SUCCESS';
export const CREATE_SECTOR_FAILURE = 'CREATE_SECTOR_FAILURE';
export function createSector(publisherId, activityId, sector) {
    return {
        [CALL_API]: {
            types: [CREATE_SECTOR_REQUEST, CREATE_SECTOR_SUCCESS, CREATE_SECTOR_FAILURE],
            endpoint: 'Activity.createSector',
            payload: [publisherId, activityId, JSON.stringify(sector)],
            schema: Schemas.sector,
        }
    }
}

/*
 * Update Sector (Classifications form)
 */
export const UPDATE_SECTOR_REQUEST = 'UPDATE_SECTOR_REQUEST';
export const UPDATE_SECTOR_SUCCESS = 'UPDATE_SECTOR_SUCCESS';
export const UPDATE_SECTOR_FAILURE = 'UPDATE_SECTOR_FAILURE';
export function updateSector(publisherId, activityId, id, sector) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_SECTOR_REQUEST, UPDATE_SECTOR_SUCCESS, UPDATE_SECTOR_FAILURE],
            endpoint: 'Activity.updateSector',
            payload: [publisherId, activityId, id, JSON.stringify(sector)],
            schema: Schemas.sector,
        }
    }
}


/*
 * Delete Sector (Geopolitical form)
 */
export const DELETE_SECTOR_REQUEST = 'DELETE_SECTOR_REQUEST';
export const DELETE_SECTOR_SUCCESS = 'DELETE_SECTOR_SUCCESS';
export const DELETE_SECTOR_FAILURE = 'DELETE_SECTOR_FAILURE';
export function deleteSector(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_SECTOR_REQUEST, DELETE_SECTOR_SUCCESS, DELETE_SECTOR_FAILURE],
            endpoint: 'Activity.deleteSector',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get Policy (Financial form)
 */
export const GET_POLICY_REQUEST = 'GET_POLICY_REQUEST';
export const GET_POLICY_SUCCESS = 'GET_POLICY_SUCCESS';
export const GET_POLICY_FAILURE = 'GET_POLICY_FAILURE';

export function getPolicy(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_POLICY_REQUEST, GET_POLICY_SUCCESS, GET_POLICY_FAILURE],
            endpoint: 'Activity.getPolicy',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.policyMarker),
        }
    }
}

/*
 * Create policy (Financial form)
 */
export const CREATE_POLICY_REQUEST = 'CREATE_POLICY_REQUEST';
export const CREATE_POLICY_SUCCESS = 'CREATE_POLICY_SUCCESS';
export const CREATE_POLICY_FAILURE = 'CREATE_POLICY_FAILURE';
export function createPolicy(publisherId, activityId, policy) {
    return {
        [CALL_API]: {
            types: [CREATE_POLICY_REQUEST, CREATE_POLICY_SUCCESS, CREATE_POLICY_FAILURE],
            endpoint: 'Activity.createPolicy',
            payload: [publisherId, activityId, JSON.stringify(policy)],
            schema: Schemas.policyMarker,
        }
    }
}

/*
 * Update Policy (Financial form)
 */
export const UPDATE_POLICY_REQUEST = 'UPDATE_POLICY_REQUEST';
export const UPDATE_POLICY_SUCCESS = 'UPDATE_POLICY_SUCCESS';
export const UPDATE_POLICY_FAILURE = 'UPDATE_POLICY_FAILURE';
export function updatePolicy(publisherId, activityId, id, policy) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_POLICY_REQUEST, UPDATE_POLICY_SUCCESS, UPDATE_POLICY_FAILURE],
            endpoint: 'Activity.updatePolicy',
            payload: [publisherId, activityId, id, JSON.stringify(policy)],
            schema: Schemas.policyMarker,
        }
    }
}


/*
 * Delete Policy (Financial form)
 */
export const DELETE_POLICY_REQUEST = 'DELETE_POLICY_REQUEST';
export const DELETE_POLICY_SUCCESS = 'DELETE_POLICY_SUCCESS';
export const DELETE_POLICY_FAILURE = 'DELETE_POLICY_FAILURE';
export function deletePolicy(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_POLICY_REQUEST, DELETE_POLICY_SUCCESS, DELETE_POLICY_FAILURE],
            endpoint: 'Activity.deletePolicy',
            payload: [publisherId, activityId, id]
        }
    }
}

export const GET_CODE_LIST_ITEMS_REQUEST = 'GET_CODE_LIST_ITEMS_REQUEST';
export const GET_CODE_LIST_ITEMS_SUCCESS = 'GET_CODE_LIST_ITEMS_SUCCESS';
export const GET_CODE_LIST_ITEMS_FAILURE = 'GET_CODE_LIST_ITEMS_FAILURE';

/**
 * Get items from code list
 *
 * @param {string} codeListType
 * @returns {{}}
 */
export function getCodeListItems(codeListType) {
    return {
        [CALL_API]: {
            types: [GET_CODE_LIST_ITEMS_REQUEST, GET_CODE_LIST_ITEMS_SUCCESS, GET_CODE_LIST_ITEMS_FAILURE],
            endpoint: 'Activity.getCodeListItems',
            payload: [codeListType],
            extra: codeListType
        }
    }
}

/*
 * Get participating_organisations (Identification form)
 */
export const GET_PARTICIPATING_ORGANISATIONS_REQUEST = 'GET_PARTICIPATING_ORGANISATIONS_REQUEST';
export const GET_PARTICIPATING_ORGANISATIONS_SUCCESS = 'GET_PARTICIPATING_ORGANISATIONS_SUCCESS';
export const GET_PARTICIPATING_ORGANISATIONS_FAILURE = 'GET_PARTICIPATING_ORGANISATIONS_FAILURE';

export function getParticipatingOrganisations(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_PARTICIPATING_ORGANISATIONS_REQUEST, GET_PARTICIPATING_ORGANISATIONS_SUCCESS, GET_PARTICIPATING_ORGANISATIONS_FAILURE],
            endpoint: 'Activity.getParticipatingOrganisations',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.participatingOrganisation),
        }
    }
}

/*
 * Create participating_organisation (Identification form)
 */
export const CREATE_PARTICIPATING_ORGANISATION_REQUEST = 'CREATE_PARTICIPATING_ORGANISATION_REQUEST';
export const CREATE_PARTICIPATING_ORGANISATION_SUCCESS = 'CREATE_PARTICIPATING_ORGANISATION_SUCCESS';
export const CREATE_PARTICIPATING_ORGANISATION_FAILURE = 'CREATE_PARTICIPATING_ORGANISATION_FAILURE';
export function createParticipatingOrganisation(publisherId, activityId, participating_organisation) {
    return {
        [CALL_API]: {
            types: [CREATE_PARTICIPATING_ORGANISATION_REQUEST, CREATE_PARTICIPATING_ORGANISATION_SUCCESS, CREATE_PARTICIPATING_ORGANISATION_FAILURE],
            endpoint: 'Activity.createParticipatingOrganisation',
            payload: [publisherId, activityId, JSON.stringify(participating_organisation)],
            schema: Schemas.participatingOrganisation,
        }
    }
}

/*
 * Update participating_organisation (Identification form)
 */
export const UPDATE_PARTICIPATING_ORGANISATION_REQUEST = 'UPDATE_PARTICIPATING_ORGANISATION_REQUEST';
export const UPDATE_PARTICIPATING_ORGANISATION_SUCCESS = 'UPDATE_PARTICIPATING_ORGANISATION_SUCCESS';
export const UPDATE_PARTICIPATING_ORGANISATION_FAILURE = 'UPDATE_PARTICIPATING_ORGANISATION_FAILURE';
export function updateParticipatingOrganisation(publisherId, activityId, id, participating_organisation) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_PARTICIPATING_ORGANISATION_REQUEST, UPDATE_PARTICIPATING_ORGANISATION_SUCCESS, UPDATE_PARTICIPATING_ORGANISATION_FAILURE],
            endpoint: 'Activity.updateParticipatingOrganisation',
            payload: [publisherId, activityId, id, JSON.stringify(participating_organisation)],
            schema: Schemas.participatingOrganisation,
        }
    }
}


/*
 * Delete participating_organisation (Identification form)
 */
export const DELETE_PARTICIPATING_ORGANISATION_REQUEST = 'DELETE_PARTICIPATING_ORGANISATION_REQUEST';
export const DELETE_PARTICIPATING_ORGANISATION_SUCCESS = 'DELETE_PARTICIPATING_ORGANISATION_SUCCESS';
export const DELETE_PARTICIPATING_ORGANISATION_FAILURE = 'DELETE_PARTICIPATING_ORGANISATION_FAILURE';
export function deleteParticipatingOrganisation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_PARTICIPATING_ORGANISATION_REQUEST, DELETE_PARTICIPATING_ORGANISATION_SUCCESS, DELETE_PARTICIPATING_ORGANISATION_FAILURE],
            endpoint: 'Activity.deleteParticipatingOrganisation',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get DocumentLink
 */
export const GET_DOCUMENT_LINK_REQUEST = 'GET_DOCUMENT_LINK_REQUEST';
export const GET_DOCUMENT_LINK_SUCCESS = 'GET_DOCUMENT_LINK_SUCCESS';
export const GET_DOCUMENT_LINK_FAILURE = 'GET_DOCUMENT_LINK_FAILURE';

export function getDocumentLinks(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_DOCUMENT_LINK_REQUEST, GET_DOCUMENT_LINK_SUCCESS, GET_DOCUMENT_LINK_FAILURE],
            endpoint: 'Activity.getDocumentLinks',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.documentLink),
        }
    }
}

/*
 * Create DocumentLink
 */
export const CREATE_DOCUMENT_LINK_REQUEST = 'CREATE_DOCUMENT_LINK_REQUEST';
export const CREATE_DOCUMENT_LINK_SUCCESS = 'CREATE_DOCUMENT_LINK_SUCCESS';
export const CREATE_DOCUMENT_LINK_FAILURE = 'CREATE_DOCUMENT_LINK_FAILURE';
export function createDocumentLink(publisherId, activityId, documentLink) {
    return {
        [CALL_API]: {
            types: [CREATE_DOCUMENT_LINK_REQUEST, CREATE_DOCUMENT_LINK_SUCCESS, CREATE_DOCUMENT_LINK_FAILURE],
            endpoint: 'Activity.createDocumentLink',
            payload: [publisherId, activityId, JSON.stringify(documentLink)],
            schema: Schemas.documentLink,
        }
    }
}

/*
 * Update DocumentLink
 */
export const UPDATE_DOCUMENT_LINK_REQUEST = 'UPDATE_DOCUMENT_LINK_REQUEST';
export const UPDATE_DOCUMENT_LINK_SUCCESS = 'UPDATE_DOCUMENT_LINK_SUCCESS';
export const UPDATE_DOCUMENT_LINK_FAILURE = 'UPDATE_DOCUMENT_LINK_FAILURE';
export function updateDocumentLink(publisherId, activityId, id, documentLink) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_DOCUMENT_LINK_REQUEST, UPDATE_DOCUMENT_LINK_SUCCESS, UPDATE_DOCUMENT_LINK_FAILURE],
            endpoint: 'Activity.updateDocumentLink',
            payload: [publisherId, activityId, id, JSON.stringify(documentLink)],
            schema: Schemas.documentLink,
        }
    }
}


/*
 * Delete DocumentLink
 */
export const DELETE_DOCUMENT_LINK_REQUEST = 'DELETE_DOCUMENT_LINK_REQUEST';
export const DELETE_DOCUMENT_LINK_SUCCESS = 'DELETE_DOCUMENT_LINK_SUCCESS';
export const DELETE_DOCUMENT_LINK_FAILURE = 'DELETE_DOCUMENT_LINK_FAILURE';
export function deleteDocumentLink(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_DOCUMENT_LINK_REQUEST, DELETE_DOCUMENT_LINK_SUCCESS, DELETE_DOCUMENT_LINK_FAILURE],
            endpoint: 'Activity.deleteDocumentLink',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get LegacyData
 */
export const GET_LEGACY_DATA_REQUEST = 'GET_LEGACY_DATA_REQUEST';
export const GET_LEGACY_DATA_SUCCESS = 'GET_LEGACY_DATA_SUCCESS';
export const GET_LEGACY_DATA_FAILURE = 'GET_LEGACY_DATA_FAILURE';

export function getLegacyData(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_LEGACY_DATA_REQUEST, GET_LEGACY_DATA_SUCCESS, GET_LEGACY_DATA_FAILURE],
            endpoint: 'Activity.getLegacyData',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.legacyData),
        }
    }
}

/*
 * Create LegacyData
 */
export const CREATE_LEGACY_DATA_REQUEST = 'CREATE_LEGACY_DATA_REQUEST';
export const CREATE_LEGACY_DATA_SUCCESS = 'CREATE_LEGACY_DATA_SUCCESS';
export const CREATE_LEGACY_DATA_FAILURE = 'CREATE_LEGACY_DATA_FAILURE';
export function createLegacyData(publisherId, activityId, legacyData) {
    return {
        [CALL_API]: {
            types: [CREATE_LEGACY_DATA_REQUEST, CREATE_LEGACY_DATA_SUCCESS, CREATE_LEGACY_DATA_FAILURE],
            endpoint: 'Activity.createLegacyData',
            payload: [publisherId, activityId, JSON.stringify(legacyData)],
            schema: Schemas.legacyData,
        }
    }
}

/*
 * Update LegacyData
 */
export const UPDATE_LEGACY_DATA_REQUEST = 'UPDATE_LEGACY_DATA_REQUEST';
export const UPDATE_LEGACY_DATA_SUCCESS = 'UPDATE_LEGACY_DATA_SUCCESS';
export const UPDATE_LEGACY_DATA_FAILURE = 'UPDATE_LEGACY_DATA_FAILURE';
export function updateLegacyData(publisherId, activityId, id, legacyData) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_LEGACY_DATA_REQUEST, UPDATE_LEGACY_DATA_SUCCESS, UPDATE_LEGACY_DATA_FAILURE],
            endpoint: 'Activity.updateLegacyData',
            payload: [publisherId, activityId, id, JSON.stringify(legacyData)],
            schema: Schemas.legacyData,
        }
    }
}


/*
 * Delete LegacyData
 */
export const DELETE_LEGACY_DATA_REQUEST = 'DELETE_LEGACY_DATA_REQUEST';
export const DELETE_LEGACY_DATA_SUCCESS = 'DELETE_LEGACY_DATA_SUCCESS';
export const DELETE_LEGACY_DATA_FAILURE = 'DELETE_LEGACY_DATA_FAILURE';
export function deleteLegacyData(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_LEGACY_DATA_REQUEST, DELETE_LEGACY_DATA_SUCCESS, DELETE_LEGACY_DATA_FAILURE],
            endpoint: 'Activity.deleteLegacyData',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Create CountryBudgetItem
 */
export const CREATE_COUNTRY_BUDGET_ITEM_REQUEST = 'CREATE_COUNTRY_BUDGET_ITEM_REQUEST';
export const CREATE_COUNTRY_BUDGET_ITEM_SUCCESS = 'CREATE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const CREATE_COUNTRY_BUDGET_ITEM_FAILURE = 'CREATE_COUNTRY_BUDGET_ITEM_FAILURE';
export function createCountryBudgetItem(publisherId, activityId, countryBudgetItem) {
    return {
        [CALL_API]: {
            types: [CREATE_COUNTRY_BUDGET_ITEM_REQUEST, CREATE_COUNTRY_BUDGET_ITEM_SUCCESS, CREATE_COUNTRY_BUDGET_ITEM_FAILURE],
            endpoint: 'Activity.createCountryBudgetItem',
            payload: [publisherId, activityId, JSON.stringify(countryBudgetItem)],
            schema: Schemas.countryBudgetItems,
        }
    }
}

/*
 * Update CountryBudgetItem
 */
export const UPDATE_COUNTRY_BUDGET_ITEM_REQUEST = 'UPDATE_COUNTRY_BUDGET_ITEM_REQUEST';
export const UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS = 'UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const UPDATE_COUNTRY_BUDGET_ITEM_FAILURE = 'UPDATE_COUNTRY_BUDGET_ITEM_FAILURE';
export function updateCountryBudgetItem(publisherId, activityId, id, countryBudgetItem) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_COUNTRY_BUDGET_ITEM_REQUEST, UPDATE_COUNTRY_BUDGET_ITEM_SUCCESS, UPDATE_COUNTRY_BUDGET_ITEM_FAILURE],
            endpoint: 'Activity.updateCountryBudgetItem',
            payload: [publisherId, activityId, id, JSON.stringify(countryBudgetItem)],
            schema: Schemas.countryBudgetItems,
        }
    }
}


/*
 * Delete CountryBudgetItem
 */
export const DELETE_COUNTRY_BUDGET_ITEM_REQUEST = 'DELETE_COUNTRY_BUDGET_ITEM_REQUEST';
export const DELETE_COUNTRY_BUDGET_ITEM_SUCCESS = 'DELETE_COUNTRY_BUDGET_ITEM_SUCCESS';
export const DELETE_COUNTRY_BUDGET_ITEM_FAILURE = 'DELETE_COUNTRY_BUDGET_ITEM_FAILURE';
export function deleteCountryBudgetItem(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_COUNTRY_BUDGET_ITEM_REQUEST, DELETE_COUNTRY_BUDGET_ITEM_SUCCESS, DELETE_COUNTRY_BUDGET_ITEM_FAILURE],
            endpoint: 'Activity.deleteCountryBudgetItem',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get HumanitariansScope
 */
export const GET_HUMANITARIAN_SCOPE_REQUEST = 'GET_HUMANITARIAN_SCOPE_REQUEST';
export const GET_HUMANITARIAN_SCOPE_SUCCESS = 'GET_HUMANITARIAN_SCOPE_SUCCESS';
export const GET_HUMANITARIAN_SCOPE_FAILURE = 'GET_HUMANITARIAN_SCOPE_FAILURE';

export function getHumanitarianScopes(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_HUMANITARIAN_SCOPE_REQUEST, GET_HUMANITARIAN_SCOPE_SUCCESS, GET_HUMANITARIAN_SCOPE_FAILURE],
            endpoint: 'Activity.getHumanitarianScope',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.humanitarianScope),
        }
    }
}

/*
 * Create HumanitarianScope
 */
export const CREATE_HUMANITARIAN_SCOPE_REQUEST = 'CREATE_HUMANITARIAN_SCOPE_REQUEST';
export const CREATE_HUMANITARIAN_SCOPE_SUCCESS = 'CREATE_HUMANITARIAN_SCOPE_SUCCESS';
export const CREATE_HUMANITARIAN_SCOPE_FAILURE = 'CREATE_HUMANITARIAN_SCOPE_FAILURE';
export function createHumanitarianScope(publisherId, activityId, humanitarianScope) {
    return {
        [CALL_API]: {
            types: [CREATE_HUMANITARIAN_SCOPE_REQUEST, CREATE_HUMANITARIAN_SCOPE_SUCCESS, CREATE_HUMANITARIAN_SCOPE_FAILURE],
            endpoint: 'Activity.createHumanitarianScope',
            payload: [publisherId, activityId, JSON.stringify(humanitarianScope)],
            schema: Schemas.humanitarianScope,
        }
    }
}

/*
 * Update HumanitarianScope
 */
export const UPDATE_HUMANITARIAN_SCOPE_REQUEST = 'UPDATE_HUMANITARIAN_SCOPE_REQUEST';
export const UPDATE_HUMANITARIAN_SCOPE_SUCCESS = 'UPDATE_HUMANITARIAN_SCOPE_SUCCESS';
export const UPDATE_HUMANITARIAN_SCOPE_FAILURE = 'UPDATE_HUMANITARIAN_SCOPE_FAILURE';
export function updateHumanitarianScope(publisherId, activityId, id, humanitarianScope) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_HUMANITARIAN_SCOPE_REQUEST, UPDATE_HUMANITARIAN_SCOPE_SUCCESS, UPDATE_HUMANITARIAN_SCOPE_FAILURE],
            endpoint: 'Activity.updateHumanitarianScope',
            payload: [publisherId, activityId, id, JSON.stringify(humanitarianScope)],
            schema: Schemas.humanitarianScope,
        }
    }
}


/*
 * Delete HumanitarianScope
 */
export const DELETE_HUMANITARIAN_SCOPE_REQUEST = 'DELETE_HUMANITARIAN_SCOPE_REQUEST';
export const DELETE_HUMANITARIAN_SCOPE_SUCCESS = 'DELETE_HUMANITARIAN_SCOPE_SUCCESS';
export const DELETE_HUMANITARIAN_SCOPE_FAILURE = 'DELETE_HUMANITARIAN_SCOPE_FAILURE';
export function deleteHumanitarianScope(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_HUMANITARIAN_SCOPE_REQUEST, DELETE_HUMANITARIAN_SCOPE_SUCCESS, DELETE_HUMANITARIAN_SCOPE_FAILURE],
            endpoint: 'Activity.deleteHumanitarianScope',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get relations (Relation form)
 */
export const GET_RELATION_REQUEST = 'GET_RELATION_REQUEST';
export const GET_RELATION_SUCCESS = 'GET_RELATION_SUCCESS';
export const GET_RELATION_FAILURE = 'GET_RELATION_FAILURE';

export function getRelation(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_RELATION_REQUEST, GET_RELATION_SUCCESS, GET_RELATION_FAILURE],
            endpoint: 'Activity.getRelation',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.relatedActivities),
        }
    }
}


/*
 * Create relation (Relations form)
 */
export const CREATE_RELATION_REQUEST = 'CREATE_RELATION_REQUEST';
export const CREATE_RELATION_SUCCESS = 'CREATE_RELATION_SUCCESS';
export const CREATE_RELATION_FAILURE = 'CREATE_RELATION_FAILURE';
export function createRelation(publisherId, activityId, relationData) {
    return {
        [CALL_API]: {
            types: [CREATE_RELATION_REQUEST, CREATE_RELATION_SUCCESS, CREATE_RELATION_FAILURE],
            endpoint: 'Activity.createRelation',
            payload: [publisherId, activityId, JSON.stringify(relationData)],
            schema: Schemas.relatedActivities,
        }
    }
}

/*
 * Update relations (Relations form)
 */
export const UPDATE_RELATION_REQUEST = 'UPDATE_RELATION_REQUEST';
export const UPDATE_RELATION_SUCCESS = 'UPDATE_RELATION_SUCCESS';
export const UPDATE_RELATION_FAILURE = 'UPDATE_RELATION_FAILURE';
export function updateRelation(publisherId, activityId, id, relationData) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_RELATION_REQUEST, UPDATE_RELATION_SUCCESS, UPDATE_RELATION_FAILURE],
            endpoint: 'Activity.updateRelation',
            payload: [publisherId, activityId, id, JSON.stringify(relationData)],
            schema: Schemas.relatedActivities,
        }
    }
}


/*
 * Delete relations (Relations form)
 */
export const DELETE_RELATION_REQUEST = 'DELETE_RELATION_REQUEST';
export const DELETE_RELATION_SUCCESS = 'DELETE_RELATION_SUCCESS';
export const DELETE_RELATION_FAILURE = 'DELETE_RELATION_FAILURE';
export function deleteRelation(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_RELATION_REQUEST, DELETE_RELATION_SUCCESS, DELETE_RELATION_FAILURE],
            endpoint: 'Activity.deleteRelation',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Create performance condition (Performance condition form)
 */
export const CREATE_PERFORMANCE_CONDITION_REQUEST = 'CREATE_PERFORMANCE_CONDITION_REQUEST';
export const CREATE_PERFORMANCE_CONDITION_SUCCESS = 'CREATE_PERFORMANCE_CONDITION_SUCCESS';
export const CREATE_PERFORMANCE_CONDITION_FAILURE = 'CREATE_PERFORMANCE_CONDITION_FAILURE';
export function createPerformanceCondition(publisherId, activityId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_PERFORMANCE_CONDITION_REQUEST, CREATE_PERFORMANCE_CONDITION_SUCCESS, CREATE_PERFORMANCE_CONDITION_FAILURE],
            endpoint: 'Activity.createPerformanceCondition',
            payload: [ publisherId, activityId, data],
            schema: Schemas.condition,
        }
    }
}

/*
 * Update performance condition (Performance condition form)
 */
export const UPDATE_PERFORMANCE_CONDITION_REQUEST = 'UPDATE_PERFORMANCE_CONDITION_REQUEST';
export const UPDATE_PERFORMANCE_CONDITION_SUCCESS = 'UPDATE_PERFORMANCE_CONDITION_SUCCESS';
export const UPDATE_PERFORMANCE_CONDITION_FAILURE = 'UPDATE_PERFORMANCE_CONDITION_FAILURE';
export function updatePerformanceCondition(publisherId, activityId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_PERFORMANCE_CONDITION_REQUEST, UPDATE_PERFORMANCE_CONDITION_SUCCESS, UPDATE_PERFORMANCE_CONDITION_FAILURE],
            endpoint: 'Activity.updatePerformanceCondition',
            payload: [ publisherId, activityId, id, data],
            schema: Schemas.condition,
        }
    }
}

/*
 * Get performance condition (Performance condition form)
 */
export const GET_PERFORMANCE_CONDITIONS_REQUEST = 'GET_PERFORMANCE_CONDITIONS_REQUEST';
export const GET_PERFORMANCE_CONDITIONS_SUCCESS = 'GET_PERFORMANCE_CONDITIONS_SUCCESS';
export const GET_PERFORMANCE_CONDITIONS_FAILURE = 'GET_PERFORMANCE_CONDITIONS_FAILURE';

export function getPerformanceConditions(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_PERFORMANCE_CONDITIONS_REQUEST, GET_PERFORMANCE_CONDITIONS_SUCCESS, GET_PERFORMANCE_CONDITIONS_FAILURE],
            endpoint: 'Activity.getPerformanceConditions',
            payload: [ publisherId, activityId ],
            schema: arrayOf(Schemas.condition),
        }
    }
}

/*
 * Create performance condition (Performance condition form)
 */
export const CREATE_PERFORMANCE_CONDITIONS_REQUEST = 'CREATE_PERFORMANCE_CONDITIONS_REQUEST';
export const CREATE_PERFORMANCE_CONDITIONS_SUCCESS = 'CREATE_PERFORMANCE_CONDITIONS_SUCCESS';
export const CREATE_PERFORMANCE_CONDITIONS_FAILURE = 'CREATE_PERFORMANCE_CONDITIONS_FAILURE';
export function createPerformanceConditions(publisherId, activityId, conditionsData) {
    return {
        [CALL_API]: {
            types: [CREATE_PERFORMANCE_CONDITIONS_REQUEST, CREATE_PERFORMANCE_CONDITIONS_SUCCESS, CREATE_PERFORMANCE_CONDITIONS_FAILURE],
            endpoint: 'Activity.createPerformanceConditions',
            payload: [ publisherId, activityId, JSON.stringify(conditionsData) ],
            schema: Schemas.condition,
        }
    }
}

/*
 * Update performance condition (Performance condition form)
 */
export const UPDATE_PERFORMANCE_CONDITIONS_REQUEST = 'UPDATE_PERFORMANCE_CONDITIONS_REQUEST';
export const UPDATE_PERFORMANCE_CONDITIONS_SUCCESS = 'UPDATE_PERFORMANCE_CONDITIONS_SUCCESS';
export const UPDATE_PERFORMANCE_CONDITIONS_FAILURE = 'UPDATE_PERFORMANCE_CONDITIONS_FAILURE';
export function updatePerformanceConditions(publisherId, activityId, id, conditionsData) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_PERFORMANCE_CONDITIONS_REQUEST, UPDATE_PERFORMANCE_CONDITIONS_SUCCESS, UPDATE_PERFORMANCE_CONDITIONS_FAILURE],
            endpoint: 'Activity.updatePerformanceConditions',
            payload: [ publisherId, activityId, id, JSON.stringify(conditionsData) ],
            schema: Schemas.condition,
        }
    }
}

/*
 * Delete performance condition (Performance condition form)
 */
export const DELETE_PERFORMANCE_CONDITIONS_REQUEST = 'DELETE_PERFORMANCE_CONDITIONS_REQUEST';
export const DELETE_PERFORMANCE_CONDITIONS_SUCCESS = 'DELETE_PERFORMANCE_CONDITIONS_SUCCESS';
export const DELETE_PERFORMANCE_CONDITIONS_FAILURE = 'DELETE_PERFORMANCE_CONDITIONS_FAILURE';
export function deletePerformanceConditions(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_PERFORMANCE_CONDITIONS_REQUEST, DELETE_PERFORMANCE_CONDITIONS_SUCCESS, DELETE_PERFORMANCE_CONDITIONS_FAILURE],
            endpoint: 'Activity.deletePerformanceConditions',
            payload: [publisherId, activityId, id]
        }
    }
}

/*
 * Get performance result (Performance result form)
 */
export const GET_PERFORMANCE_RESULT_REQUEST = 'GET_PERFORMANCE_RESULT_REQUEST';
export const GET_PERFORMANCE_RESULT_SUCCESS = 'GET_PERFORMANCE_RESULT_SUCCESS';
export const GET_PERFORMANCE_RESULT_FAILURE = 'GET_PERFORMANCE_RESULT_FAILURE';

export function getPerformanceResult(publisherId, activityId) {
    return {
        [CALL_API]: {
            types: [GET_PERFORMANCE_RESULT_REQUEST, GET_PERFORMANCE_RESULT_SUCCESS, GET_PERFORMANCE_RESULT_FAILURE],
            endpoint: 'Activity.getPerformanceResult',
            payload: [publisherId, activityId],
            schema: arrayOf(Schemas.result),
        }
    }
}


/*
 * Create performance result (Performance result form)
 */
export const CREATE_PERFORMANCE_RESULT_REQUEST = 'CREATE_PERFORMANCE_RESULT_REQUEST';
export const CREATE_PERFORMANCE_RESULT_SUCCESS = 'CREATE_PERFORMANCE_RESULT_SUCCESS';
export const CREATE_PERFORMANCE_RESULT_FAILURE = 'CREATE_PERFORMANCE_RESULT_FAILURE';
export function createPerformanceResult(publisherId, activityId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_PERFORMANCE_RESULT_REQUEST, CREATE_PERFORMANCE_RESULT_SUCCESS, CREATE_PERFORMANCE_RESULT_FAILURE],
            endpoint: 'Activity.createPerformanceResult',
            payload: [publisherId, activityId, JSON.stringify(data)],
            schema: Schemas.result,
        }
    }
}

/*
 * Update performance result (Performance result form)
 */
export const UPDATE_PERFORMANCE_RESULT_REQUEST = 'UPDATE_PERFORMANCE_RESULT_REQUEST';
export const UPDATE_PERFORMANCE_RESULT_SUCCESS = 'UPDATE_PERFORMANCE_RESULT_SUCCESS';
export const UPDATE_PERFORMANCE_RESULT_FAILURE = 'UPDATE_PERFORMANCE_RESULT_FAILURE';
export function updatePerformanceResult(publisherId, activityId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_PERFORMANCE_RESULT_REQUEST, UPDATE_PERFORMANCE_RESULT_SUCCESS, UPDATE_PERFORMANCE_RESULT_FAILURE],
            endpoint: 'Activity.updatePerformanceResult',
            payload: [publisherId, activityId, id, JSON.stringify(data)],
            schema: Schemas.result,
        }
    }
}


/*
 * Delete performance result (Performance result form)
 */
export const DELETE_PERFORMANCE_RESULT_REQUEST = 'DELETE_PERFORMANCE_RESULT_REQUEST';
export const DELETE_PERFORMANCE_RESULT_SUCCESS = 'DELETE_PERFORMANCE_RESULT_SUCCESS';
export const DELETE_PERFORMANCE_RESULT_FAILURE = 'DELETE_PERFORMANCE_RESULT_FAILURE';
export function deletePerformanceResult(publisherId, activityId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_PERFORMANCE_RESULT_REQUEST, DELETE_PERFORMANCE_RESULT_SUCCESS, DELETE_PERFORMANCE_RESULT_FAILURE],
            endpoint: 'Activity.deletePerformanceResult',
            payload: [publisherId, activityId, id]
        }
    }
}


/*
 * Get  result_indicator ( result_indicator form)
 */
export const GET_RESULT_INDICATOR_REQUEST = 'GET_RESULT_INDICATOR_REQUEST';
export const GET_RESULT_INDICATOR_SUCCESS = 'GET_RESULT_INDICATOR_SUCCESS';
export const GET_RESULT_INDICATOR_FAILURE = 'GET_RESULT_INDICATOR_FAILURE';

export function getResultIndicator(publisherId, activityId, resultId) {
    return {
        [CALL_API]: {
            types: [GET_RESULT_INDICATOR_REQUEST, GET_RESULT_INDICATOR_SUCCESS, GET_RESULT_INDICATOR_FAILURE],
            endpoint: 'Activity.getResultIndicator',
            payload: [publisherId, activityId, resultId],
            schema: arrayOf(Schemas.result_indicator),
        }
    }
}

/*
 * Create  result_indicator ( result_indicator form)
 */
export const CREATE_RESULT_INDICATOR_REQUEST = 'CREATE_RESULT_INDICATOR_REQUEST';
export const CREATE_RESULT_INDICATOR_SUCCESS = 'CREATE_RESULT_INDICATOR_SUCCESS';
export const CREATE_RESULT_INDICATOR_FAILURE = 'CREATE_RESULT_INDICATOR_FAILURE';
export function createResultIndicator(publisherId, activityId, resultId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_RESULT_INDICATOR_REQUEST, CREATE_RESULT_INDICATOR_SUCCESS, CREATE_RESULT_INDICATOR_FAILURE],
            endpoint: 'Activity.createResultIndicator',
            payload: [publisherId, activityId, resultId, JSON.stringify(data)],
            schema: Schemas.result_indicator,
        }
    }
}

/*
 * Update  result_indicator ( result_indicator form)
 */
export const UPDATE_RESULT_INDICATOR_REQUEST = 'UPDATE_RESULT_INDICATOR_REQUEST';
export const UPDATE_RESULT_INDICATOR_SUCCESS = 'UPDATE_RESULT_INDICATOR_SUCCESS';
export const UPDATE_RESULT_INDICATOR_FAILURE = 'UPDATE_RESULT_INDICATOR_FAILURE';
export function updateResultIndicator(publisherId, activityId, resultId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_RESULT_INDICATOR_REQUEST, UPDATE_RESULT_INDICATOR_SUCCESS, UPDATE_RESULT_INDICATOR_FAILURE],
            endpoint: 'Activity.updateResultIndicator',
            payload: [publisherId, activityId, resultId, id, JSON.stringify(data)],
            schema: Schemas.result_indicator,
        }
    }
}


/*
 * Delete  result_indicator ( result_indicator form)
 */
export const DELETE_RESULT_INDICATOR_REQUEST = 'DELETE_RESULT_INDICATOR_REQUEST';
export const DELETE_RESULT_INDICATOR_SUCCESS = 'DELETE_RESULT_INDICATOR_SUCCESS';
export const DELETE_RESULT_INDICATOR_FAILURE = 'DELETE_RESULT_INDICATOR_FAILURE';
export function deleteResultIndicator(publisherId, activityId, resultId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_RESULT_INDICATOR_REQUEST, DELETE_RESULT_INDICATOR_SUCCESS, DELETE_RESULT_INDICATOR_FAILURE],
            endpoint: 'Activity.deleteResultIndicator',
            payload: [publisherId, activityId, resultId, id]
        }
    }
}






/*
 * Get  indicator_period ( indicator_period form)
 */
export const GET_INDICATOR_PERIOD_REQUEST = 'GET_INDICATOR_PERIOD_REQUEST';
export const GET_INDICATOR_PERIOD_SUCCESS = 'GET_INDICATOR_PERIOD_SUCCESS';
export const GET_INDICATOR_PERIOD_FAILURE = 'GET_INDICATOR_PERIOD_FAILURE';

export function getIndicatorPeriod(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_PERIOD_REQUEST, GET_INDICATOR_PERIOD_SUCCESS, GET_INDICATOR_PERIOD_FAILURE],
            endpoint: 'Activity.getIndicatorPeriod',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_period),
        }
    }
}

/*
 * Create  indicator_period ( indicator_period form)
 */
export const CREATE_INDICATOR_PERIOD_REQUEST = 'CREATE_INDICATOR_PERIOD_REQUEST';
export const CREATE_INDICATOR_PERIOD_SUCCESS = 'CREATE_INDICATOR_PERIOD_SUCCESS';
export const CREATE_INDICATOR_PERIOD_FAILURE = 'CREATE_INDICATOR_PERIOD_FAILURE';
export function createIndicatorPeriod(publisherId, activityId, resultId, indicatorId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_PERIOD_REQUEST, CREATE_INDICATOR_PERIOD_SUCCESS, CREATE_INDICATOR_PERIOD_FAILURE],
            endpoint: 'Activity.createIndicatorPeriod',
            payload: [publisherId, activityId, resultId, indicatorId, JSON.stringify(data)],
            schema: Schemas.indicator_period,
        }
    }
}

/*
 * Update  indicator_period ( indicator_period form)
 */
export const UPDATE_INDICATOR_PERIOD_REQUEST = 'UPDATE_INDICATOR_PERIOD_REQUEST';
export const UPDATE_INDICATOR_PERIOD_SUCCESS = 'UPDATE_INDICATOR_PERIOD_SUCCESS';
export const UPDATE_INDICATOR_PERIOD_FAILURE = 'UPDATE_INDICATOR_PERIOD_FAILURE';
export function updateIndicatorPeriod(publisherId, activityId, resultId, indicatorId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_PERIOD_REQUEST, UPDATE_INDICATOR_PERIOD_SUCCESS, UPDATE_INDICATOR_PERIOD_FAILURE],
            endpoint: 'Activity.updateIndicatorPeriod',
            payload: [publisherId, activityId, resultId, indicatorId, id, JSON.stringify(data)],
            schema: Schemas.indicator_period,
        }
    }
}


/*
 * Delete  indicator_period ( indicator_period form)
 */
export const DELETE_INDICATOR_PERIOD_REQUEST = 'DELETE_INDICATOR_PERIOD_REQUEST';
export const DELETE_INDICATOR_PERIOD_SUCCESS = 'DELETE_INDICATOR_PERIOD_SUCCESS';
export const DELETE_INDICATOR_PERIOD_FAILURE = 'DELETE_INDICATOR_PERIOD_FAILURE';
export function deleteIndicatorPeriod(publisherId, activityId, resultId, indicatorId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_PERIOD_REQUEST, DELETE_INDICATOR_PERIOD_SUCCESS, DELETE_INDICATOR_PERIOD_FAILURE],
            endpoint: 'Activity.deleteIndicatorPeriod',
            payload: [publisherId, activityId, resultId, indicatorId, id]
        }
    }
}



/*
 * Get  indicator_reference ( indicator_reference form)
 */
export const GET_INDICATOR_REFERENCE_REQUEST = 'GET_INDICATOR_REFERENCE_REQUEST';
export const GET_INDICATOR_REFERENCE_SUCCESS = 'GET_INDICATOR_REFERENCE_SUCCESS';
export const GET_INDICATOR_REFERENCE_FAILURE = 'GET_INDICATOR_REFERENCE_FAILURE';

export function getIndicatorReference(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_REFERENCE_REQUEST, GET_INDICATOR_REFERENCE_SUCCESS, GET_INDICATOR_REFERENCE_FAILURE],
            endpoint: 'Activity.getIndicatorReference',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_reference),
        }
    }
}

/*
 * Create  indicator_reference ( indicator_reference form)
 */
export const CREATE_INDICATOR_REFERENCE_REQUEST = 'CREATE_INDICATOR_REFERENCE_REQUEST';
export const CREATE_INDICATOR_REFERENCE_SUCCESS = 'CREATE_INDICATOR_REFERENCE_SUCCESS';
export const CREATE_INDICATOR_REFERENCE_FAILURE = 'CREATE_INDICATOR_REFERENCE_FAILURE';
export function createIndicatorReference(publisherId, activityId, resultId, indicatorId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_REFERENCE_REQUEST, CREATE_INDICATOR_REFERENCE_SUCCESS, CREATE_INDICATOR_REFERENCE_FAILURE],
            endpoint: 'Activity.createIndicatorReference',
            payload: [publisherId, activityId, resultId, indicatorId, JSON.stringify(data)],
            schema: Schemas.indicator_reference,
        }
    }
}

/*
 * Update  indicator_reference ( indicator_reference form)
 */
export const UPDATE_INDICATOR_REFERENCE_REQUEST = 'UPDATE_INDICATOR_REFERENCE_REQUEST';
export const UPDATE_INDICATOR_REFERENCE_SUCCESS = 'UPDATE_INDICATOR_REFERENCE_SUCCESS';
export const UPDATE_INDICATOR_REFERENCE_FAILURE = 'UPDATE_INDICATOR_REFERENCE_FAILURE';
export function updateIndicatorReference(publisherId, activityId, resultId, indicatorId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_REFERENCE_REQUEST, UPDATE_INDICATOR_REFERENCE_SUCCESS, UPDATE_INDICATOR_REFERENCE_FAILURE],
            endpoint: 'Activity.updateIndicatorReference',
            payload: [publisherId, activityId, resultId, indicatorId, id, JSON.stringify(data)],
            schema: Schemas.indicator_reference,
        }
    }
}


/*
 * Delete  indicator_reference ( indicator_reference form)
 */
export const DELETE_INDICATOR_REFERENCE_REQUEST = 'DELETE_INDICATOR_REFERENCE_REQUEST';
export const DELETE_INDICATOR_REFERENCE_SUCCESS = 'DELETE_INDICATOR_REFERENCE_SUCCESS';
export const DELETE_INDICATOR_REFERENCE_FAILURE = 'DELETE_INDICATOR_REFERENCE_FAILURE';
export function deleteIndicatorReference(publisherId, activityId, resultId, indicatorId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_REFERENCE_REQUEST, DELETE_INDICATOR_REFERENCE_SUCCESS, DELETE_INDICATOR_REFERENCE_FAILURE],
            endpoint: 'Activity.deleteIndicatorReference',
            payload: [publisherId, activityId, resultId, indicatorId, id]
        }
    }
}



/*
 * Get  indicator_target_location ( indicator_target_location form)
 */
export const GET_INDICATOR_TARGET_LOCATION_REQUEST = 'GET_INDICATOR_TARGET_LOCATION_REQUEST';
export const GET_INDICATOR_TARGET_LOCATION_SUCCESS = 'GET_INDICATOR_TARGET_LOCATION_SUCCESS';
export const GET_INDICATOR_TARGET_LOCATION_FAILURE = 'GET_INDICATOR_TARGET_LOCATION_FAILURE';

export function getIndicatorTargetLocation(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_TARGET_LOCATION_REQUEST, GET_INDICATOR_TARGET_LOCATION_SUCCESS, GET_INDICATOR_TARGET_LOCATION_FAILURE],
            endpoint: 'Activity.getIndicatorTargetLocation',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_target_location),
        }
    }
}

/*
 * Create  indicator_target_location ( indicator_target_location form)
 */
export const CREATE_INDICATOR_TARGET_LOCATION_REQUEST = 'CREATE_INDICATOR_TARGET_LOCATION_REQUEST';
export const CREATE_INDICATOR_TARGET_LOCATION_SUCCESS = 'CREATE_INDICATOR_TARGET_LOCATION_SUCCESS';
export const CREATE_INDICATOR_TARGET_LOCATION_FAILURE = 'CREATE_INDICATOR_TARGET_LOCATION_FAILURE';
export function createIndicatorTargetLocation(publisherId, activityId, resultId, indicatorId, periodId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_TARGET_LOCATION_REQUEST, CREATE_INDICATOR_TARGET_LOCATION_SUCCESS, CREATE_INDICATOR_TARGET_LOCATION_FAILURE],
            endpoint: 'Activity.createIndicatorTargetLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, JSON.stringify(data)],
            schema: Schemas.indicator_target_location,
        }
    }
}

/*
 * Update  indicator_target_location ( indicator_target_location form)
 */
export const UPDATE_INDICATOR_TARGET_LOCATION_REQUEST = 'UPDATE_INDICATOR_TARGET_LOCATION_REQUEST';
export const UPDATE_INDICATOR_TARGET_LOCATION_SUCCESS = 'UPDATE_INDICATOR_TARGET_LOCATION_SUCCESS';
export const UPDATE_INDICATOR_TARGET_LOCATION_FAILURE = 'UPDATE_INDICATOR_TARGET_LOCATION_FAILURE';
export function updateIndicatorTargetLocation(publisherId, activityId, resultId, indicatorId, periodId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_TARGET_LOCATION_REQUEST, UPDATE_INDICATOR_TARGET_LOCATION_SUCCESS, UPDATE_INDICATOR_TARGET_LOCATION_FAILURE],
            endpoint: 'Activity.updateIndicatorTargetLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id, JSON.stringify(data)],
            schema: Schemas.indicator_target_location,
        }
    }
}


/*
 * Delete  indicator_target_location ( indicator_target_location form)
 */
export const DELETE_INDICATOR_TARGET_LOCATION_REQUEST = 'DELETE_INDICATOR_TARGET_LOCATION_REQUEST';
export const DELETE_INDICATOR_TARGET_LOCATION_SUCCESS = 'DELETE_INDICATOR_TARGET_LOCATION_SUCCESS';
export const DELETE_INDICATOR_TARGET_LOCATION_FAILURE = 'DELETE_INDICATOR_TARGET_LOCATION_FAILURE';
export function deleteIndicatorTargetLocation(publisherId, activityId, resultId, indicatorId, periodId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_TARGET_LOCATION_REQUEST, DELETE_INDICATOR_TARGET_LOCATION_SUCCESS, DELETE_INDICATOR_TARGET_LOCATION_FAILURE],
            endpoint: 'Activity.deleteIndicatorTargetLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id]
        }
    }
}


/*
 * Get  indicator_actual_location ( indicator_actual_location form)
 */
export const GET_INDICATOR_ACTUAL_LOCATION_REQUEST = 'GET_INDICATOR_ACTUAL_LOCATION_REQUEST';
export const GET_INDICATOR_ACTUAL_LOCATION_SUCCESS = 'GET_INDICATOR_ACTUAL_LOCATION_SUCCESS';
export const GET_INDICATOR_ACTUAL_LOCATION_FAILURE = 'GET_INDICATOR_ACTUAL_LOCATION_FAILURE';

export function getIndicatorActualLocation(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_ACTUAL_LOCATION_REQUEST, GET_INDICATOR_ACTUAL_LOCATION_SUCCESS, GET_INDICATOR_ACTUAL_LOCATION_FAILURE],
            endpoint: 'Activity.getIndicatorActualLocation',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_actual_location),
        }
    }
}

/*
 * Create  indicator_actual_location ( indicator_actual_location form)
 */
export const CREATE_INDICATOR_ACTUAL_LOCATION_REQUEST = 'CREATE_INDICATOR_ACTUAL_LOCATION_REQUEST';
export const CREATE_INDICATOR_ACTUAL_LOCATION_SUCCESS = 'CREATE_INDICATOR_ACTUAL_LOCATION_SUCCESS';
export const CREATE_INDICATOR_ACTUAL_LOCATION_FAILURE = 'CREATE_INDICATOR_ACTUAL_LOCATION_FAILURE';
export function createIndicatorActualLocation(publisherId, activityId, resultId, indicatorId, periodId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_ACTUAL_LOCATION_REQUEST, CREATE_INDICATOR_ACTUAL_LOCATION_SUCCESS, CREATE_INDICATOR_ACTUAL_LOCATION_FAILURE],
            endpoint: 'Activity.createIndicatorActualLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, JSON.stringify(data)],
            schema: Schemas.indicator_actual_location,
        }
    }
}

/*
 * Update  indicator_actual_location ( indicator_actual_location form)
 */
export const UPDATE_INDICATOR_ACTUAL_LOCATION_REQUEST = 'UPDATE_INDICATOR_ACTUAL_LOCATION_REQUEST';
export const UPDATE_INDICATOR_ACTUAL_LOCATION_SUCCESS = 'UPDATE_INDICATOR_ACTUAL_LOCATION_SUCCESS';
export const UPDATE_INDICATOR_ACTUAL_LOCATION_FAILURE = 'UPDATE_INDICATOR_ACTUAL_LOCATION_FAILURE';
export function updateIndicatorActualLocation(publisherId, activityId, resultId, indicatorId, periodId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_ACTUAL_LOCATION_REQUEST, UPDATE_INDICATOR_ACTUAL_LOCATION_SUCCESS, UPDATE_INDICATOR_ACTUAL_LOCATION_FAILURE],
            endpoint: 'Activity.updateIndicatorActualLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id, JSON.stringify(data)],
            schema: Schemas.indicator_actual_location,
        }
    }
}


/*
 * Delete  indicator_actual_location ( indicator_actual_location form)
 */
export const DELETE_INDICATOR_ACTUAL_LOCATION_REQUEST = 'DELETE_INDICATOR_ACTUAL_LOCATION_REQUEST';
export const DELETE_INDICATOR_ACTUAL_LOCATION_SUCCESS = 'DELETE_INDICATOR_ACTUAL_LOCATION_SUCCESS';
export const DELETE_INDICATOR_ACTUAL_LOCATION_FAILURE = 'DELETE_INDICATOR_ACTUAL_LOCATION_FAILURE';
export function deleteIndicatorActualLocation(publisherId, activityId, resultId, indicatorId, periodId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_ACTUAL_LOCATION_REQUEST, DELETE_INDICATOR_ACTUAL_LOCATION_SUCCESS, DELETE_INDICATOR_ACTUAL_LOCATION_FAILURE],
            endpoint: 'Activity.deleteIndicatorActualLocation',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id]
        }
    }
}


/*
 * Get  indicator_target_dimension ( indicator_target_dimension form)
 */
export const GET_INDICATOR_TARGET_DIMENSION_REQUEST = 'GET_INDICATOR_TARGET_DIMENSION_REQUEST';
export const GET_INDICATOR_TARGET_DIMENSION_SUCCESS = 'GET_INDICATOR_TARGET_DIMENSION_SUCCESS';
export const GET_INDICATOR_TARGET_DIMENSION_FAILURE = 'GET_INDICATOR_TARGET_DIMENSION_FAILURE';

export function getIndicatorTargetDimension(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_TARGET_DIMENSION_REQUEST, GET_INDICATOR_TARGET_DIMENSION_SUCCESS, GET_INDICATOR_TARGET_DIMENSION_FAILURE],
            endpoint: 'Activity.getIndicatorTargetDimension',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_target_dimension),
        }
    }
}

/*
 * Create  indicator_target_dimension ( indicator_target_dimension form)
 */
export const CREATE_INDICATOR_TARGET_DIMENSION_REQUEST = 'CREATE_INDICATOR_TARGET_DIMENSION_REQUEST';
export const CREATE_INDICATOR_TARGET_DIMENSION_SUCCESS = 'CREATE_INDICATOR_TARGET_DIMENSION_SUCCESS';
export const CREATE_INDICATOR_TARGET_DIMENSION_FAILURE = 'CREATE_INDICATOR_TARGET_DIMENSION_FAILURE';
export function createIndicatorTargetDimension(publisherId, activityId, resultId, indicatorId, periodId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_TARGET_DIMENSION_REQUEST, CREATE_INDICATOR_TARGET_DIMENSION_SUCCESS, CREATE_INDICATOR_TARGET_DIMENSION_FAILURE],
            endpoint: 'Activity.createIndicatorTargetDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, JSON.stringify(data)],
            schema: Schemas.indicator_target_dimension,
        }
    }
}

/*
 * Update  indicator_target_dimension ( indicator_target_dimension form)
 */
export const UPDATE_INDICATOR_TARGET_DIMENSION_REQUEST = 'UPDATE_INDICATOR_TARGET_DIMENSION_REQUEST';
export const UPDATE_INDICATOR_TARGET_DIMENSION_SUCCESS = 'UPDATE_INDICATOR_TARGET_DIMENSION_SUCCESS';
export const UPDATE_INDICATOR_TARGET_DIMENSION_FAILURE = 'UPDATE_INDICATOR_TARGET_DIMENSION_FAILURE';
export function updateIndicatorTargetDimension(publisherId, activityId, resultId, indicatorId, periodId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_TARGET_DIMENSION_REQUEST, UPDATE_INDICATOR_TARGET_DIMENSION_SUCCESS, UPDATE_INDICATOR_TARGET_DIMENSION_FAILURE],
            endpoint: 'Activity.updateIndicatorTargetDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id, JSON.stringify(data)],
            schema: Schemas.indicator_target_dimension,
        }
    }
}


/*
 * Delete  indicator_target_dimension ( indicator_target_dimension form)
 */
export const DELETE_INDICATOR_TARGET_DIMENSION_REQUEST = 'DELETE_INDICATOR_TARGET_DIMENSION_REQUEST';
export const DELETE_INDICATOR_TARGET_DIMENSION_SUCCESS = 'DELETE_INDICATOR_TARGET_DIMENSION_SUCCESS';
export const DELETE_INDICATOR_TARGET_DIMENSION_FAILURE = 'DELETE_INDICATOR_TARGET_DIMENSION_FAILURE';
export function deleteIndicatorTargetDimension(publisherId, activityId, resultId, indicatorId, periodId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_TARGET_DIMENSION_REQUEST, DELETE_INDICATOR_TARGET_DIMENSION_SUCCESS, DELETE_INDICATOR_TARGET_DIMENSION_FAILURE],
            endpoint: 'Activity.deleteIndicatorTargetDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id]
        }
    }
}


/*
 * Get  indicator_actual_dimension ( indicator_actual_dimension form)
 */
export const GET_INDICATOR_ACTUAL_DIMENSION_REQUEST = 'GET_INDICATOR_ACTUAL_DIMENSION_REQUEST';
export const GET_INDICATOR_ACTUAL_DIMENSION_SUCCESS = 'GET_INDICATOR_ACTUAL_DIMENSION_SUCCESS';
export const GET_INDICATOR_ACTUAL_DIMENSION_FAILURE = 'GET_INDICATOR_ACTUAL_DIMENSION_FAILURE';

export function getIndicatorActualDimension(publisherId, activityId, resultId, indicatorId) {
    return {
        [CALL_API]: {
            types: [GET_INDICATOR_ACTUAL_DIMENSION_REQUEST, GET_INDICATOR_ACTUAL_DIMENSION_SUCCESS, GET_INDICATOR_ACTUAL_DIMENSION_FAILURE],
            endpoint: 'Activity.getIndicatorActualDimension',
            payload: [publisherId, activityId, resultId, indicatorId],
            schema: arrayOf(Schemas.indicator_actual_dimension),
        }
    }
}

/*
 * Create  indicator_actual_dimension ( indicator_actual_dimension form)
 */
export const CREATE_INDICATOR_ACTUAL_DIMENSION_REQUEST = 'CREATE_INDICATOR_ACTUAL_DIMENSION_REQUEST';
export const CREATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS = 'CREATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS';
export const CREATE_INDICATOR_ACTUAL_DIMENSION_FAILURE = 'CREATE_INDICATOR_ACTUAL_DIMENSION_FAILURE';
export function createIndicatorActualDimension(publisherId, activityId, resultId, indicatorId, periodId, data) {
    return {
        [CALL_API]: {
            types: [CREATE_INDICATOR_ACTUAL_DIMENSION_REQUEST, CREATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS, CREATE_INDICATOR_ACTUAL_DIMENSION_FAILURE],
            endpoint: 'Activity.createIndicatorActualDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, JSON.stringify(data)],
            schema: Schemas.indicator_actual_dimension,
        }
    }
}

/*
 * Update  indicator_actual_dimension ( indicator_actual_dimension form)
 */
export const UPDATE_INDICATOR_ACTUAL_DIMENSION_REQUEST = 'UPDATE_INDICATOR_ACTUAL_DIMENSION_REQUEST';
export const UPDATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS = 'UPDATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS';
export const UPDATE_INDICATOR_ACTUAL_DIMENSION_FAILURE = 'UPDATE_INDICATOR_ACTUAL_DIMENSION_FAILURE';
export function updateIndicatorActualDimension(publisherId, activityId, resultId, indicatorId, periodId, id, data) {
    return {
        id,
        [CALL_API]: {
            types: [UPDATE_INDICATOR_ACTUAL_DIMENSION_REQUEST, UPDATE_INDICATOR_ACTUAL_DIMENSION_SUCCESS, UPDATE_INDICATOR_ACTUAL_DIMENSION_FAILURE],
            endpoint: 'Activity.updateIndicatorActualDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id, JSON.stringify(data)],
            schema: Schemas.indicator_actual_dimension,
        }
    }
}


/*
 * Delete  indicator_actual_dimension ( indicator_actual_dimension form)
 */
export const DELETE_INDICATOR_ACTUAL_DIMENSION_REQUEST = 'DELETE_INDICATOR_ACTUAL_DIMENSION_REQUEST';
export const DELETE_INDICATOR_ACTUAL_DIMENSION_SUCCESS = 'DELETE_INDICATOR_ACTUAL_DIMENSION_SUCCESS';
export const DELETE_INDICATOR_ACTUAL_DIMENSION_FAILURE = 'DELETE_INDICATOR_ACTUAL_DIMENSION_FAILURE';
export function deleteIndicatorActualDimension(publisherId, activityId, resultId, indicatorId, periodId, id) {
    return {
        id,
        [CALL_API]: {
            types: [DELETE_INDICATOR_ACTUAL_DIMENSION_REQUEST, DELETE_INDICATOR_ACTUAL_DIMENSION_SUCCESS, DELETE_INDICATOR_ACTUAL_DIMENSION_FAILURE],
            endpoint: 'Activity.deleteIndicatorActualDimension',
            payload: [publisherId, activityId, resultId, indicatorId, periodId, id]
        }
    }
}
