import React, { Component } from "react";

class EditCharacterForm extends Component {

    render() {
        return (
            <div>
                <img width={300} height={150} src={this.props.image} alt="charImage"></img>
                <h2>{this.props.character.name}</h2>
                <h3>{this.props.race.name}</h3>
                <h3>{this.props.cla.name}</h3>
                <h3>Stats:</h3>
                <text><b>Level:</b>{this.props.character.level}</text>
                <br></br>
                <text><b>Strength:</b> {this.props.character.strength}</text>
                <br></br>
                <text><b>Dexterity:</b> {this.props.character.dexterity}</text>
                <br></br>
                <text><b>Constitution:</b> {this.props.character.constitution}</text>
                <br></br>
                <text><b>Intelligence:</b> {this.props.character.intelligence}</text>
                <br></br>
                <text><b>Wisdom:</b> {this.props.character.wisdom}</text>
                <br></br>
                <text><b>Charisma:</b> {this.props.character.charisma}</text>
                <br></br>
                <text><b>Hitpoints:</b> {this.props.character.hitpoints}</text>
                <br></br>
                <h4>Bio:</h4>
                <text>{this.props.character.bio}</text>
                <br></br>
                <button>Edit Character</button>
            </div>
        )

    }
}
export default EditCharacterForm