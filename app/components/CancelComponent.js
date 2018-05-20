import React from 'react';
import {Button} from 'semantic-ui-react'

import PropTypes from 'prop-types'


const CancelComponent = ({handlePnrCancel}) => (
    <
        Button
        circular
        icon='cancel'
        onClick={handlePnrCancel}
        color={"red"}
    />
)

CancelComponent.propTypes = {
    handlePnrCancel: PropTypes.func
}
export default CancelComponent;