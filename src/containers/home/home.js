import React from "react";
import Aux from "../../hoc/hoc";
import Welcome from "../../components/Welcome/Welcome";
import Geolocation from "../geolocation/geolocation";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    clickHandler = () => {
        var loginPassInput = prompt("Enter Password", "");
        if(loginPassInput === "propgreens"){
            this.setState({isLogin: true});
        }
        else{
            alert("Wrong Password! Please Try Again")
            this.clickHandler();
        }
    }

    render() {
        if(this.state.isLogin) {
            return(
                <Aux>
                    <Geolocation isLogin={this.state.isLogin} />
                </Aux>
            )
        }
        else {
            return(
                <Aux>
                    <Welcome isLogin={this.state.isLogin} clickHandler={this.clickHandler} />
                </Aux>
            )
        }
    }
}

export default Home;