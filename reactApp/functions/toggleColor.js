import { EditorState, RichUtils, Modifier } from 'draft-js';
import colorStyleMap from '../customStyleMap/colorStyleMap';

function _toggleColor( toggledColor ) {

    const { editorState } = this.state;
    const selection = editorState.getSelection();

    const nextContentState = Object.keys( colorStyleMap )
				.reduce(( contentState, color ) => {
    return Modifier.removeInlineStyle( contentState, selection, color );
}, editorState.getCurrentContent() );

    let nextEditorState = EditorState.push(
				editorState,
				nextContentState,
				'change-inline-style'
		);

    const currentStyle = editorState.getCurrentInlineStyle();

		// Unset style override for current color.
    if ( selection.isCollapsed() ) {
        nextEditorState = currentStyle.reduce(( state, color ) => {
            return RichUtils.toggleInlineStyle( state, color );
        }, nextEditorState );
    }

		// If the color is being toggled on, apply it.
    if ( !currentStyle.has( toggledColor ) ) {
        nextEditorState = RichUtils.toggleInlineStyle(
						nextEditorState,
						toggledColor
				);
    }

    this.onChange( nextEditorState );
}

export default _toggleColor;
