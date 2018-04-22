import React from 'react';
import {Message} from 'semantic-ui-react'
import CancelComponent from './CancelComponent'

const NotFound = ({handlePnrCancel}) => (
    <div className={"centerAll"}>
        <h1 className={"highlight"}>404</h1>
        <h3 className={"highlight-message"}>ummm, Please check the PNR again and make sure the Date of Journey is in the future.</h3>
        <CancelComponent handlePnrCancel={handlePnrCancel}/>
    </div>
)

export default NotFound;
