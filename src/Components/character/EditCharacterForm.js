import React, { Component } from "react";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

let CHARACTERAPI = 'http://localhost:3000/characters'
class EditCharacterForm extends Component {
    state = {
        charName: this.props.character.name,
        charBio: this.props.character.bio,
        charImg: this.props.character.img_url,
        updatedChar: []
    }
    handleSubmit = (event) => {
        event.preventDefault()
        fetch(CHARACTERAPI + `/${this.props.character.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: this.state.charName,
                bio: this.state.charBio,
                img_url: this.state.charImg
            }) //closes body
        }) // closes fetch
            .then(resp => resp.json())
            .then(newChar => {this.props.updateChar(newChar)    
        }) //closes second.then
    } //closes submit
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        return (

            <FormControl style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <label>
                    <h1>Edit Your Character</h1>
                    <br></br>
                    <h3>Enter Character Name</h3>
                    <TextField variant="outlined" onChange={this.handleChange} name={"charName"} value={this.state.charName} placeholder="Character Name" />
                    <br></br>
                    <h4>Bio:</h4>
                    <TextField onClick={this.handleChange} id="character-backstory" name="charBio" label="Please write a descriptive backstory for your character" multiline rowsMax={5} value={this.state.charBio} variant="outlined" />
                    <h4>Character Image:</h4>
                    <TextField onClick={this.handleChange} id="character-image" name="charImg" label="Add an image url for your character" value={this.state.charImg} variant="outlined" />
                </label>
                <Button color="primary" variant={"contained"} onClick={this.handleSubmit}>Save</Button>
            </FormControl>

        )

    }
}
export default EditCharacterForm