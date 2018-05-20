import React from 'react';
import {Grid, Statistic, Table, Icon, Button} from 'semantic-ui-react'
import CancelComponent from './CancelComponent'

import PropTypes from 'prop-types'

const ResultComponent = ({details, handlePnrCancel}) => (
    <div className={"pullapart"}>
        <div className={"mainCenter"}>
            <Grid divided='vertically' className={"centerAll"}>

                <Grid.Row columns={3} className={"centerAll"}>
                    <Grid.Column className={"centerAll"}>
                        <Statistic>
                            <Statistic.Value text>
                                {details.FROM_STN_CODE}
                            </Statistic.Value>
                            <Statistic.Label>{details.FROM_STN_NAME}</Statistic.Label>
                        </Statistic>

                    </Grid.Column>
                    <Grid.Column className={"centerAll"}>
                        <Icon name='arrow right' size='huge'/>
                    </Grid.Column>
                    <Grid.Column className={"centerAll"}>
                        <Statistic>
                            <Statistic.Value text>
                                {details.TO_STN_CODE}
                            </Statistic.Value>
                            <Statistic.Label>{details.TO_STN_NAME}</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4} className={"centerAll"}>
                    <Grid.Column className={"centerAll"}>
                        <p>Train: <b>{details.TRAIN_ID}</b></p>
                    </Grid.Column>
                    <Grid.Column className={"centerAll"}>
                        <p>Chart Prepared: <b>{details.CHART}</b></p>
                    </Grid.Column>
                    <Grid.Column className={"centerAll"}>
                        <p>Date of Journey:<b>{details.DOJ}</b></p>
                    </Grid.Column>
                    <Grid.Column className={"centerAll"}>
                        <p>Travel Class:<b> {details.TRAVEL_CLASS}</b></p>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns={1} className={"centerAll"}>
                    <Table basic='very' celled collapsing size={"large"}>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Passengers</Table.HeaderCell>
                                <Table.HeaderCell>Old Status</Table.HeaderCell>
                                <Table.HeaderCell>Current Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {details.PASSENGERS.map((passenger) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            {passenger.number}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {passenger.oldStatus}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {passenger.currentStatus}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                    </Table>
                </Grid.Row>

            </Grid>

        </div>
        <CancelComponent handlePnrCancel={handlePnrCancel}/>
    </div>


)

ResultComponent.propTypes = {
    details: PropTypes.object,
    handlePnrCancel: PropTypes.func
}

export default ResultComponent;