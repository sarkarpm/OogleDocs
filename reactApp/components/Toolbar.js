import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownItem } from 'reactstrap';
import BLOCKS from '../labels/blockLabels';
import FONT_SIZES from '../labels/fontLabels';
var FontAwesome = require('react-fontawesome');
import { CirclePicker } from 'react-color';
import _ from 'underscore';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCirclePicker: false,
            displayFontSizeDropdown: false
        };
        _.bindAll( this, 'handleColorClick', 'handleColorClose', 'toggleFontSizeDropdown', 'handleChangeComplete' );
    }

    handleColorClick(){
        console.log('here');
        this.setState({ displayCirclePicker: !this.state.displayCirclePicker });
    }

    handleColorClose(){
        this.setState({ displayCirclePicker: false });
    }

    handleChangeComplete(color){
        this.props.onToggleColor(color.hex);
        this.handleColorClose();
    }

    toggleFontSizeDropdown() {
        this.setState( {
            displayFontSizeDropdown: !this.state.displayFontSizeDropdown
        } );
    }

    render(){
        const popover = {
            position: 'absolute',
            zIndex: '2',
            opacity: '0.8',
            background: 'white'
        };
        return (
					<div className="toolbar">
							<ButtonGroup>
                  <Button onClick={ this.props.onSaveDocument }><FontAwesome name='save' /></Button>
									<Button onClick={ () => this.props.onToggleTypeface('BOLD') }><FontAwesome name='bold' /></Button>
									<Button onClick={ () => this.props.onToggleTypeface('ITALIC')  }><FontAwesome name='italic' /></Button>
									<Button onClick={ () => this.props.onToggleTypeface('UNDERLINE')  }><FontAwesome name='underline' /></Button>
                  <Button onClick={ this.handleColorClick }><FontAwesome name='paint-brush' /></Button>
                    { this.state.displayCirclePicker ? <div style={ popover }>
                      <CirclePicker onChangeComplete={ this.handleChangeComplete }/>
                    </div> : null }
									{BLOCKS.map( ( type, index ) => (
										<Button key={ index } onClick={() => this.props.onToggleBlockType( type.style ) }>
											<FontAwesome name={ type.label } />
										</Button>
									))}
                  <ButtonDropdown isOpen={ this.state.displayFontSizeDropdown } toggle={ this.toggleFontSizeDropdown }>
											<DropdownToggle caret>
													<FontAwesome name='text-height' />
											</DropdownToggle>
											<DropdownMenu>
													{ FONT_SIZES.map( ( type, index ) =>
															<DropdownItem key={ index } onClick={ () => this.props.onToggleFontSize( type.style ) } >
																<p>{ type.label }</p>
															</DropdownItem>
													) }
											</DropdownMenu>
									</ButtonDropdown>
							</ButtonGroup>
					</div>
        );
    }
}

export default Toolbar;
