import React from 'react';
import {Button} from 'semantic-ui-react'

const FetchButton = ({onSubmit, isDisabled}) => (
    <div>
        <Button className={"fetchButton"} onClick={onSubmit} disabled={isDisabled}>
            Get
        </Button>
    </div>

)

export default FetchButton;