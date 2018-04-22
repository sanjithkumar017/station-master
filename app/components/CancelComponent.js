import React from 'react';
import {Button} from 'semantic-ui-react'


const CancelComponent = ({handlePnrCancel}) => (
    <
        Button
        circular
        icon='cancel'
        onClick={handlePnrCancel}
        color={"red"}
    />
)


export default CancelComponent;