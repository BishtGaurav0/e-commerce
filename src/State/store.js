import { createStore } from "redux";
import allReducers from "./Reducer";

export const store = createStore(allReducers);
