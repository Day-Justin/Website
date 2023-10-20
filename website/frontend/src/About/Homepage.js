import React from 'react'
import { useToggle } from './../Customhooks/useToggle';
import { useGetApi } from '../Customhooks/useGetApi';

function Homepage(){
    const [catFact, toggle] = useToggle();
    const [catData, catRefetch] = useGetApi('https://catfact.ninja/fact');

    return(
        <div>
            <h1>homepage</h1>
            <button onClick={toggle}>{catFact ? "Hide" : "Show Cat Fact"}</button>
            {catFact &&<p>{catData?.fact}
            <button onClick={catRefetch} >Get Cat Fact</button></p>}
            </div>
    );
}

export default Homepage;