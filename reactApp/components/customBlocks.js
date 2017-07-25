import React from 'react';
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

class LeftBlock extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
					<div style={{textAlign: 'left'}}>
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
					<div style={{textAlign: 'center'}}>
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
				<div style={{textAlign: 'right'}}>
					{this.props.children}
				</div>
        );
    }
}

const blockRenderMap = Map({
    'LeftBlock': {
        element: 'section',
        wrapper: <LeftBlock  />
    },
    'CenterBlock': {
        element: 'section',
        wrapper: <CenterBlock  />
    },
    'RightBlock': {
        element: 'section',
        wrapper: <RightBlock  />
    },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default extendedBlockRenderMap;
