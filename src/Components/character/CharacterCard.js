import React, { Component } from "react";

class CharacterCard extends Component {
    render() {
        return (
                <div onClick={this.props.click}>
                    <img width={250} height={150} src={this.props.image} alt="charImage"></img>
                    <h2>{this.props.name}</h2>
                </div>
        )

    }







}
export default CharacterCard