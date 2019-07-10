import view, {shortcut } from "./view";
import mcta from "./mcta";
import {createComponent} from "../createComponent";
import "./index.css"

let Button = createComponent({
    kind: "BUTTON",
    name: "button",
    label: "button",
    shortcut,
    view,
    mcta,
    props: {
        top: 100,
        left: 100,
        width: 100,
        height: 40
    },
    behaviour: {}
});
export default Button;
