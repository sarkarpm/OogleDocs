import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Button, ButtonGroup, DropdownItem } from 'reactstrap';
import StyleButton from '../colors/StyleButton';
import COLORS from '../colors/colors';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState( {
            dropdownOpen: !this.state.dropdownOpen
        } );
    }

    render(){
        return (
				<div className="toolbar">
						<ButtonGroup>
								<Button onClick={ this.props.onBoldClick }>Bold</Button>
								<Button onClick={ this.props.onItalicClick }>Italic</Button>
								<Button onClick={ this.props.onUnderlineClick }>Underline</Button>
								<ButtonDropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
										<DropdownToggle caret>
												Colors
										</DropdownToggle>
										<DropdownMenu>
												{ COLORS.map(( type, index ) =>
														<DropdownItem key={ index }>
																<StyleButton
																		label={ type.label }
																		onToggle={ this.props.toggleColor }
																		style={ type.style }
																		key={ index }
																/>
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
