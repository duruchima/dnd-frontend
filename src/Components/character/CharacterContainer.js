import React, { Component } from "react";
import CharacterCard from "./CharacterCard"
import CharacterView from "./CharacterView";
import CharacterCreateForm from "./CharacterCreateForm";
import Test from "./Test";

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
                this.state.isClicked ? <CharacterView image={"https://i.ytimg.com/vi/2Fw3MMcTA4E/maxresdefault.jpg"} name={"Awesome Paladin"} class={"Paladin"} race={"Human"} bio={"lorem ipsum ad nauseum"} /> : 
                <CharacterCard image={"https://i.ytimg.com/vi/2Fw3MMcTA4E/maxresdefault.jpg"}
                name={"Awesome Paladin"}  click={this.handleClick}/>
            }
            </>
            // <Test/>
        )

    }







}
export default CharacterContainer