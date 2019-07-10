import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class ClickListener extends Component {
    componentDidMount() {
        window.root.addEventListener("click", this.handleDocumentClick);
    }

    componentWillUnmount() {
        window.root.removeEventListener("click", this.handleDocumentClick);
    }

    handleDocumentClick = evt => {
        const area = ReactDOM.findDOMNode(this.refs[this.props.reference]);

        let skip = area && area.contains(evt.target);        
        if (skip) return;

        let skipArea = document.querySelector(".mctaHolder");
        skip = skipArea && skipArea.contains(evt.target);

        if (skip) return;

        skipArea = document.querySelector(".dragHandle");
        skip = skipArea && skipArea.contains(evt.target);

        if (skip) return;

        this.props.onClickOutside(false);
    };

    render() {
        return (
            <div ref={this.props.reference}>
                {this.props.children}
            </div>
        );
    }
}
