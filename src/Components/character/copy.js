import React from 'react';
// import { Alert } from 'react-alert'
let SKILLAPI = 'http://localhost:3000/skills'
let CLASSAPI = 'http://localhost:3000/char_classes'
let RACEAPI = 'http://localhost:3000/races'
class CharacterCreateForm extends React.Component {
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
        filteredSkills: []
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
    render() {
        console.log(this.state.class.name)
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
        return (
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
                <h3>Select Class:</h3>
                <select disabled={!raceEnabled} value={this.state.value} name={"class"} onChange={this.handleChange}>
                        <option>Select</option>
                        {this.state.classes.map((cla) => (
                            <option value={cla.name}>{cla.name}</option>
                        ))}
                    </select>
                    <br></br>
                    <h3>Select Skills:</h3>
                    <select disabled={!skillEnabled}multiple={true} value={this.state.charSkills} name={"skill"} onClick={this.barbarianSkills} onChange={this.handleSkills}>
                        {this.state.skills.map((skill) => (
                            <option value={skill.name}>{skill.name}</option>
                        ))}
                    </select>
                    <br></br>
                    <h3>Proficiencies:</h3>
                        {this.state.class === "Barbarian" ? <> <h4>Select {barbarian.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(barbarian, event)}>
                        {this.state.filteredSkills.map(skill => <option value={skill.name}>{skill.name}</option>)}
                        
                    </select> </> : null}
                    {this.state.class === "Bard" ? <><h4>Select {bard.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(bard, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Cleric" ? <><h4>Select {cleric.num_of_proficiency_choices} Proficiencies</h4>  <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(cleric, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </>: null}
                    <br></br>
                    {this.state.class === "Druid" ? <><h4>Select {druid.num_of_proficiency_choices} Proficiencies</h4>  <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(druid, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Fighter" ? <><h4>Select {fighter.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(fighter, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Monk" ? <><h4>Select {monk.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(monk, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </>: null}
                    <br></br>
                    {this.state.class === "Paladin" ? <><h4>Select {paladin.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(paladin, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </>: null}
                    <br></br>
                    {this.state.class === "Ranger" ? <><h4>Select {ranger.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(ranger, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Rogue" ? <><h4>Select {rogue.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(rogue, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Sorcerer" ? <><h4>Select {sorcerer.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(sorcerer, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Warlock" ? <><h4>Select {warlock.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(warlock, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    {this.state.class === "Wizard" ? <><h4>Select {wizard.num_of_proficiency_choices} Proficiencies</h4> <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={(event) => this.handleProficiencies(wizard, event)}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    <h3>Character Bio</h3>
                    <textarea type="text" name="charBio" value={this.state.charBio} placeholder="Please write a detailed bio and backstory for your character" onChange={this.handleChange}></textarea> 
                    <br></br>
                <button>Create Character</button>
                </label>
            </form>)
    }
}
export default CharacterCreateForm;