import React, { Component } from "react";
import CharacterCard from "./CharacterCard"
import CharacterView from "./CharacterView";
import CharacterCreateForm from "./CharacterCreateForm";
let CHARACTERAPI = 'http://localhost:3000/characters'
let RACEAPI = 'http://localhost:3000/races'
let CLASSESAPI = 'http://localhost:3000/char_classes'

class CharacterContainer extends Component {
    state = {
        isClicked: false,
        currentCharacter: [],
        showForm: false,
        characters: [],
        races: [],
        currentRace: [],
        classes: [],
        currentClass: [],
        charCreated: false,
        successfullyDeleted: []
    }
    handleClick = (id) => {
        this.setState({ isClicked: !this.state.isClicked });
        let character = this.state.characters.find((character) => character.id === id);
        this.setState({ currentCharacter: character });
        let race = this.state.races.find(race => race.id === character.race_id)
        this.setState({ currentRace: race })
        let clas = this.state.classes.find(cla => cla.id === character.class_id)
        this.setState({ currentClass: clas })
    }
    handleFormClick = () => {
        this.setState({ showForm: true })
    }
    componentDidMount() {
        fetch(CHARACTERAPI)
            .then(resp => resp.json())
            .then(characters => this.setState({ characters: characters }))
        fetch(RACEAPI)
            .then(resp => resp.json())
            .then(races => this.setState({ races: races }))
        fetch(CLASSESAPI)
            .then(resp => resp.json())
            .then(classes => this.setState({ classes: classes }))
    }
    hideForm = () => {
        this.setState({showForm: !this.state.showForm})
    }
    handleDelete = (id) => {
        // fetch(CHARACTERAPI + "/" + id, {
        //     method: "DELETE"
        // })
        this.props.reRender()
        fetch(CHARACTERAPI + `/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(id),
        })
    }
    addNewChar = (charObj) => {
        console.log(charObj)
        let charArr = this.state.characters
        charArr.push(charObj)
        this.setState({characters: charArr})
        // fetch(CHARACTERAPI)
        //     .then(resp => resp.json())
        //     .then(characters => this.setState({ characters: characters }))
    }
    reRender = () => {
        console.log('test')
        console.log(this.state.successfullyDeleted)
        let i = this.state.successfullyDeleted
        i++
        this.setState({ successfullyDeleted: i })
    }
    render() {
        return (
            <>
                <button onClick={this.handleFormClick}>New Character</button>
                {this.state.showForm ? <CharacterCreateForm addNewChar={this.addNewChar} hideForm={this.hideForm} /> :
                    this.state.isClicked ? <CharacterView character={this.state.currentCharacter} race={this.state.currentRace} cla={this.state.currentClass} />
                        : this.state.characters.map((character) => <CharacterCard handleDelete={this.handleDelete} image={"https://i.ytimg.com/vi/2Fw3MMcTA4E/maxresdefault.jpg"}
                            character={character} click={() => { this.handleClick(character.id) }} />)
                }
            </>
        )

    }







}
export default CharacterContainer