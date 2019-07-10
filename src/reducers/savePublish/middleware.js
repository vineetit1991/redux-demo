import {saveCompleted} from "./actions";

export const onSave = () => {
    return ({dispatch, getState}) => {
        localStorage.setItem("components", JSON.stringify(getState().components));
        setTimeout(() => {
            dispatch(saveCompleted())
        }, 1000);
    }
};