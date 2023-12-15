import { START_LOADING, END_LOADING, START_MINI_LOADING, END_MINI_LOADING, CHAT, GET_CHAT, REMOVE_CHAT, SEND_CHAT } from "../constants";

const initialState = {
    chats: [],
    chatId: '',
    friendName: '',
    friendId: '',
    isLoading: true,
    isMiniLoading: false
};

const chatReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case START_LOADING:
            if(action.for !== CHAT) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if(action.for !== CHAT) return state;
            return { ...state, isLoading: false };
        case START_MINI_LOADING:
            if(action.for !== CHAT) return state;
            return { ...state, isMiniLoading: true };
        case END_MINI_LOADING:
            if(action.for !== CHAT) return state;
            return { ...state, isMiniLoading: false };
        case GET_CHAT:
            return { ...state, chats: action?.data?.chats, chatId: action?.data?.chatId, friendName: action?.data?.name, friendId: action?.data?.friendId };
        case SEND_CHAT:
            return { ...state, chats: [...state.chats, action?.data] };
        case REMOVE_CHAT:
            return initialState;
        default:
            return state;
    }
};

export default chatReducer;