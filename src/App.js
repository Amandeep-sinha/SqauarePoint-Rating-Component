import React from 'react';
import './App.css';
import 'h8k-components';
import Rating from "./components/Rating";

const title = "Rating Component";

const App = () => {
    const emptyIcon =  '/icons/stars/empty.svg';
    const filledIcon =  '/icons/stars/filled.svg';
    const halfFilledIcon =  '/icons/stars/half.svg';

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>

            <div className="flex align-items-center justify-content-center container">
                <div className="card pa-16">
                    <Rating 
                        value={3.5}
                        emptyIcon={emptyIcon}
                        filledIcon={filledIcon}
                        halfFilledIcon={halfFilledIcon}
                        steps={0.5}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
