import React from 'react';
import {Button} from 'semantic-ui-react'

import PropTypes from 'prop-types'

const FetchButton = ({onSubmit, isDisabled}) => (
    <div>
        <Button className={"fetchButton"} onClick={onSubmit} disabled={isDisabled}>
            Get
        </Button>
    </div>

)

FetchButton.propTypes = {
    onSubmit: PropTypes.func,
    isDisabled: PropTypes.bool
}

export default FetchButton;