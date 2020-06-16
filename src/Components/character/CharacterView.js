import React, { Component } from "react";
let SKILLSAPI = 'http://localhost:3000/skills'
let SKILLCHARJOIN = 'http://localhost:3000/skill_character_joins'

class CharacterView extends Component {
    state = {
        showEditForm: false,
        skills: [],
        skillCharJoin: [],
        filteredSkills: []
    }
    handleEditButton = () => {
        this.setState({showEditForm: !this.state.showEditForm})
    }
    filterSkills = () => {
        let filteredSkills = []
        let joins = this.state.skillCharJoin.filter(skillJoin => skillJoin.character_id === this.props.character.id)
        filteredSkills = joins.map(charSkill => this.state.skills.find(skill => skill.id === charSkill.skill_id))
        this.setState({filteredSkills: filteredSkills})
        console.log(filteredSkills, "filter")
    }
    componentDidMount() {
        fetch(SKILLSAPI)
            .then(resp => resp.json())
            .then(skills => this.setState({ skills: skills }))
        fetch(SKILLCHARJOIN)
            .then(resp => resp.json())
            .then(skillCharJoin => this.setState({ skillCharJoin: skillCharJoin }))
            .then(res => this.filterSkills())
    }
    render() {
        
        return (
            <div>
                <img width={300} height={150} src={this.props.image} alt="charImage"></img>
                <h2>{this.props.character.name}</h2>
                <h3>{this.props.race.name}</h3>
                <h3>{this.props.cla.name}</h3>
                <h3>Stats:</h3>
                <text><b>Level:</b>{this.props.character.level}</text>
                <br></br>
                <text><b>Strength:</b> {this.props.character.strength}</text>
                <br></br>
                <text><b>Dexterity:</b> {this.props.character.dexterity}</text>
                <br></br>
                <text><b>Constitution:</b> {this.props.character.constitution}</text>
                <br></br>
                <text><b>Intelligence:</b> {this.props.character.intelligence}</text>
                <br></br>
                <text><b>Wisdom:</b> {this.props.character.wisdom}</text>
                <br></br>
                <text><b>Charisma:</b> {this.props.character.charisma}</text>
                <br></br>
                <text><b>Hitpoints:</b> {this.props.character.hitpoints}</text>
                <br></br>
                <h4>Skills:</h4>
                {this.state.filteredSkills.map(skill => 
                    <><text><b>{skill.name}</b></text>
                    <br></br>
                    <text>{skill.description}</text><br></br> </>)}
                <br></br>
                <h4>Bio:</h4>
                <text>{this.props.character.bio}</text>
                <br></br>
                <button onClick={this.handleEditButton}>Edit Character</button>
            </div>
        )

    }
}
export default CharacterView