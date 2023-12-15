/// <reference types="redux" />
import { combineReducers } from "redux";

import auth from './auth';
import alert from './alert';
import people from './people';
import chat from './chat';

export default combineReducers({ auth, alert, people, chat });