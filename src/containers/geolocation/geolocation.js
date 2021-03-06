import React from 'react';
import "./geolocation.css";
import axios from "axios";

class Geolocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: [],
            long: [],
            currLat: null,
            currLong: null,
            currentCount: 4,
            showContinueButton: false,
            response: [],
            noGridFound: true
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.continueButtonHandler = this.continueButtonHandler.bind(this);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.getCoordinates, 
                this.handleLocationError, 
                {enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 50}
            );
                if(this.state.currentCount > 0) {
                    // console.log(this.state.showContinueButton);
                    return;
                }
                else{
                    // console.log(this.state.showContinueButton);
                    this.setState({showContinueButton: true});
                }
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates(position) {
        if(position.coords.latitude == this.state.currLat && position.coords.longitude == this.state.currLong) {
            return;
        }
        this.setState(prevState => ({
            lat: [...prevState.lat, position.coords.latitude],
            long: [...prevState.long, position.coords.longitude],
            currLat: position.coords.latitude,
            currLong: position.coords.longitude,
            currentCount: this.state.currentCount - 1
        }));
        // console.log(this.state.lat);    
    }

    handleLocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default: ;      
        }
    }

    continueButtonHandler() {
        const obj = {
            cood : [],
            distance: 5
        }

        for(let i = 0 ; i < this.state.lat.length ; i ++) {
            obj.cood = obj.cood.concat([[this.state.lat[i], this.state.long[i]]]);
        }
        
        // var data = JSON.stringify(obj);   
        // console.log(data);
        axios.post(`https://pointdedo.herokuapp.com/pointsdedo`, obj)
        .then(res => {
            const data = res.data;  
            this.setState({response: data.cood});
            if(res.data.length === 0) {
                this.setState({noGridFound: false});
            }
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <div className="geolocationContainer">
                <h2>
                    Your Geolocation
                </h2>
                <button onClick={this.getLocation}>
                    Get Coordinates
                </button>
                <ul>
                    {this.state.lat.map((_, index) => {
                        return (
                        <div>
                            <p>Latitude: {this.state.lat[index]} Longitude: {this.state.long[index]}</p>
                            <br/>
                        </div>
                    )})}
                </ul>

                {this.state.showContinueButton? <button onClick={this.continueButtonHandler}>Continue?</button> : <p>Need {this.state.currentCount} more locations</p>}
                {this.state.response.map((_, index) => {
                    return (
                    <div>
                        <p><i>Grid Coordinate #{index}</i> : {this.state.response[index][0]} , {this.state.response[index][1]}</p>
                        <br/>
                    </div>
                    )}
                )}
                {!this.state.noGridFound?<p>No Grid Possible for the given coordinates. Refresh the page and try again with different coordinates</p>: ""}
            </div>
        )
    }

}

export default Geolocation;