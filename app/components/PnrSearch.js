/**
 * Created by sanjithkumar017 on 15/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types'
import SearchComponent from './SearchComponent';
import ResultComponent from './ResultComponent';
import MenuComponent from './MenuComponent';
import fetchPnr from '../utils/api'
import {Dimmer, Loader} from 'semantic-ui-react'

const LOGO_URL = 'https://react.semantic-ui.com/logo.png'
const PLACEHOLDER_TEXT = 'Please enter the PNR'

const JOURNEY_CLASS_MAPPER = {
    "SL": "SLEEPER"
}


class PnrSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pnr: "",
            loading: false,
            result: false,
            details: {}
        }

        this.PnrChange = this.PnrChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.parseData = this.parseData.bind(this)
    }

    componentDidMount() {

    }

    handleClick(event, data) {
        console.log("This is the submit ", RAIL_KEY, RAIL_URL);
        //make an API call.
        this.setState(() => {
            return {
                loading: true
            }
        })
        fetchPnr(this.state.pnr)
            .then((data) => {
                console.log("Tis is data ", JSON.stringify(data));
                //Call the function to parse the data
                let parsedData = this.parseData(data)
                this.setState(() => {
                    return {
                        loading: false,
                        result: true,
                        details: parsedData
                    }
                })
            })


    };

    parseData(data) {

        const parsedData = {}
        parsedData["FROM_STN_CODE"] = data.from_station.code;
        parsedData["FROM_STN_NAME"] = data.from_station.name;
        parsedData["TO_STN_CODE"] = data.to_station.code;
        parsedData["TO_STN_NAME"] = data.to_station.name;

        parsedData["CHART"] = data.chart_prepared ? "PREPARED" : "NOT PREPARED";
        parsedData["TRAVEL_CLASS"] = JOURNEY_CLASS_MAPPER[data.journey_class.code];
        parsedData["TRAIN_ID"] = data.train.number + "/" + data.train.name;
        parsedData["DOJ"] = data.doj;

        let passengersList = []
        data.passengers.map((passenger) => {
            const tempObj = {}
            tempObj["number"] = passenger.no;
            tempObj["oldStatus"] = passenger.booking_status;
            tempObj["currentStatus"] = passenger.current_status;
            passengersList.push(tempObj)
        })

        parsedData["PASSENGERS"] = passengersList;

        console.log("This is the parseData ", JSON.stringify(parsedData));
        return parsedData
    }

    PnrChange(event, data) {
        console.log("This is the update ", data.value);
        //It is a string. If it exceeds length 9 we can trigger a hit.
        this.setState(() => {

            return {pnr: data.value}


        })

    }


    render() {

        return (
            <div className={"containerflex"}>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <MenuComponent/>

                {this.state.result ? <ResultComponent details={this.state.details}/> :
                    <SearchComponent logo={LOGO_URL} placeHolderText={PLACEHOLDER_TEXT} onPnrChange={this.PnrChange}
                                     pnrValue={this.state.pnr}
                                     onhandleClick={this.handleClick}/>}
            </div>
        )
    }
}


export default PnrSearch;


//TODO
//Put the code on Github.
//We need to support mobile view too.
//Put a like button and link it to firebase.
//Layout
