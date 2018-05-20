import React from 'react';
import {Input} from 'semantic-ui-react'

import PropTypes from 'prop-types'

const NumberInput = ({placeholder, onChange, value}) => (
    <Input focus={true} placeholder={placeholder} type={'number'} onChange={onChange} centered value={value}/>
)

NumberInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
}
export default NumberInput;