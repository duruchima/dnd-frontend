import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

let SKILLAPI = 'http://localhost:3000/skills'
let CLASSAPI = 'http://localhost:3000/char_classes'
let RACEAPI = 'http://localhost:3000/races'
let CHARACTERAPI = 'http://localhost:3000/characters'
let SKILLCHARS = 'http://localhost:3000/skill_character_joins'
class CharacterCreateFormDupe extends React.Component {
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
            .then(charObj => { this.setState({ currentCharObj: charObj }, this.postCharSkillsJoin) })
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

        this.addCharToState()
    }

    addCharToState = () => {
        this.props.addNewChar(this.state.currentCharObj)
        this.props.fetchCharacters()
    }

    handleRace = () => {
        let race = this.state.races.find(race => race.name === this.state.race)
        this.setState({ currentRaceObj: race })
    }
    handleClass = () => {
        let cla = this.state.classes.find(cla => cla.name === this.state.class)
        this.setState({ currentClassObj: cla })
    }
    handleSkillState = () => {
        if (this.state.charSkills.length > this.state.currentClassObj.num_of_proficiency_choices) { alert(`You can only select ${this.state.currentClassObj.num_of_proficiency_choices} Skills!`) }
        let newSkillArr = this.state.charSkills.map(skill => this.state.skills.find(ski => ski.name === skill))
        this.setState({ currentSkillObjs: newSkillArr })
    }
    render() {
        const raceEnabled = this.state.race.length > 0
        const skillEnabled = this.state.class.length > 0
        const proficiencyEnabled = this.state.charSkills.length > 0
        const classInfo = this.state.classes.find(cla => cla.name === this.state.class)
        const submitEnabled = this.state.charSkills.length <= this.state.currentClassObj.num_of_proficiency_choices
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        const useStyles = makeStyles((theme) => ({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
                maxWidth: 300,
            },
            chips: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            chip: {
                margin: 2,
            },
            noLabel: {
                marginTop: theme.spacing(3),
            },
        }));
        // const classes = useStyles();
        console.log(this.state.charSkills, "charSkill")
        return (
            <FormControl style={{
                position: 'absolute', 
                left: '50%', 
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }} minWidth={120} maxWidth={300}>
                <label>
                    <h1>Create Your Character</h1>
                    <br></br>
                    <h3>Enter Character Name</h3>
                    <TextField variant="outlined" onChange={this.handleChange} name={"charName"} value={this.state.charName} placeholder="Character Name" />
                    <br></br>
                    <h3>Select Race:</h3>
                    <Select value={this.state.value} name={"race"} onChange={this.handleChange}>
                        <option >Select</option>
                        {this.state.races.map((race) => (
                            <option value={race.name}>{race.name}</option>
                        ))}
                    </Select>
                    <br></br>
                    <h3>Select Class:</h3>
                    <Select disabled={!raceEnabled} value={this.state.value} name={"class"} onClick={this.handleRace} onChange={this.handleChange}>
                        <option>Select</option>
                        {this.state.classes.map((cla) => (
                            <option value={cla.name}>{cla.name}</option>
                        ))}
                    </Select>
                    <br></br>
                    <h3>Skills:</h3>
                    {this.state.class === "Barbarian" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="barbarian-skills" id="barbarian-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Animal Handling"} value={"Animal Handling"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Handling") > -1} />
                                <ListItemText primary={"Animal Handling"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Nature"} value={"Nature"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Nature") > -1} />
                                <ListItemText primary={"Nature"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Survival"} value={"Survival"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Survival") > -1} />
                                <ListItemText primary={"Survival"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Bard" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="bard-skills" id="bard-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Acrobatics"} value={"Acrobatics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acrobatics") > -1} />
                                <ListItemText primary={"Acrobatics"} />
                            </MenuItem>
                            <MenuItem key={"Animal Handling"} value={"Animal Handling"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Handling") > -1} />
                                <ListItemText primary={"Animal Handling"} />
                            </MenuItem>
                            <MenuItem key={"Arcana"} value={"Arcana"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Arcana") > -1} />
                                <ListItemText primary={"Arcana"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Investigation"} value={"Investigation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Investigation") > -1} />
                                <ListItemText primary={"Investigation"} />
                            </MenuItem>
                            <MenuItem key={"Medicine"} value={"Medicine"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Medicine") > -1} />
                                <ListItemText primary={"Medicine"} />
                            </MenuItem>
                            <MenuItem key={"Nature"} value={"Nature"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Nature") > -1} />
                                <ListItemText primary={"Nature"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Performance"} value={"Performance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Performance") > -1} />
                                <ListItemText primary={"Performance"} />
                            </MenuItem>
                            <MenuItem key={"Persuasion"} value={"Persuasion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Persuasion") > -1} />
                                <ListItemText primary={"Persuasion"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                            <MenuItem key={"Sleight of Hand"} value={"Sleight of Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Sleight of Hand") > -1} />
                                <ListItemText primary={"Sleight of Hand"} />
                            </MenuItem>
                            <MenuItem key={"Stealth"} value={"Stealth"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Stealth") > -1} />
                                <ListItemText primary={"Stealth"} />
                            </MenuItem>
                            <MenuItem key={"Survival"} value={"Survival"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Survival") > -1} />
                                <ListItemText primary={"Survival"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Cleric" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="cleric-skills" id="cleric-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Medicine"} value={"Medicine"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Medicine") > -1} />
                                <ListItemText primary={"Medicine"} />
                            </MenuItem>
                            <MenuItem key={"Persuasion"} value={"Persuasion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Persuasion") > -1} />
                                <ListItemText primary={"Persuasion"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Druid" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="druid-skills" id="druid-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Animal Handling"} value={"Animal Handling"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Handling") > -1} />
                                <ListItemText primary={"Animal Handling"} />
                            </MenuItem>
                            <MenuItem key={"Arcana"} value={"Arcana"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Arcana") > -1} />
                                <ListItemText primary={"Arcana"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Medicine"} value={"Medicine"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Medicine") > -1} />
                                <ListItemText primary={"Medicine"} />
                            </MenuItem>
                            <MenuItem key={"Nature"} value={"Nature"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Nature") > -1} />
                                <ListItemText primary={"Nature"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                            <MenuItem key={"Survival"} value={"Survival"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Survival") > -1} />
                                <ListItemText primary={"Survival"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Fighter" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="fighter-skills" id="fighter-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Acrobatics"} value={"Acrobatics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acrobatics") > -1} />
                                <ListItemText primary={"Acrobatics"} />
                            </MenuItem>
                            <MenuItem key={"Animal Handling"} value={"Animal Handling"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Handling") > -1} />
                                <ListItemText primary={"Animal Handling"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Survival"} value={"Survival"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Survival") > -1} />
                                <ListItemText primary={"Survival"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Monk" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="monk-skills" id="monk-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Acrobatics"} value={"Acrobatics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acrobatics") > -1} />
                                <ListItemText primary={"Acrobatics"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                            <MenuItem key={"Stealth"} value={"Stealth"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Stealth") > -1} />
                                <ListItemText primary={"Stealth"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Paladin" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="paladin-skills" id="paladin-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Medicine"} value={"Medicine"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Medicine") > -1} />
                                <ListItemText primary={"Medicine"} />
                            </MenuItem>
                            <MenuItem key={"Persuasion"} value={"Persuasion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Persuasion") > -1} />
                                <ListItemText primary={"Persuasion"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Ranger" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="ranger-skills" id="ranger-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Animal Handling"} value={"Animal Handling"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Handling") > -1} />
                                <ListItemText primary={"Animal Handling"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Investigation"} value={"Investigation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Investigation") > -1} />
                                <ListItemText primary={"Investigation"} />
                            </MenuItem>
                            <MenuItem key={"Nature"} value={"Nature"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Nature") > -1} />
                                <ListItemText primary={"Nature"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Stealth"} value={"Stealth"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Stealth") > -1} />
                                <ListItemText primary={"Stealth"} />
                            </MenuItem>
                            <MenuItem key={"Survival"} value={"Survival"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Survival") > -1} />
                                <ListItemText primary={"Survival"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Rogue" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="rogue-skills" id="rogue-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Acrobatics"} value={"Acrobatics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acrobatics") > -1} />
                                <ListItemText primary={"Acrobatics"} />
                            </MenuItem>
                            <MenuItem key={"Athletics"} value={"Athletics"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Athletics") > -1} />
                                <ListItemText primary={"Athletics"} />
                            </MenuItem>
                            <MenuItem key={"Deception"} value={"Deception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Deception") > -1} />
                                <ListItemText primary={"Deception"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Investigation"} value={"Investigation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Investigation") > -1} />
                                <ListItemText primary={"Investigation"} />
                            </MenuItem>
                            <MenuItem key={"Perception"} value={"Perception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Perception") > -1} />
                                <ListItemText primary={"Perception"} />
                            </MenuItem>
                            <MenuItem key={"Performance"} value={"Performance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Performance") > -1} />
                                <ListItemText primary={"Performance"} />
                            </MenuItem>
                            <MenuItem key={"Persuasion"} value={"Persuasion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Persuasion") > -1} />
                                <ListItemText primary={"Persuasion"} />
                            </MenuItem>
                            <MenuItem key={"Sleight of Hand"} value={"Sleight of Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Sleight of Hand") > -1} />
                                <ListItemText primary={"Sleight of Hand"} />
                            </MenuItem>
                            <MenuItem key={"Stealth"} value={"Stealth"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Stealth") > -1} />
                                <ListItemText primary={"Stealth"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Sorcerer" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="sorcerer-skills" id="sorcerer-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Arcana"} value={"Arcana"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Arcana") > -1} />
                                <ListItemText primary={"Arcana"} />
                            </MenuItem>
                            <MenuItem key={"Deception"} value={"Deception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Deception") > -1} />
                                <ListItemText primary={"Deception"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Persuasion"} value={"Persuasion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Persuasion") > -1} />
                                <ListItemText primary={"Persuasion"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Warlock" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="warlock-skills" id="warlock-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Arcana"} value={"Arcana"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Arcana") > -1} />
                                <ListItemText primary={"Arcana"} />
                            </MenuItem>
                            <MenuItem key={"Deception"} value={"Deception"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Deception") > -1} />
                                <ListItemText primary={"Deception"} />
                            </MenuItem>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Intimidation"} value={"Intimidation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Intimidation") > -1} />
                                <ListItemText primary={"Intimidation"} />
                            </MenuItem>
                            <MenuItem key={"Investigation"} value={"Investigation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Investigation") > -1} />
                                <ListItemText primary={"Investigation"} />
                            </MenuItem>
                            <MenuItem key={"Nature"} value={"Nature"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Nature") > -1} />
                                <ListItemText primary={"Nature"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    {this.state.class === "Wizard" ? 
                    <>
                    <FormControl>
                        <InputLabel id="skills">Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="wizard-skills" id="wizard-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Arcana"} value={"Arcana"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Arcana") > -1} />
                                <ListItemText primary={"Arcana"} />
                            </MenuItem>
                            <MenuItem key={"History"} value={"History"}>
                                <Checkbox checked={this.state.charSkills.indexOf("History") > -1} />
                                <ListItemText primary={"History"} />
                            </MenuItem>
                            <MenuItem key={"Insight"} value={"Insight"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Insight") > -1} />
                                <ListItemText primary={"Insight"} />
                            </MenuItem>
                            <MenuItem key={"Investigation"} value={"Investigation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Investigation") > -1} />
                                <ListItemText primary={"Investigation"} />
                            </MenuItem>
                            <MenuItem key={"Religion"} value={"Religion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Religion") > -1} />
                                <ListItemText primary={"Religion"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    <br></br>
                    <h3>Character Backstory</h3>
                    <TextField onClick={this.handleSkillState} id="character-backstory" name="charBio" label="Please write a descriptive backstory for your character" multiline rowsMax={5} value={this.state.charBio} onChange={this.handleChange} variant="outlined" />
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" disabled={!submitEnabled} onClick={this.handleSubmit}>Create Character</Button>
                </label>
            </FormControl>)
    }
}
export default CharacterCreateFormDupe;

