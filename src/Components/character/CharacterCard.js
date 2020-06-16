import React, { Component } from "react";
let CHARACTERAPI = 'http://localhost:3000/characters'
class CharacterCard extends Component {
    render() {
        return (
            <>
                <div onClick={this.props.click}>
                    <img width={250} height={150} src={this.props.image} alt="charImage"></img>
                    <h2>{this.props.character.name}</h2>
                </div>
                <button onClick={() => {this.props.handleDelete(this.props.character.id)}}>Delete Character</button>
            </>
        )

    }







}
export default CharacterCard