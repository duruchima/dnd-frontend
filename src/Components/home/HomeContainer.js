import React, { Component } from "react";
import CharacterContainer from "../character/CharacterContainer";

class HomeContainer extends Component {
state={
    value: 1
}
handleChange = () => {
    // let newVal = this.state.value +1
    this.setState({state: this.state})
    console.log("HomeContainer")
}
    render() {
        
        return (
            <CharacterContainer reRender={this.handleChange}/>
        )
    
    }


}
export default HomeContainer