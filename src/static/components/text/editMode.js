import React from 'react';
import Measure from 'react-measure';

export default class EditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();

        this.selection = null;
    }

    focustAtSpecific(selection) {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(selection.node, selection.offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.ref.current.focus();   
    }
    
    // componentDidUpdate() {
    //     if (this.selection.node)
    //         this.focustAtSpecific(this.selection);
    // }

    componentWillUnmount() {
        const {component, onComponentDataChange } = this.props;
        onComponentDataChange({
            ...component,
            name: this.ref.current.innerHTML
        })
    }

    render() {
        const {component, onComponentDataChange } = this.props;
        return <Measure
            bounds
            innerRef={this.ref}
            onResize={contentRect => {
                // this.selection = {
                //     node:  window.getSelection().focusNode,
                //     offset: window.getSelection().focusOffset
                // };
                if (contentRect.bounds.height > (component.props.height + 2)) {
                    onComponentDataChange({
                        name: this.ref.current.innerHTML,
                        props: {
                            ...component.props,
                            height: contentRect.bounds.height
                        }
                    })
                }
            }}
            >
                {({ measureRef }) => <div
                    onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onMouseDown={e => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    ref={measureRef}
                    className="textarea"
                    style={{
                        minHeight: component.props.height
                    }}
                    contentEditable={true}
                    dangerouslySetInnerHTML={{
                        __html: component.name
                    }}
                />}
        </Measure>;
    }
}