import React from 'react';
// import { Alert } from 'react-alert'
let SKILLAPI = 'http://localhost:3000/skills'
let CLASSAPI = 'http://localhost:3000/char_classes'
let RACEAPI = 'http://localhost:3000/races'
class ClassTest extends React.Component {
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
        races: [],
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
            .then((skills) => this.setState({ skills: skills }, function () { console.log(this.state.skills[0].description) }))
        fetch(CLASSAPI)
            .then(resp => resp.json())
            .then((classes) => this.setState({ classes: classes }, function () { console.log(this.state.classes[0]) }))
        fetch(RACEAPI)
            .then(resp => resp.json())
            .then((races) => this.setState({ races: races }, function () { console.log(this.state.races[0]) }))
    }
    handleSkills = (event) => {
        let skillArr = this.state.charSkills
        skillArr.push(event.target.value)
        this.setState({ charSkills: skillArr })
    }
    handleProficiencies = (cla, event) => {
        console.log(cla)
        let profArr = this.state.charProficiencies
        if (profArr.length < cla.num_of_proficiency_choices) {
            profArr.push(event.target.value)
            this.setState({ charProficiencies: profArr })
        }
        else alert(`You can only select ${cla.num_of_proficiency_choices} Proficiencies!`)
    }
    barbarianSkills = () => {
        let filteredSkills = []
        this.state.skills.map(skill => skill.name === "Animal Handling" ? filteredSkills.push(skill) : skill.name === "Athletics" ? filteredSkills.push(skill) : skill.name === "Intimidation" ? filteredSkills.push(skill) :
            skill.name === "Nature" ? filteredSkills.push(skill) : skill.name === "Perception" ? filteredSkills.push(skill) : skill.name === "Survival" ? filteredSkills.push(skill) : null)
        this.setState({ filteredSkills: filteredSkills })
    }
    findRace = (raceOption) => {
        let race = this.state.races.filter(race => race.name === raceOption)
        this.setState({ race: race })
    }
    render() {
        const classInfo = this.state.classes.filter(clas => clas.name === this.state.class)
        return (
            <>
                <form>
                    <label>
                        <h1>Create Your Character</h1>
                        <h3>Select Class:</h3>
                        <select value={this.state.value} name={"class"} onChange={this.handleChange}>
                            <option>Select</option>
                            {this.state.classes.map((cla) => (
                                <option value={cla.name}>{cla.name}</option>
                            ))}
                        </select>
                        <br></br>
                        <button>Next</button>
                    </label>
                </form>
                <h4>Starting Proficiencies</h4>
                {classInfo.length > 0 ? classInfo[0].alignment : null}
            </>)
    }
}
export default ClassTest;