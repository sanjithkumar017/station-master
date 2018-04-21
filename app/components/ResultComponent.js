import React from 'react';
import {Grid, Statistic, Table, Icon} from 'semantic-ui-react'

const ResultComponent = ({details}) => (
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
                    <p><b>Train:</b> {details.TRAIN_ID}</p>
                </Grid.Column>
                <Grid.Column className={"centerAll"}>
                    <p><b>Chart Prepared:</b> {details.CHART}</p>
                </Grid.Column>
                <Grid.Column className={"centerAll"}>
                    <p><b>Date of Journey:</b>{details.DOJ}</p>
                </Grid.Column>
                <Grid.Column className={"centerAll"}>
                    <p><b>Travel Class:</b> {details.TRAVEL_CLASS}</p>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row columns={1} className={"centerAll"}>
                <Table basic='very' celled collapsing>

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

)

export default ResultComponent;