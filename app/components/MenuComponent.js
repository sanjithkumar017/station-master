import React from 'react';
import {Menu} from 'semantic-ui-react'

const MenuComponent = () => (
    <Menu secondary fluid={true}>
        <Menu.Item name='Station Master' active={true}/>

        <Menu.Menu position='right'>
            <Menu.Item name='Like'/>
        </Menu.Menu>
    </Menu>

)

export default MenuComponent;
