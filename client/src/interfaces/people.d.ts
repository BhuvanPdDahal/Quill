import { User } from './store';

export interface PeopleState {
    isLoading: boolean;
    isMiniLoading: boolean;
    people: User[];
}

export interface PeopleAction {
    type: string;
    for?: string;
    data?: User | User[];
}