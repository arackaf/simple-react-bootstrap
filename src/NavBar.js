import React from 'react';

document.onclick = function(evt){
};

class NavBar extends React.Component{
    render(){
        let children = this.props.children;
        let count = children.filter(c => c.type === NavBarItem).length;

        return <div>Hello world!!!!!! <button className="____internal">Click me</button></div>
    }
}

class NavBarItem extends React.Component {
    render(){
        return <div>Item</div>
    }
}

NavBar.Item = NavBarItem;

export default NavBar;
