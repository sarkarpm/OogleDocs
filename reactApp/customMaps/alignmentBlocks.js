import React from 'react';

class LeftBlock extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
					<div className="leftBlock">
						{this.props.children}
					</div>
        );
    }
}

class CenterBlock extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
					<div className="centerBlock">
						{this.props.children}
					</div>
        );
    }
}

class RightBlock extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
				<div className="rightBlock">
					{this.props.children}
				</div>
        );
    }
}

module.exports = {
    LeftBlock,
    CenterBlock,
    RightBlock
};
