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
    console.log('color in function', toggledColor);
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, toggledColor ) );
}

function _toggleFontSize( toggledFontSize ) {
    this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, toggledFontSize ) );
}

function _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
}

module.exports = {
    _onBoldClick,
    _onItalicClick,
    _onUnderlineClick,
    _toggleColor,
    _toggleFontSize,
    _toggleBlockType
};
