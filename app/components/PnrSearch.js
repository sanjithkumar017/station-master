/**
 * Created by sanjithkumar017 on 15/2/18.
 */
import React from 'react';
import PropTypes from 'prop-types'
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
    "SL": "SLEEPER"
}


class PnrSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pnr: "4554941574",
            loading: false,
            result: false,
            details: {},
            liked: false,
            found: false,
            likesCount: 0
        }

        const likesRef = firebase.database().ref('likes');
        likesRef.on('value', (snapshot) => {
            console.log("This is the snapshot ", snapshot.val());

            this.setState(() => {
                return {
                    likesCount: snapshot.val()["likesCount"]
                }
            })
        });

        this.PnrChange = this.PnrChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.parseData = this.parseData.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handlePnrCancel = this.handlePnrCancel.bind(this)
    }

    componentDidMount() {

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
        console.log("We here ");
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

//Handle all Travel classes
//We need to support mobile view too.
//Some kind of transition on the heart.
//Put a like button and link it to firebase.
//Layout
