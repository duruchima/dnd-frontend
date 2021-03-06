import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditCharacterForm from "./EditCharacterForm";
let SKILLCHARJOIN = 'http://localhost:3000/skill_character_joins'

class CharacterView extends Component {
    state = {
        showEditForm: false,
        skillCharJoin: [],
        filteredSkills: [],
        character: []
    }
    handleEditButton = () => {
        this.setState({ showEditForm: !this.state.showEditForm })
    }
    filterSkills = () => {
        let filteredSkills = []
        let joins = this.state.skillCharJoin.filter(skillJoin => skillJoin.character_id === this.props.character.id)
        filteredSkills = joins.map(charSkill => this.props.skills.find(skill => skill.id === charSkill.skill_id))
        this.setState({ filteredSkills: filteredSkills })
    }
    componentDidMount() {
        fetch(SKILLCHARJOIN)
            .then(resp => resp.json())
            .then(skillCharJoin => this.setState({ skillCharJoin: skillCharJoin }))
            .then(res => this.filterSkills())
            // this.setState({character: this.props.character})
    }

    updateCurrentChar = (newChar) => {}
    render() {

        return (
            <>
            {this.state.showEditForm ? <EditCharacterForm hideEditForm={this.hideEditForm} updateChar={this.props.updateChar}race={this.props.race} cla={this.props.cla} character={this.props.character}/> :
                <>
                <Card onClick={this.props.click} >
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <CardContent style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <img width={200} height={200} src={this.props.character.img_url} alt="charImage"></img>
                        <Typography fonstSize={14} gutterBottom>
                            <Box color="primary.main"><b>{this.props.character.name}</b></Box>
                            <Box color="secondary.main">{this.props.race.name}</Box>
                            <Box color="success.main">{this.props.cla.name}</Box>
                            <Box color="info.main"><b>Stats:</b></Box>
                            <Box><b>Level:</b>{this.props.character.level}</Box>
                            <Box><b>Strength:</b> {this.props.character.strength} <b>Modifier:</b> +{Math.floor((this.props.character.strength - 10)/2)}</Box>
                            <Box><b>Dexterity:</b> {this.props.character.dexterity} <b>Modifier:</b> +{Math.floor((this.props.character.dexterity - 10)/2)}</Box>
                            <Box><b>Constitution:</b> {this.props.character.constitution} <b>Modifier:</b> +{Math.floor((this.props.character.constitution - 10)/2)}</Box>
                            <Box><b>Intelligence:</b> {this.props.character.intelligence} <b>Modifier:</b> +{Math.floor((this.props.character.intelligence - 10)/2)}</Box>
                            <Box><b>Wisdom:</b> {this.props.character.wisdom} <b>Modifier:</b> +{Math.floor((this.props.character.wisdom - 10)/2)}</Box>
                            <Box><b>Charisma:</b> {this.props.character.charisma} <b>Modifier:</b> +{Math.floor((this.props.character.charisma - 10)/2)}</Box>
                            <Box><b>Hitpoints:</b> {this.props.character.hitpoints}</Box>
                            <Box><b>Skills:</b></Box>
                            {this.state.filteredSkills.map(skill =>
                                <><Box><b>{skill.name}</b></Box>
                                    <text>{skill.description}</text> </>)}
                            <Box><b>Alignment:</b></Box>
                            <text>{this.props.race.alignment}</text>
                            <Box><b>Backstory:</b></Box>
                            <text>{this.props.character.bio}</text>
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" color="secondary" onClick={this.handleEditButton}>Edit Character</Button></>}
                </>
        )//closes return
    }//closes render
}//closes component
export default CharacterView