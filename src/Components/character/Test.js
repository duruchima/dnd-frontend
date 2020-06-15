import React from 'react';
// import { Alert } from 'react-alert'
let SKILLAPI = 'http://localhost:3000/skills'
let CLASSAPI = 'http://localhost:3000/char_classes'
let RACEAPI = 'http://localhost:3000/races'
class Test extends React.Component {
    state = {
        charName: "",
        skills: [],
        proficiencies: [],
        charSkills: [],
        charProficiencies: [],
        race: "",
        class: "",
        charBio: "",
        classes: [],
        races:[],
        filteredSkills: [],
        newRace: []
    }
    handleChange = (event) => {
        // console.log(event.target.options)
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        fetch(SKILLAPI)
        .then(resp => resp.json())
        .then((skills) => this.setState({skills: skills}, function () {console.log(this.state.skills[0].description)}))
        fetch(CLASSAPI)
        .then(resp => resp.json())
        .then((classes) => this.setState({classes: classes}, function () {console.log(this.state.classes[0])}))
        fetch(RACEAPI)
        .then(resp => resp.json())
        .then((races) => this.setState({races: races}, function () {console.log(this.state.races[0])}))
    }
    handleSkills = (event) => {
        let skillArr = this.state.charSkills
        skillArr.push(event.target.value)
        this.setState({charSkills: skillArr})
    }
    handleProficiencies = (cla, event) => {
        console.log(cla)
        let profArr = this.state.charProficiencies
        if (profArr.length < cla.num_of_proficiency_choices){
        profArr.push(event.target.value)
        this.setState({charProficiencies: profArr})}
        else alert(`You can only select ${cla.num_of_proficiency_choices} Proficiencies!`)
    }
    barbarianSkills = () => {
        let filteredSkills = []
        this.state.skills.map(skill => skill.name === "Animal Handling" ? filteredSkills.push(skill) : skill.name === "Athletics" ? filteredSkills.push(skill) : skill.name === "Intimidation" ? filteredSkills.push(skill):
        skill.name === "Nature" ? filteredSkills.push(skill) : skill.name === "Perception" ? filteredSkills.push(skill) : skill.name === "Survival" ? filteredSkills.push(skill) : null)
        this.setState({filteredSkills: filteredSkills})
    }
    findRace =(raceOption) => {
        let race = this.state.races.filter(race => race.name === raceOption)
        this.setState({race: race})
    }
    render() {
        console.log(this.state)
        const raceEnabled = this.state.race.length > 0
        const skillEnabled = this.state.class.length > 0
        const proficiencyEnabled = this.state.charSkills.length > 0
        const barbarian = this.state.classes.find(cla => cla.name === "Barbarian")
        const bard = this.state.classes.find(cla => cla.name === "Bard")
        const cleric = this.state.classes.find(cla => cla.name === "Cleric")
        const druid = this.state.classes.find(cla => cla.name === "Druid")
        const fighter = this.state.classes.find(cla => cla.name === "Fighter")
        const monk = this.state.classes.find(cla => cla.name === "Monk")
        const paladin = this.state.classes.find(cla => cla.name === "Paladin")
        const ranger = this.state.classes.find(cla => cla.name === "Ranger")
        const rogue = this.state.classes.find(cla => cla.name === "Rogue")
        const sorcerer = this.state.classes.find(cla => cla.name === "Sorcerer")
        const warlock = this.state.classes.find(cla => cla.name === "Warlock")
        const wizard = this.state.classes.find(cla => cla.name === "Wizard")
        const raceInfo = this.state.races.filter(race => race.name === this.state.race)
        return (
            <>
            <form>
                <label>
                    <h1>Create Your Character</h1>
                <br></br>
                <h3>Enter Character Name</h3>
                <input type="text" onChange={this.handleChange} name={"charName"}value={this.state.charName} placeholder="Character Name"/>
                <br></br>
                <h3>Select Race:</h3>
                <select value={this.state.value} name={"race"} onChange={this.handleChange}>
                        <option>Select</option>
                        {this.state.races.map((race) => (
                            <option value={race.name}>{race.name}</option>
                        ))}
                    </select>
                    <br></br>
                <button>Next</button>
                </label>
            </form>
            <h4>Race Alignment</h4>
            {raceInfo.length > 0 ? raceInfo[0].alignment : null}
            </>)
    }
}
export default Test;