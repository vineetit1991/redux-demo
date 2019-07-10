import components from "./";

const getDef = kind => components.find(component => component.kind === kind)

export default {
    getDef
}
