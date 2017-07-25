import React from 'react';
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import { LeftBlock, CenterBlock, RightBlock } from './alignmentBlocks';

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
