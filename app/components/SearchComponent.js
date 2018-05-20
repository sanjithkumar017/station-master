import React from 'react';
import NumberInput from './NumberInput';
import FetchButton from './FetchButton';
import getRandom from '../utils/getRandomNumbers'

import PropTypes from 'prop-types'

const QUOTES = [{quote: "JOBS FILL YOUR POCKET, BUT ADVENTURES FILL YOUR SOUL.", by: "Jaime Lyn Beatty"},
    {quote: "ONCE A YEAR GO SOMEPLACE YOU'VE NEVER BEEN BEFORE.", by: "Dalai Lama XIV"},
    {quote: "NOT UNTIL WE ARE LOST DO WE BEGIN TO UNDERSTAND OURSELVES.", by: "Henry David Thoreau"},
    {quote: "THE JOURNEY NOT THE ARRIVAL MATTERS.", by: "T.S. Eliot"},
    {quote: "I LOVE TO TRAVEL, BUT HATE TO ARRIVE.", by: "Albert Einstein"},
    {quote: "WE WANDER FOR DISTRACTION, BUT WE TRAVEL FOR FULFILMENT.", by: "J.R.R. Tolkein"},
    {quote: "Not all those who wander are lost.", by: "Hilaire Belloc"},
    {
        quote: "We live in a world that is full of beauty, charm and adventure." +
        " There is no end to the adventures we can have if only we seek them with our eyes open.",
        by: "Jawaharlal Nehru"
    }]
const index = getRandom(0, QUOTES.length)

const SearchComponent = ({placeHolderText, onPnrChange, pnrValue, onhandleClick}) => (
    <div className={"testmeup"}>
        <div>
            <h1 className={"title"}>{QUOTES[index]["quote"]}</h1>
            <h3 className={"by"}>{QUOTES[index]["by"]}</h3>
        </div>

        <NumberInput
            placeholder={placeHolderText}
            onChange={onPnrChange}
            value={pnrValue}
        />
        <FetchButton isDisabled={pnrValue.length !== 10 ? true : false} onSubmit={onhandleClick}/>
    </div>

)

SearchComponent.propTypes = {
    placeHolderText: PropTypes.string,
    onPnrChange: PropTypes.func,
    pnrValue: PropTypes.string,
    onhandleClick: PropTypes.func
}

export default SearchComponent;