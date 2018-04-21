import React from 'react';
import Logo from './Logo';
import NumberInput from './NumberInput';
import FetchButton from './FetchButton';

const SearchComponent = ({logo, placeHolderText, onPnrChange, pnrValue, onhandleClick}) => (
    <div className={"testmeup"}>
        <h1 className={"title"}>JOBS FILL YOUR POCKET, BUT ADVENTURES FILL YOUR SOUL.</h1>
        <NumberInput
            placeholder={placeHolderText}
            onChange={onPnrChange}
            value={pnrValue}
        />
        <FetchButton isDisabled={pnrValue.length !== 10 ? true : false} onSubmit={onhandleClick}/>
    </div>

)

export default SearchComponent;