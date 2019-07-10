import * as R from "ramda";

const inRectangle = R.curry((position, size, point) => {
    const rect = {
        right: position.x + size.x,
        bottom: position.y + size.y,
        top: position.y,
        left: position.x
    };
    

    return !(
        point.left > rect.right || 
        point.right < rect.left || 
        point.top > rect.bottom ||
        point.bottom < rect.top
    )
});

export const getAvailablePosition = (container1, container2, parentContainer, own) => {
    const points = [
        {
            left: container1.left, top: container1.top,
            right: container1.left + container1.width, bottom: container1.top + container1.height
        },
        {
            left: container2.left, top: container2.top,
            right: container2.left + container2.width, bottom: container2.top + container2.height
        }
    ]
    const availableWidth = window.innerWidth - parentContainer.left;
    const gap = 50;

    let dimension = {
        x: own.width,
        y: own.height
    };
    
    //bottom right
    let position = {
        x: availableWidth - gap - own.width,
        y: window.innerHeight - own.height - 50 - 50// tobar
    };
    if (!R.any(inRectangle(position, dimension))(points)) {
        return position;
    }

    //top left
    position = {
        x: gap,
        y: gap
    };
    if (!R.any(inRectangle(position, dimension))(points)) {
        return position;
    }

    //bottom left
    position = {
        x: gap,
        y: window.innerHeight - own.height - 50
    };
    if (!R.any(inRectangle(position, dimension))(points)) {
        return position;
    }

    //top right
    position = {
        x: availableWidth - gap - own.width,
        y: gap
    };
    return position;
};
