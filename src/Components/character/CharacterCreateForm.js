import React from 'react';
let SKILLAPI = 'http://localhost:3000/skills'
let CLASSAPI = 'http://localhost:3000/char_classes'
let RACEAPI = 'http://localhost:3000/races'
let CHARACTERAPI = 'http://localhost:3000/characters'
let CLASSCHARACTERJOIN = 'http://localhost:3000/class_chars'
let SKILLCHARS = 'http://localhost:3000/skill_character_joins'
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
        races: [],
        characterID: "",
        currentRaceObj: [],
        currentCharObj: [],
        currentClassObj: [],
        currentSkillObjs: []
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
    // handleSkills = (event) => {
    //     let skillArr = this.state.charSkills
    //     skillArr.push(event.target.value)
    //     this.setState({ charSkills: skillArr })
    // }
    handleSkills = (event) => {
        let clas = this.state.classes.find(cla => cla.name === this.state.class)
        let skillArr = this.state.charSkills
        if (skillArr.length < clas.num_of_proficiency_choices) {
            skillArr.push(event.target.value)
            this.setState({ charSkills: skillArr })
        }
        else alert(`You can only select ${clas.num_of_proficiency_choices} Skills!`)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        fetch(CHARACTERAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({
                user_id: 1,
                race_id: this.state.currentRaceObj.id,
                name: this.state.charName,
                bio: this.state.charBio,
                class_id: this.state.currentClassObj.id
            })
        })//closes character post
        .then(response => response.json())
        .then(charObj => {this.setState({currentCharObj: charObj})})
        .then(data => {this.postCharSkillsJoin()})

        // fetch(CLASSCHARACTERJOIN, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         accept: "application/json"
        //     },
        //     body: JSON.stringify({
        //         characters_id: this.state.currentCharObj.id,
        //         char_classes_id: this.state.currentClassObj.id
        //     })//closes body
        // })//closes classcharacterjoin
        // this.state.currentSkillObjs.map(skill => 
        //     fetch(SKILLCHARS, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             accept: "application/json"
        //         },
        //         body: JSON.stringify({
        //             characters_id: this.state.currentCharObj.id,
        //             skills_id: skill.id
        //         })
        //     }))
        // this.postCharClassJoin()
        this.postCharSkillsJoin()
    }//closes handleSubmit
    postCharSkillsJoin = () => {
        this.state.currentSkillObjs.map(skill => 
            fetch(SKILLCHARS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                body: JSON.stringify({
                    character_id: this.state.currentCharObj.id,
                    skill_id: skill.id
                })
            }))
    }
    handleRace = () => {
        let race = this.state.races.find( race => race.name === this.state.race)
        this.setState({currentRaceObj: race})
    }
    handleClass = () => {
        let cla = this.state.classes.find(cla => cla.name === this.state.class)
        this.setState({currentClassObj: cla})
    }
    handleSkillState = () => {
        let newSkillArr = this.state.charSkills.map(skill => this.state.skills.find(ski => ski.name === skill))
        this.setState({currentSkillObjs: newSkillArr})
    }
    render() {
        const raceEnabled = this.state.race.length > 0
        const skillEnabled = this.state.class.length > 0
        const proficiencyEnabled = this.state.charSkills.length > 0
        const classInfo = this.state.classes.find(cla => cla.name === this.state.class)
        console.log(this.state.currentClassObj)
        return (
            <form>
                <label>
                    <h1>Create Your Character</h1>
                    <br></br>
                    <h3>Enter Character Name</h3>
                    <input type="text" onChange={this.handleChange} name={"charName"} value={this.state.charName} placeholder="Character Name" />
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
                    <select disabled={!raceEnabled} value={this.state.value} name={"class"} onClick={this.handleRace} onChange={this.handleChange}>
                        <option>Select</option>
                        {this.state.classes.map((cla) => (
                            <option value={cla.name}>{cla.name}</option>
                        ))}
                    </select>
                    <br></br>
                    <h3>Skills:</h3>
                    {this.state.class === "Barbarian" ? <> <h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="Animal Handling">Animal Handling</option>
                        <option value="Athletics">Athletics</option>
                        <option value="Intimidation">Intimidation</option>
                        <option value="Nature">Nature</option>
                        <option value="Perception">Perception</option>
                        <option value="Survival">Survival</option>

                    </select> </> : null}
                    {this.state.class === "Bard" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="Acrobatics">Acrobatics</option>
                        <option value="Animal Handling">Animal Handling</option>
                        <option value="Arcana">Arcana</option>
                        <option value="Athletics">Athletics</option>
                        <option value="History">History</option>
                        <option value="Insight">Insight</option>
                        <option value="Intimidation">Intimidation</option>
                        <option value="Investigation">Investigation</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Nature">Nature</option>
                        <option value="Perception">Perception</option>
                        <option value="Performance">Performance</option>
                        <option value="Persuasion">Persuasion</option>
                        <option value="Religion">Religion</option>
                        <option value="Sleight of Hand">Sleight of Hand</option>
                        <option value="Stealth">Stealth</option>
                        <option value="Survival">Survival</option>
                    </select> </> : null}
                    {this.state.class === "Cleric" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4>  <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="History">History</option>
                        <option value="Insight">Insight</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Persuasion">Persuasion</option>
                        <option value="Religion">Religion</option>
                    </select> </> : null}
                    {this.state.class === "Druid" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4>  <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="Animal Handling">Animal Handling</option>
                        <option value="Arcana">Arcana</option>
                        <option value="Insight">Insight</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Nature">Nature</option>
                        <option value="Perception">Perception</option>
                        <option value="Religion">Religion</option>
                        <option value="Survival">Survival</option>
                    </select> </> : null}
                    {this.state.class === "Fighter" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="Acrobatics">Acrobatics</option>
                        <option value="Animal Handling">Animal Handling</option>
                        <option value="Athletics">Athletics</option>
                        <option value="History">History</option>
                        <option value="Insight">Insight</option>
                        <option value="Intimidation">Intimidation</option>
                        <option value="Perception">Perception</option>
                        <option value="Survival">Survival</option>
                    </select> </> : null}
                    {this.state.class === "Monk" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Paladin" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Ranger" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Rogue" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Sorcerer" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Warlock" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    {this.state.class === "Wizard" ? <><h4>Select {classInfo.num_of_proficiency_choices} Skills</h4> <select onClick={this.handleClass} disabled={!skillEnabled} multiple={true} value={this.state.charSkills} onChange={this.handleSkills}>
                        <option value="prof6">Proficiency 6</option>
                        <option value="prof7">Proficiency 7</option>
                        <option value="prof8">Proficiency 8</option>
                        <option value="prof9">Proficiency 9</option>
                        <option value="prof10">Proficiency 10</option>
                    </select> </> : null}
                    <br></br>
                    <h3>Character Bio</h3>
                    <textarea onClick={this.handleSkillState} type="text" name="charBio" value={this.state.charBio} placeholder="Please write a detailed bio and backstory for your character" onChange={this.handleChange}></textarea>
                    <br></br>
                    <button onClick={this.handleSubmit}>Create Character</button>
                </label>
            </form>)
    }
}
export default CharacterCreateForm;