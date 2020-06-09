import React from 'react';
let API = 'http://localhost:3000/skills'
class CharacterCreateForm extends React.Component {
    state = {
        skills: [],
        proficiencies: [],
        charSkills: [],
        charProficiencies: [],
        race: "",
        class: ""
    }
    handleChange = (event) => {
        // console.log(event.target.options)
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        fetch(API)
        .then(resp => resp.json())
        .then((skills) => this.setState({skills: skills}, function () {console.log(this.state.skills[0].description)}))
    }
    handleSkills = (event) => {
        let skillArr = this.state.charSkills
        skillArr.push(event.target.value)
        this.setState({charSkills: skillArr})
    }
    handleProficiencies = (event) => {
        let profArr = this.state.charProficiencies
        profArr.push(event.target.value)
        this.setState({charProficiencies: profArr})
    }
    render() {
        console.log(this.state)
        const raceEnabled = this.state.race.length > 0
        const skillEnabled = this.state.class.length > 0
        const proficiencyEnabled = this.state.charSkills.length > 0
        return (
            <form>
                <label>
                    Create Your Character
                <br></br>
                Select Race:
                <select value={this.state.value} name={"race"} onChange={this.handleChange}>
                        <option value="dragonborn">Dragonborn</option>
                        <option value="dwarf">Dwarf</option>
                        <option value="elf">Elf</option>
                        <option value="gnome">Gnome</option>
                        <option value="half-elf">Half-Elf</option>
                        <option value="halfling">Halfling</option>
                        <option value="half-orc">Half-Orc</option>
                        <option value="human">Human</option>
                        <option value="tiefling">Tiefling</option>
                    </select>
                    <br></br>
                Select Class:
                <select disabled={!raceEnabled} value={this.state.value} name={"class"} onChange={this.handleChange}>
                        <option value="barbarian">Barbarian</option>
                        <option value="bard">Bard</option>
                        <option value="cleric">Cleric</option>
                        <option value="druid">Druid</option>
                        <option value="fighter">Fighter</option>
                        <option value="monk">Monk</option>
                        <option value="paladin">Paladin</option>
                        <option value="ranger">Ranger</option>
                        <option value="rogue">Rogue</option>
                        <option value="sorcerer">Sorcerer</option>
                        <option value="warlock">Warlock</option>
                        <option value="wizard">Wizard</option>
                    </select>
                    <br></br>
                    Select Skills
                    <select disabled={!skillEnabled}multiple={true} value={this.state.charSkills} name={"skill"} onChange={this.handleSkills}>
                        {this.state.skills.map((skill) => (
                            <option value={skill.name}>{skill.name}</option>
                        ))}
                    </select>
                    <br></br>
                    Select Proficiencies
                    <select disabled={!proficiencyEnabled} multiple={true} value={this.state.charProficiencies} onChange={this.handleProficiencies}>
                        <option value="prof1">Proficiency 1</option>
                        <option value="prof2">Proficiency 2</option>
                        <option value="prof3">Proficiency 3</option>
                        <option value="prof4">Proficiency 4</option>
                        <option value="prof5">Proficiency 5</option>
                    </select>
                </label>
            </form>)
    }
}
export default CharacterCreateForm;