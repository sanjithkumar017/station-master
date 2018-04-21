import React from 'react';
import {Image} from 'semantic-ui-react'
const Logo = ({logoUrl}) => (
    <Image src={logoUrl} size='medium' circular centered/>
)

export default Logo;