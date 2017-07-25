import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownItem } from 'reactstrap';
import BLOCKS from '../labels/blockLabels';
import FONT_SIZES from '../labels/fontLabels';
var FontAwesome = require('react-fontawesome');
import { CirclePicker } from 'react-color';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCirclePicker: false,
            fontSizeDropdownOpen: false
        };
        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleColorClose = this.handleColorClose.bind(this);
        this.toggleFontSizeDropdown = this.toggleFontSizeDropdown.bind(this);

        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }

    handleColorClick(){
        console.log('here');
        this.setState({ displayCirclePicker: !this.state.displayCirclePicker });
    }

    handleColorClose(){
        this.setState({ displayCirclePicker: false });
    }


    handleChangeComplete(color){
        console.log('here in handled change', color.hex);
        this.props.onToggleColor(color.hex);
        this.handleColorClose();
    }

    toggleFontSizeDropdown() {
        this.setState( {
            fontSizeDropdownOpen: !this.state.fontSizeDropdownOpen
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
									<Button onClick={ this.props.onBoldClick }><FontAwesome name='bold' /></Button>
									<Button onClick={ this.props.onItalicClick }><FontAwesome name='italic' /></Button>
									<Button onClick={ this.props.onUnderlineClick }><FontAwesome name='underline' /></Button>
                  <Button onClick={this.handleColorClick }><FontAwesome name='paint-brush' /></Button>
                    { this.state.displayCirclePicker ? <div style={ popover }>
                      <CirclePicker onChangeComplete={this.handleChangeComplete}/>
                    </div> : null }
									{BLOCKS.map((type, index) => (
										<Button key={index} onClick={() => this.props.toggleBlockType(type.style) }>
											<FontAwesome name={type.label} />
										</Button>
									))}
                  <ButtonDropdown isOpen={ this.state.fontSizeDropdownOpen } toggle={ this.toggleFontSizeDropdown }>
											<DropdownToggle caret>
													<FontAwesome name='text-height' />
											</DropdownToggle>
											<DropdownMenu>
													{ FONT_SIZES.map(( type, index ) =>
															<DropdownItem key={ index } onClick={ () => this.props.toggleFontSize(type.style) } >
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
