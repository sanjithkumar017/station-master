import React from 'react';
import {Menu, Icon} from 'semantic-ui-react'

import PropTypes from 'prop-types'

const MenuComponent = ({handleItemClick, liked, likesCount}) => (
    <Menu secondary fluid={true} className={"fixtop"}>
        <Menu.Item name='Station Master' active={true}/>

        <Menu.Menu position='right'>
            <Menu.Item name='Like'>
                <Icon name='heart' size={"large"} onClick={handleItemClick}
                      color={liked ? "red" : "white"}/>{likesCount}
            </Menu.Item>
        </Menu.Menu>
    </Menu>

)

MenuComponent.propTypes = {
    handleItemClick: PropTypes.func,
    liked: PropTypes.bool,
    likesCount: PropTypes.number
}

export default MenuComponent;
