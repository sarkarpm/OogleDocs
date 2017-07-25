import React from 'react';
import colorStyleMap from '../customStyleMap/colorStyleMap';

class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        // let style;
        // if (this.props.active) {
        //     style = {...styles.styleButton, ...colorStyleMap[this.props.style]};
        // } else {
        //     style = styles.styleButton;
        // }

        return (
            <span onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
export default StyleButton;
