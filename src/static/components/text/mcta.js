import React from 'react';

const firstLevel = (component, interaction, onComponentDataChange) => {
    return <div
        className="wrapper"
    >
        <button className="button1" onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            interaction.onInteractionStart()
        }}>Level 1 MCTA for Text</button>
            <button
                onClick={() => {
                    onComponentDataChange({
                        behaviour: {
                            ...component.behaviour,
                            size: component.behaviour.size + 3
                        }
                    });
                }}
            >+ Font/</button>
            <button
                onClick={() => {
                    onComponentDataChange({
                        behaviour: {
                            ...component.behaviour,
                            size: component.behaviour.size - 3
                        }
                    })
                }}
            >- Font/</button>
    </div>;
}

const secondLevel = (component, onComponentDataChange) => {
    return <div
        className="wrapper"
    >
        Level 2 MCTA for Text
        <button
                onClick={() => {
                    onComponentDataChange({
                        behaviour: {
                            ...component.behaviour,
                            size: component.behaviour.size + 3
                        }
                    })
                }}
            >+ Font/</button>
            <button
                onClick={() => {
                    onComponentDataChange({
                        behaviour: {
                            ...component.behaviour,
                            size: component.behaviour.size - 3
                        }
                    })
                }}
            >- Font/</button>
    </div>;
}

export default (component, selectedByDoubleClick, interaction, onComponentDataChange) => {
    return selectedByDoubleClick ? secondLevel(component, onComponentDataChange) : firstLevel(component, interaction, onComponentDataChange);
}