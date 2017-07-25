import { RichUtils } from 'draft-js';

function handleKeyCommand( command ) {
    const newState = RichUtils.handleKeyCommand( this.state.editorState, command );
    if ( newState ) {
        this.onChange( newState );
        return 'handled';
    }
    return 'not-handled';
}

module.exports = {
    handleKeyCommand
};
