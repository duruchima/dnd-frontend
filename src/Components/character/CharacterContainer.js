import React, { Component } from "react";
import CharacterCard from "./CharacterCard"
import CharacterView from "./CharacterView";
import CharacterCreateForm from "./CharacterCreateForm";
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CharacterCreateFormDupe from "./CharacterCreateFormDupe"
import Card from '@material-ui/core/Card';
import LogIn from '../login/Login.js'
let CHARACTERAPI = 'http://localhost:3000/characters'
let RACEAPI = 'http://localhost:3000/races'
let CLASSESAPI = 'http://localhost:3000/char_classes'
let SKILLSAPI = 'http://localhost:3000/skills'
let USERSAPI = 'http://localhost:3000/users'

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
        successfullyDeleted: [],
        skills: [],
        skillCharJoin: [],
        loginClicked: false,
        username: "",
        password: "",
        currentUser: "",
        users: []
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
        fetch(SKILLSAPI)
            .then(resp => resp.json())
            .then(skills => this.setState({ skills: skills }))
        fetch(USERSAPI)
            .then(resp => resp.json())
            .then(users => this.setState({ users: users }))
    }
    fetchCharacters = () => {
        fetch(CHARACTERAPI)
            .then(resp => resp.json())
            .then(characters => this.setState({ characters: characters }))
    }
    hideForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }
    handleDelete = (id) => {
        fetch(CHARACTERAPI + `/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(id),
        })
            .then(res => this.fetchCharacters())
    }
    addNewChar = (charObj) => {
        console.log(charObj)
        let charArr = [...this.state.characters, charObj]
        // charArr.push(charObj)
        this.setState({ characters: charArr, showForm: false })
        this.fetchCharacters()
        // fetch(CHARACTERAPI)
        //     .then(resp => resp.json())
        //     .then(characters => this.setState({ characters: characters }))
    }
    goHome = () => {
        this.setState({ isClicked: false })
        this.setState({ showForm: false })
    }
    updateChar = (newChar) => {
        let newState = this.state.characters.map(character => {
            if (character.id === newChar.id) {
                return character = newChar
            } //closes if 
            else {
                return character
            }//closes else
        })//closes map
        this.setState({ characters: newState })
        this.setState({ isClicked: false })
    }
    handleLoginChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state.username)
    }
    onSubmitClick = (e) => {
        e.preventDefault();
        console.log("hitsubmit")
        const loginThisUser = this.state.users.find(
            (user) => user.username === this.state.username
        );
        loginThisUser
            ? this.setState({ currentUser: loginThisUser, loginClicked: true })
            : alert("No user with that username and password combo!");
    };
    handleLogOut = () => {
        this.setState({currentUser: "", loginClicked: false})
    }
    render() {
        console.log(this.state.currentUser)
        return (
            <>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                {!this.state.loginClicked ? <LogIn handleChange={this.handleLoginChange} handleSubmit={this.onSubmitClick} />
                :
                    <>
                        {this.state.isClicked || this.state.showForm ? <Button variant="contained" color="primary" onClick={this.goHome}>Home Page</Button> : <><Button variant="contained" color="primary" onClick={this.handleFormClick}>New Character</Button> <Button onClick={this.handleLogOut} style={{ marginLeft: "1500px" }} variant="contained" color="primary">Log Out</Button> </>}
                        {this.state.showForm ?
                            <CharacterCreateForm addNewChar={this.addNewChar} fetchCharacters={this.fetchCharacters} hideForm={this.hideForm} />
                            : this.state.isClicked ?
                                <CharacterView updateChar={this.updateChar} character={this.state.currentCharacter} skills={this.state.skills} race={this.state.currentRace} cla={this.state.currentClass} joins={this.state.skillCharJoin} image={"https://i.ytimg.com/vi/2Fw3MMcTA4E/maxresdefault.jpg"} />
                                : <Grid container spacing={5}> {this.state.characters.map((character) => <Grid item xs={6} x={6} lg={3} xl={3}>
                                    <CharacterCard key={character.id} handleDelete={this.handleDelete} image={character.img_url}
                                        character={character} click={() => { this.handleClick(character.id) }} /> </Grid>)} </Grid>
                        }</> 
                    
                        
                }
            </>
        )

    }

}
export default CharacterContainer