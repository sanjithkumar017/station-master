/**
 * Created by sanjithkumar017 on 15/2/18.
 */
import React from 'react';

import SearchComponent from './SearchComponent';
import ResultComponent from './ResultComponent';
import MenuComponent from './MenuComponent';
import NotFound from './NotFound';
import fetchPnr from '../utils/api';
import firebase from '../utils/firebase'
import {Dimmer, Loader} from 'semantic-ui-react'

const LOGO_URL = 'https://react.semantic-ui.com/logo.png'
const PLACEHOLDER_TEXT = 'Please enter the PNR'

const JOURNEY_CLASS_MAPPER = {
    "SL": "SLEEPER",
    "2A": "2 TIER AC",
    "3A": "3 TIER AC",
}


class PnrSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pnr: "2446473018",
            loading: false,
            result: false,
            details: {},
            liked: false,
            found: false,
            likesCount: 0
        }
        this.likesRef = firebase.database().ref('likes');


        this.PnrChange = this.PnrChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.parseData = this.parseData.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handlePnrCancel = this.handlePnrCancel.bind(this)
    }

    componentDidMount() {

        this.likesRef.on('value', (snapshot) => {
            console.log("This is the snapshot ", snapshot.val());

            this.setState(() => {
                return {
                    likesCount: snapshot.val()["likesCount"]
                }
            })
        });
    }

    handleClick(event, data) {

        //make an API call.
        this.setState(() => {
            return {
                loading: true
            }
        })
        fetchPnr(this.state.pnr)
            .then((data) => {

                //Call the function to parse the data
                console.log("Got data ", data);
                let parsedData = this.parseData(data)
                if (!parsedData.FROM_STN_CODE && !parsedData.TO_STN_CODE) {
                    this.setState(() => {
                        return {
                            loading: false,
                            result: true,
                            details: parsedData,
                            found: false
                        }
                    })

                } else {
                    this.setState(() => {
                        return {
                            loading: false,
                            result: true,
                            details: parsedData,
                            found: true
                        }
                    })
                }

            })


    };

    parseData(data) {

        const parsedData = {}
        parsedData["FROM_STN_CODE"] = data.from_station.code;
        parsedData["FROM_STN_NAME"] = data.boarding_point.name;
        parsedData["TO_STN_CODE"] = data.to_station.code;
        parsedData["TO_STN_NAME"] = data.reservation_upto.name;

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


        return parsedData
    }

    PnrChange(event, data) {

        //It is a string. If it exceeds length 9 we can trigger a hit.
        this.setState(() => {
            return {pnr: data.value}
        })

    }

    handleMenuClick() {
        const likesRef = firebase.database().ref('likes');

        likesRef.update({likesCount: (this.state.likesCount + 1)})
            .then(() => {
                console.log("Was it done?");
            })

        this.setState(() => {
            return {
                liked: true
            }
        })

    }

    handlePnrCancel() {

        this.setState(() => {
            return {
                loading: false,
                result: false
            }
        })


        this.setState(() => {
            return {
                bgcolor: "black"
                , color: "yellow"
            }
        })

    }


    render() {

        return (
            <div className={"containerflex"}>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <MenuComponent handleItemClick={this.handleMenuClick} liked={this.state.liked}
                               likesCount={this.state.likesCount}/>

                {this.state.result ? (this.state.found ?
                    <ResultComponent details={this.state.details} handlePnrCancel={this.handlePnrCancel}/> :
                    <NotFound handlePnrCancel={this.handlePnrCancel}/>) :
                    <SearchComponent logo={LOGO_URL} placeHolderText={PLACEHOLDER_TEXT} onPnrChange={this.PnrChange}
                                     pnrValue={this.state.pnr}
                                     onhandleClick={this.handleClick}/>}
            </div>
        )
    }
}


export default PnrSearch;


//TODO

//Can we further optimise displaying from-to and boarding-reservation-upto
//Faster GET likes
//Does'nt look good on moz
//Make it take only 1 like
//Handle all Travel classes
//We need to support mobile view too.
//Layout
