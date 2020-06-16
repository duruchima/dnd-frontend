import React, { Component } from "react";
import Button from '@material-ui/core/Button'
let CHARACTERAPI = 'http://localhost:3000/characters'

class CharacterCard extends Component {
    render() {
        return (
            <>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <div onClick={this.props.click}>
                    <img width={250} height={150} src={this.props.image} alt="charImage"></img>
                    <h2>{this.props.character.name}</h2>
                </div>
                <Button variant="contained" color="secondary" onClick={() => { this.props.handleDelete(this.props.character.id) }}>Delete Character</Button>
            </>
        )

    }







}
export default CharacterCard