import React from 'react';

export const firstLevel = (component, interaction) => {
    return <div
        className="wrapper buttonMcta"
    >
        <button className="button1" onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            interaction.onInteractionStart()
        }}>Level 1 MCTA for Button</button>
    </div>;
}

export const secondLevel = (component, onComponentDataChange) => {
    return <div
        className="wrapper buttonMcta"
    >
        <input type="text" value={component.name} onChange={(e) => onComponentDataChange({ ...component, name: e.target.value })}/>
    </div>;
}

export default (component, selectedByDoubleClick, interaction, onComponentDataChange) => {
    return selectedByDoubleClick ? secondLevel(component, onComponentDataChange) : firstLevel(component, interaction);
}