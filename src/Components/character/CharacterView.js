import React, { Component } from "react";

class CharacterView extends Component {

    render() {
        return (
            <div>
                <img width={300} height={150} src={this.props.image} alt="charImage"></img>
                <h2>{this.props.name}</h2>
                <h3>{this.props.race}</h3>
                <h3>{this.props.class}</h3>
                <h4>Bio:</h4>
                <text>{this.props.bio}</text>
            </div>
        )

    }
}
export default CharacterView