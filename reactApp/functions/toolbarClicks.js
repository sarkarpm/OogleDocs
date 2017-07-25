import { RichUtils } from 'draft-js';


function _onBoldClick() {
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'BOLD' ) );
}
function _onItalicClick() {
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'ITALIC' ) );
}

function _onUnderlineClick() {
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'UNDERLINE' ) );
}

function _toggleColor( toggledColor ) {
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, toggledColor ) );
}

module.exports = {
    _onBoldClick,
    _onItalicClick,
    _onUnderlineClick,
    _toggleColor
};
