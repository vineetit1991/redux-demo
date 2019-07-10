import {dataLoaded} from "../workspace/actions";
import { sequenceActions } from "../../redux-utility/sequence";
import {saveComponentData} from "./actions";

export const loadData = () => {
    return ({dispatch}) => {
        // dispatch(setLoading())
        let components = {};

        try {
            components = JSON.parse(localStorage.getItem("components")) ||{
                byIds: {},
                ids: [],
                selected: []
            }
        } catch (e) {}
        setTimeout(() => {
            dispatch(
                sequenceActions([
                    saveComponentData(components),
                    dataLoaded()
                ])
            );
        }, 1000);
    }
};