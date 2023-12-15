import { User } from '../interfaces/store';
import { PeopleAction } from '../interfaces/people';
import { START_LOADING, END_LOADING, START_MINI_LOADING, END_MINI_LOADING, PEOPLE, SEARCH_PEOPLE, REMOVE_PEOPLE, FRIEND_REQUEST } from "../constants";

const initialState = {
    people: [],
    isLoading: false,
    isMiniLoading: false
};

const peopleReducer = (state = initialState, action: PeopleAction) => {
    let updatedPeople: User[];

    switch(action.type) {
        case START_LOADING:
            if(action.for !== PEOPLE) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== PEOPLE) return state;
            return { ...state, isLoading: false };
        case START_MINI_LOADING:
            if(action.for !== PEOPLE) return state;
            return { ...state, isMiniLoading: true };
        case END_MINI_LOADING:
            if(action.for !== PEOPLE) return state;
            return { ...state, isMiniLoading: false };
        case SEARCH_PEOPLE:
            return { ...state, people: action?.data };
        case REMOVE_PEOPLE:
            return { ...state, people: [] };
        case FRIEND_REQUEST:
            updatedPeople = Array.isArray(state.people) ? [...state.people] : [];
            if (action?.data && typeof action.data === "object" && "_id" in action.data) {
                const updatedData: User = action.data;
                updatedPeople = updatedPeople.map((person: User) => person?._id === updatedData._id ? updatedData : person);
            }
            return { ...state, people: updatedPeople };
        default:
            return state;
    }
};

export default peopleReducer;