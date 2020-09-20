import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class CharacterCard extends Component {
    render() {
        return (
            <Card >
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <CardContent >
                    <img width={200} height={200} src={this.props.image} alt="charImage"></img>
                    <Typography fonstSize={14} color="textSecondary" gutterBottom>
                        <b>{this.props.character.name}</b>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={this.props.click}>View Character</Button>
                    <Button variant="contained" color="secondary" onClick={() => { this.props.handleDelete(this.props.character.id) }}>Delete Character</Button>
                </CardActions>
            </Card>
    ) //closes return 
    } //closes render
} //closes component
export default CharacterCard