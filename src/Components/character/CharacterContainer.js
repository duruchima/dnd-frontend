import React, { Component } from "react";
import CharacterCard from "./CharacterCard"
import CharacterView from "./CharacterView";
import CharacterCreateForm from "./CharacterCreateForm";

class CharacterContainer extends Component {
    state = {
        isClicked: false,
        currentCharacter: "",
        showForm: false
    }
    handleClick = () => {
        this.setState({ isClicked: !this.state.isClicked });
    }
    handleFormClick = () => {
        this.setState({showForm: true})
    }
    render() {
        console.log(this.state)
        return (
            <>
            <button onClick={this.handleFormClick}>New Character</button>
            {this.state.showForm ? <CharacterCreateForm /> :
                this.state.isClicked ? <CharacterView /> : 
                <CharacterCard click={this.handleClick}/>
            }
            </>
        )

    }







}
export default CharacterContainer