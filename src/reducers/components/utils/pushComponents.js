// @flow

// import components from "../../../static/components/utils";

export default (diff, componentsMap, newComponent) => {

    const ids = Object.keys(componentsMap);


    return ids.reduce((acc, id) => {
        if (acc[id]) return acc;

        return {
            ...acc,
            [id]: {
                ...componentsMap[id],
                props: {
                    ...componentsMap[id].props,
                    top: componentsMap[id].props.top + diff
                }
            }
        }
    }, { [newComponent.id]: newComponent})
}