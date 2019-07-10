import * as R from "ramda";
const height = 40;
const horizontalSpace = 20;

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

const getPositions = (own, componentRect, scrollTop, parentWidth, pp) => {
    let position = {
        top: componentRect.top - horizontalSpace - own.height - scrollTop,
        left: componentRect.left
    };

    const ppRect = {
        top: pp.top - scrollTop,
        left: pp.left,
        right: pp.left + pp.width,
        bottom: pp.top + pp.height - scrollTop 
    }

    const dimension = {
        y: own.height,
        x: own.width
    };
    
    if (
        position.top > 0 && (position.left + own.width) < parentWidth
        && !inRectangle({ x: position.left, y: position.top}, dimension, ppRect)
    ) {
        return { ...position, top: position.top + scrollTop };
    }

    position.left = componentRect.left - dimension.x + (componentRect.width/2);

    if (
        position.top > 0 &&
        position.left > 0 
        && !inRectangle({ x: position.left, y: position.top}, dimension, ppRect)
    ) {
        return { ...position, top: position.top + scrollTop };
    }

    position.top = componentRect.top + componentRect.height + horizontalSpace - scrollTop

    if (
        position.left > 0 &&
       !inRectangle({ x: position.left, y: position.top}, dimension, ppRect)
    ) {
        return { ...position, top: position.top + scrollTop };
    }

    position.left = componentRect.left;

    if (
        position.left > 0 &&
        !inRectangle({ x: position.left, y: position.top}, dimension, ppRect)
    ) {
        return { ...position, top: position.top + scrollTop };
    }

    return {
        top: componentRect.top - horizontalSpace - own.height,
        left: componentRect.left
    }
    
}


export const getMCTAPosition = (width, scrollTop, windowWidth, componentProps) => {
    let top = componentProps.top - scrollTop - horizontalSpace - height;
    let left = componentProps.left;

    if (top < 1) {
        top = componentProps.top + componentProps.height + horizontalSpace - scrollTop
    }

    if (left + width > windowWidth - 20) {
        left = componentProps.left - width + (componentProps.width/2);
    }

    return {top: top + scrollTop, left};
};




export const adjustMCTA = (state, componentProps, scrollTop, parentWidth, pp) => {
    return getPositions(state, componentProps, scrollTop, parentWidth, pp)
};