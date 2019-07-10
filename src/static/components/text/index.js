import view, {shortcut} from "./view";
import mcta from "./mcta";
import { createComponent } from "../createComponent";

let Text = createComponent({
    kind: "TEXT",
    name: "Text",
    label: "Text",
    shortcut,
    view,
    mcta,
    pushElement: true,
    props: {
        top: 100,
        left: 100,
        width: 100,
        height: 40
    },
    behaviour: { size: 18 }
});

export default Text;
