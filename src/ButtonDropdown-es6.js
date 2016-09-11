import React, { Component } from 'react';



class ButtonDropdown extends Component {
    constructor(){
        super();
        this.state = { open: false };
    }
    toggle = () => {
        this.setState({ open: !this.state.open });
    }
    render(){
        let { children, className = '', ...rest } = this.props;

        if (!Array.isArray(children) || children.length !== 2){
            throw 'Error - exactly two children should be passed, a toggle, and dropdown menu'
        }

        let toggle = children[0],
            content = children[1];

        return (
            <div className={className + ' btn-group ' + (this.state.open ? 'open' : '')}>
                <button onClick={this.toggle}>X<i className="fa fa-fw fa-tag"></i></button>
                {content}
            </div>
        )
    }
}

export default ButtonDropdown;