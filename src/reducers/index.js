import {FETCH_DETAILS} from '../actions';

function fetchDetails(state=[], action)
{
    switch(action.type)
    {
        case FETCH_DETAILS:
            return action.json;
        default:
            return state;
    }
}

export default fetchDetails;