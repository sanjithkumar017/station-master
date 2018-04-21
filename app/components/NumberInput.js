import React from 'react';
import {Input} from 'semantic-ui-react'

const NumberInput = ({placeholder, onChange, value}) => (
    <Input focus={true} placeholder={placeholder} type={'number'} onChange={onChange} centered value={value}/>
)

export default NumberInput;