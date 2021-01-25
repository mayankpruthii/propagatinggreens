import React from "react";
import "./Welcome.css";

const Welcome = (props) => {
    if(!props.isLogin){
    return(
        <div>
            <div className="cover">
                <p><strong>Propagating Greens</strong></p>
            </div>
            <div className="below-cover">
                <p>
                    End to End seed planting solution which is efficient and scalable for 1000’s of metres of land . We aim to solve the problem of farmers by giving them a simple and intuitive app , which takes in the coordinates of the entire agricultural field and provides a different pattern for automatic seed plantation.
                </p>
                <p>
                    Use password as "propgreens" for now.
                </p>
            </div>
            <button className="login-button" onClick={props.clickHandler}>Login to mark Geo Locations</button>
        </div>
    );
    }
}

export default Welcome;
