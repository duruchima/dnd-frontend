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
        currentSkillObjs: [],
        charImg: "",
        charSpells: []
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        fetch(SKILLAPI)
            .then(resp => resp.json())
            .then((skills) => this.setState({ skills: skills }))
        fetch(CLASSAPI)
            .then(resp => resp.json())
            .then((classes) => this.setState({ classes: classes }))
        fetch(RACEAPI)
            .then(resp => resp.json())
            .then((races) => this.setState({ races: races }))
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
                class_id: this.state.currentClassObj.id,
                img_url: this.state.charImg
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
    setImg = () => {
        let dragonborn = "https://i.pinimg.com/736x/f6/83/4d/f6834d8434218cc8f855bf5f37c13850.jpg"
        let dwarf = "https://i.pinimg.com/originals/09/ec/5b/09ec5b8a2cbed5197a85508183cc3ab8.png"
        let elf = "https://i.pinimg.com/originals/fe/79/61/fe7961f79f9d8fe039b2b8803cf63791.jpg"
        let gnome = "https://i.redd.it/ryhyo01echy21.jpg"
        let half_elf = "https://i.redd.it/ucc8gulevd831.jpg"
        let halfling = "https://i.pinimg.com/originals/ba/62/7c/ba627c77446d1a591a90bac9e9f5c3bc.png"
        let half_orc = "https://i.pinimg.com/originals/db/6c/9b/db6c9b67c9af74bcd4e4cdace27f95c6.png"
        let human = "https://www.5esrd.com/wp-content/uploads/sites/4/2018/07/kolvir_comm_by_yamao-d6uy0t8.jpg"
        let tiefling = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMVFhMXFxcYFxcYGBYYGRYZFhoYGBgVGBYYHCggHh0lHxgbITEhJSkrLy4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyUtLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS01LS0tLS0tLS0tLS0tLf/AABEIAPwAyAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwMEBQYIAgH/xABIEAACAQIDBAgCBwQIAwkAAAABAgADEQQSIQUxQVEGBxMiYXGBkTKhFEJygrHB8AgjUtEzYnODkqKy8aPC4RUWFyU0Q1OTs//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACARAQEAAgIDAAMBAAAAAAAAAAABAhEhMQMSQTJRYSL/2gAMAwEAAhEDEQA/AJwiIgIiICIiAiIgIiIFFMWhqNSDDtFVXZeIVywU+pRvaVpHGz+kK0tu46nVcLTKUgGYgBezopUFydAO9UPtMbtjruoq5XCYV66gkdo7ikrW4qMrMR5gQ1lPVLMSPuiPWxhMZUFGoj4asxAQOQyOTuVag+t4EDfxl31hdKOwfDYWk376rWolgDqtLtVvc8M1iPEBoTGbbtERCEREBERAREQEREBERAREQEREBERAREQEwvSTa7YdsKqi5r4qnRJ5Aq7k+yW9ZmprvTrDOcMKtMA1MNVp4hAdx7MnMD4ZWaBF/W/gVpbRWtoVrU+8OOamAjX5d00/eR7idiNvpm+txrw5j9cJsvTvpHhsfiaFalTem5QCtmt8WosLb9AO9yA0BBEo4Rnp02DMrKAzAAXbgOI0vf8AVpzytlfR8Pinkw1l8a7R2bWR1bNlKnNf+G2twZvnV9sypjdpJVdmcUyK9V2NySCcgJ5s6ggfwoZgKoqVCW7JRdSy66ADjbjyseLCbp0G6U0NmYR2xFVHeo2anRoqDWbf3qpv3b7hmsAF0uTNY7vNcfLjjh/nCJmiR11bdJcRtPEYjEVe5RohFpUlPdDVMxZmbe7hVUXOgzmwF5Is08uWOroiIhCIiAiIgIiICIiAiIgIiICIiAiJB3W10jxeD2qDQr1KYOHpEgG6/HVF8jXXhygTjPjKCCDqDoR5yEdjdcuKQAYjDpXFtHQ9mx8WFipPkBvmN6VdaWJxtPsUpfRqRPeKuxdrahcwC2HMcfLSXSe0aptTBLhsZVoghkpVnQEfwgkDXmBa/iDMulM9nobLaxI+sLggcTa432mu4kXIY33gN433G/y9p8w+Ka1s7Dhb8ZnKbe3weeYbl+shjcYQwGbeVH2VUq2ntaYemm7x19eMq215kn5A7vlKuz8jVaeYHIWXMoOtiQGUE8SAQDLj+mM/J7eT2qfeprZfY7NViLNWdqp8QbIh/wAKg+s3maivWJslKYtiUVQAoQK5Ki2gyqp0A9JU6H9Nqe0K2ISlTYUqQplHbQ1M5cE5LXUDJpfU31tulrz5Ze122qIiRCIiAiIgIiICIiAiIgIiICIiAkH/ALQeAIxGEr20anUpsfFGDL/rb2MmyvVCKztuUFj5AXM536w+ny7To4ZVpGmUeo9RSQ2p7tKzW1upYnkTbW14Gm4eqU0O78PH+YmQw+0RYqyKQf1+jMdWIsP17iUQ53Amw+Q5Te9MVlXrBlKndawPHwB8o2ZQDKSwvqSwtqBYHMOY11lHDDMAHJ1vrx9eYmQ2SxR1OoIIBPlu8JjO118d40+1Nngqz0zcA5dd+guTy5e8w9IgMtjrc7t/Mes2fbLqzMtE2XTug2BAAuoJ0NjmAms0gVfNxBGhvqRra0xja1lF5imVS/duczC/C4J4TfOpvb9DDVK3bs4fEGklIBS18pYW7uupqADTgZH+Kfuu54uGH3wxI9wfUTYOrDE0E2hhmxBG85DwVyCEzctT6G06b4Yyk9uHSkREiEREBERAREQEREBERAREQEREDDdNKhXZ+NYbxhcQR5ik5nK+HpgqDe06B68NqGjsxkU2bEVEpfd1d/QqhX70gCscqKPfX8uEsSqFTj5fhFE38P1vmw9HehmJxlDE4inZaNBHa5BJquiFuypgcbWBO4XG/hrtFuMJYyVJxf2E9GsQb8Tr78T5S0VrT6794G+trWtwEmXTWHFZKrVGXQ6cjvHrx/W+WLC5v8+f/SfS4O7TwnxRx/X+8zHS0IL9zm9P0v2l/TjNq6qaTttPD5RTygu5D7yAhuyaHUXFraaTW8I9u0Yb1W48D3hf0zS56E7YODx1GsFLAOFYDUlW7py+Ot/Sb1xHO9uqoiJAiIgIiICIiAiIgIiICIiAiIJgQX167ZWri6OFVv8A06l6g4Z6oGUeYUX/ALyRjVVqlRaa6szKi8dWIUfMzIf9oNXxFXEsbtUd6mvJiSPYWHpMp1c4fttr4Tu3Aqmobi4ARHcH0Ki3jaX4Ojti7HpYbD08NSUCmi5bc7/Ex5liSSeJJnLW29l/RcXXw/ClUdV+ze6H/CROtZzJ1qJba+L5F6Z/4NK/zuPQyFa1vnqud3lPC6xWbUDfp+MuXSTtURuHH9buc+s1hv14yuuCDYcVmqBWLZVTKSWA+Js17Cx0trLOquSxOt72P+85TKWullj3RrEdryKWPgSyTyrOlqiNZlNwdNCPC1vSZPo1s016G0cupp4Zao/u61N2/wAqNMfg+8pG/TTj7cp0jFdV9G9o/SMLQr5gxqUkYlQVBYqM1lJJGt9CTaZKRn1CbQZ8DVosf6GsQt94V1D28sxaSZAREQEREBERAREQEREBERAS32if3VS2/I/+kyw6VbRxFDDtUw2HbEVtyoCLC4Pfa5BKi25dSSB4iKuhnTLH4qu64jFHJ2OIbshTpKC6obU/gzgAZm33ugHOFkRXgE/dZrcBY+NufOSb+z/skviK+LN8tJOyU83qEM3qqoP/ALJGmHfLhxvvbXfyHznTfV5sP6Hs/D0SoWpkD1eZqP3nueJBOXyUS1GxzkTbLXr1iQQTXrEjiO+1wfHX5TqvpBtIYbC18QdRSpPUtzKqSF9Tp6zknMzEsxJY3Zid5Y6sfUkmIle6e+fHF20O8gflPpU3HkJTU6jzB+Ykq4sph66kKhA7gFr7jY6385abWrhrFAAA3DdqNw/nPlSl3j6yji9FUf1r+1h/OcZhN7dd1v8A1CYhRj6tJwP3lB1sdQQGU29r+81vpXsQ4DHVsPY5Q16Wu+k+qG/gO6TzUx1e7T+jbRw9Y/DmyP8AZYEfjaSd1+7HDUcPjk3027JyONOpqhPkw0/tDO3xzva0/Z+qkVsdTP8ADQYC99xqg6+okzyBOo/GhdpOh/8Adw7W13tTZG/AsfST3CEREBERAREQEREBERAREQE566wqDbO2pWemO7U/f0+APaArVS/i2fyDidCyL+vzZSvg6WJuA9GoF1+slXRl9Cqt5KYWIe2FgRVr4Slv7TEUVYclLqD6WvOsZyn0ax4o1qGKK37GqrheJVTr94i9vSdT4XELURaiEMjqGUjcVYXB9jG1yxs1tonXhtLstmMgPer1KdMeQJqN8kI9Zz5Q3+8lj9oTaN6mFw4Pwq9Vh9ohE/0vIqprYXljFeah19PznlF3+n5z6x736857pj8RM1rHpVxPxH0PuLy1xq6oPH8Bf8TLthfK3IWP3d3vpLbFHvL+t/8AtMxpTNwLj4gQR4EaiTKm212h0fxdM61KFJX8cqEVEPo1N0/uzzkOCXexNsVaHbUkPdr02pODe2Rypb17un2m5zUvBra+6NbQbCYvCYoggJUXMf6jdxweRys06qRwQCDcEXB5g7jOSK1QuChXu236e06L6qNotX2Xhy5DMgakSDv7MlVvfccoF/8ArEu18mEx66bdERK5kREBERAREQEREBERASOuvfBNU2ZmDBUpVVqPza4amqjzaoPaSLMR0s6P08fhamFqMyq4FmXerKQytY77EDTjA5Xw9RmslMDTnp6To3qhqOdlYfPfTtAt9+UVHCj0Gg8AJEO3+rLH7PVq96dagmrOjEMqj6zU23D7JbnuvaQepnbgKVcIx0T99S+w5/eKPJjf+8PKHTLL2iOutzG9rtfEcqQp0h5KgY/5naaqATYDfcWlXaONOIxFauTc1aj1PR2LAegIHpPmG0cX8fcg2lvEcpzVB6ZDW03X0PpFE3B859xLWZzxAAHtf/mnjBjunzmJzNt/xcEfMj5SzxZ1J5fl+vnL3iJYO12PnEK9mUazZWJtvErILjy09t0t8Ue96QsZ/YHR7H44quHoOyE27QgpSFjZi1U6acQLnkJ0j0I6NJs/CJhlYuQSzudMzt8RA4DcAOQG+Rr+z1t6/wBIwbHlWpj2SoB4fAfNmk0TSZZW9kREMkREBERAREQEREBERAREQKWKw61Eam4DI6lWB3FWFiD5gzmdXrbPxNaipIq0DWognilRSqsfusr+06dkIdc1GhT2hRq5lvVp5MQgOqgaI5HMq2n9ksLEWYcW8LflPbGVsdQKVGU7wTfzBsf5+olIbpWVs73Budc2v69JVwn1h4D85bqLy4wm9vIfKZbV1PGYylvmRqaKf14THkd71/GIlVqb2v4j5y0f4v1vIlyZb1B3paRnugG2fom0MPXJsoqBX5ZKncYnwAbN5qJ1nOLgvDnOqOrPbn0zZ1CoTeoq9lU556fdJPiws33pIuUbTERKyREQEREBERAREQEREBERA1frA6VDAYcFbGvUOWkp52uzkclHuSBxnOW3MS9WoWdi9Ru8zE3JZuZ8gJtfWBto4vHO9700fs6fLKtxcebXPqJprm7MeZPy0/KSc11ynrhr9vr1M65ja4Nt972AubE3/LTzlvWfumXmEpMAb5hRY961rki9t/ImeKmDXK41JCllN99td3lNOelio7txvA3fynrD1AtyeU8Lu9JSrfCfIzNakZ3pHsuthX7GuhSoVVwLg3UnQ3UkcDMHUOo8vzMmHrzwGfD4DGD+Hs3PMVFFRDfwKN/jkO1iLgHw/GE7j0DrYC5PCea6kNrbd57uEuadlFl05neT6y2xWgB8Ypi8jfJZ6h9vdliamDc9yuM9P+0QEkebJ/8AkJFYABFpf4LHPQrU69P46bq6+JQ3t5HUHwMkas4deRLbZmOSvRp1qZulRFdfJgCPxlzNOZERAREQEREBERAREQEwnTXaRw+Br1QbMEKr9p+6D7m/pM3ND66K+XZ4F/irU1+TN/yxWsZvKIMZrKOenvLFd0uSTmA4ame9s7JqYWsaNQWYKjjxV1DKR8x5qZnF183OlLZ2Jyko3wPofA8G/I+HlLlwRY8UNj4j9W9JiiPz/CZZXutN+DrZvtC4PvY+024sLiqOU2BuCdPESkd1pm0ohgabbgTY8QeY85ZDZFcsRTpVaoB0ZKbtfTjlBsfCZsalTptbDfTejKne64OlVHPPh1VmA8TkYes59p2Jv5To3qdpVDsrsK9KpTKPWp5aiMhKOc4IDAEj94R6TnarhjSqVKTfFTdkPmhKn8IZfVltitSBwH5y5AlFVvfxhuQHCV3O6UEG6V5GvifeorbHa4FsOx72Hcgf2dTvp7HOv3RJInPPUjtM0tpCl9XEU3T71MGqp9lcfenQ004kREBERAREQEREBERASPuvCiW2cpG5K9Nm8AVdB/mZZIMsNvbKTFYerh3+GohW/FT9Vh4g2PpC43V25Zw9QZtd9iLcyd0k3ru2YKlHB7QpDuFBSc/1XGeiSeQOYebiR1tjZVbCV2o11y1EO+2jDhUQ8VPP0OoIkodFtv4bG7PfZuKdad6eSnUYgLzp6nQOjAWB32Ex1XfObm4htTqJlcHh89Aqp1Un7rElkv4HUX8DylhjMFUo1Xo1RlqU2KsPEcQeIO8HiCDK2ysYULFd5Qgr/EoIYjzsLjxAm8XK9vWzsHia64mvRpjJh1RqiDMSqklbjNcm2Uk66WPKSF1JdILYpqF+5WXceFRLke4zeek99XHSTCYNcTUqKzNX7OwUA58ocWN7AfEb3439dLwuKGH2l2uGQ007TOi/H2ak7iQB3QTbysI3zo9brbqKc4dd+DCbVYqoAqUaTmwtc3dWPmcs3emdv4gZv3qqdR/RUbemjSPOsTZ2Lo4lPpbl6j0ri9Q1CFDMLXO7W+gmJlv41fHr7GpsDl01O4DxM6Cw/U3szIAy1s9hdhVYa21sN3ykEYJHatRWkmdzUTKv8bZgQtuRtJ/wvWXTQhMZh6uHfcTlLKPEqQH9gZdydlxt6WX/AIJ7N/8AkxVr6jtE18P6O/tMV0r6ms9V6uCqIikEigwICsF0VHudCw4jTMeVpKuzdo0a6CpRqLUQ8VN/Q8j4GXUrnuxzd0I2VWw23MLQrIUqpVa679OyqHMCNCpGtxOkZH+0dlN/3jwtcfCcJUJ8DTLIT/xkHvJAlQiIgIiICIiAiIgIiICIiBh+k3RnDY6n2eIS9vgcaPTPNW4eW48QZFW0uqPGUWLYWpTrJr3XJR7ctbqfO4k2xJZtrHO49OW+kGwMVS/eVcNWpWsrlkOQcARUHdPAb+U1+jcWsbEWN+Vp071m1lXZWNLcaLKPtP3V+ZE5iQG26JNLll7XaSugPRNMZhn77UqxzNRuoNJ8p7xDcbMLFd6gqbESST0bXEphHegtB6a1qNektgOzrUmSoKZXQjOKbq3K+4kyy6kV/wDKaRPGpWI9HZfym/Ss22qWFVgihyCwUBiNxIGpEgv9oFr42gOP0f8AGo1vwMnmc59duIY7WYHQJSoqviCGa49WI9JKuPbH9WdDPtbBjgHZv8FN2HzE6WxWFp1VKVEV1O9WAYH0M5d6DbSOH2lhKxByiqEP2aoNIn0z39J1REMu2i7S6Fvh3+k7Mbsqv1qJJNOqN5XU/I6ciu+YWp1h1DtHCI6PQQA0sTSfTv1iAG8lKoQ3Jm85Kk1npz0PpbQokaJXUHsqvEH+Brb1Py3iT1101M9/k2A4Ze0FS3fClAeSsQxHqVX2laYfonj3rYWm1UFa6g06yneKtM5H9yLjwYTMTTnSIiAiIgIiICIiAiIgIiICImldK+srB4TPTRu3xCm3ZrcKDxzVLEC3EC54QNd/aD2k64bD4dbZa1Ql9e9+6AKC3Ik3v/UEhaouUDXzEym3doV8ZiGxOIqZnOgAFlRRuRBc2A+e8zF1KZLAC5J3AaknwAhrToXqSVhsijfdnr5fLtX/ADvN7mpdVWCqUdl4ZKqMj2qEqwKsM1R2F1OoNiD6zbYZJzh104Wou1atV6bimy0hTcqcjWQXCtaxN76To+UcZhKdVGp1UV6bCzKwDKRyIMlWXVcjU2uNDYjUHkRuInUHQnpPSx+GSqjDtAFFZONOpbvAjkTcg8RIY62ehIwFVa2GpuMLUBzWzMtFwdQWN8qkEEX4g25TTej3Satgq618PUCuNGB1WovFHAOo+Y3iTbdm+nXETWervpUdpYMYg0uzYO1NgDdWK2OZDvym/HcQRra52aac1vh8IqPUddO0Ksw4FgAufzKhR9wS4iICIiAiIgIiICIiAiIgIiIHmqtwQCQSCLjeL8ReRYepDDX0xeI9RTJ9TlF5KsQIwpdS+G+ti8SfAdiPxQzZei/V/gcDU7WijtVsQKlRyxAO8KBZRfym1RAREQERED4RffLQ7Kw979hSvz7NP5S8iB5RABYAAchoJ9ZgBc6AcZ9lPEUFdWRhdWBBHgYFMY6le3aJc2sMy3N7kceNj7QMdSN7VE0tfvLpcFhfXkCfIGW6bGpgg3c2INib7jm87FgCRzE9nZNIp2ZUlbqd5+ooUC/KwsRxuecC7Sop3EHyIgODfUab/Djr6Ee8xD9GMOd4b6vH+C9he17anS/GVk2BQBYgEFwVOulrg7ra2sN9+PM3C/WuhNgyk6i1xe66EW8CD7Qay5guZcxFwtxcjmBymPfo9hyqqU0UEDU37xLHXfe5OviZ7bYtIoE1ChVSwItZCStxa2lzpu13aCwZAsOY10Hj4fL5RMZhOj9Cm4qKGzAki7E777779538zzMQP//Z"
        if (this.state.charImg.length < 1){
        if(this.state.race === "Dragonborn")
        {this.setState({charImg: dragonborn})}
        else if(this.state.race === "Dwarf")
        {this.setState({charImg: dwarf})}
        else if(this.state.race === "Elf")
        {this.setState({charImg: elf})}
        else if(this.state.race === "Gnome")
        {this.setState({charImg: gnome})}
        else if(this.state.race === "Half-Elf")
        {this.setState({charImg: half_elf})}
        else if(this.state.race === "Halfling")
        {this.setState({charImg: halfling})}
        else if(this.state.race === "Half-Orc")
        {this.setState({charImg: half_orc})}
        else if(this.state.race === "Human")
        {this.setState({charImg: human})}
        else if(this.state.race === "Tiefling")
        {this.setState({charImg: tiefling})}}
    }
    handleSkillState = () => {
        if (this.state.charSkills.length > this.state.currentClassObj.num_of_proficiency_choices) { alert(`You can only select ${this.state.currentClassObj.num_of_proficiency_choices} Skills!`) }
        let newSkillArr = this.state.charSkills.map(skill => this.state.skills.find(ski => ski.name === skill))
        this.setState({ currentSkillObjs: newSkillArr })
        this.setImg()     
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
                    <h3>Character Name</h3>
                    <TextField variant="outlined" onChange={this.handleChange} name={"charName"} value={this.state.charName} placeholder="Enter Character Name" />
                    <br></br>
                    <h3>Character Image Url</h3>
                    <TextField variant="outlined" onChange={this.handleChange} name={"charImg"} value={this.state.charImg} placeholder="If blank default will be used based on character race" />
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
                        <h3>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills:</h3>
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
                    <h3>Select {this.state.currentClassObj.num_of_proficiency_choices} Spells:</h3>
                    {this.state.class === "Bard" ? 
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Spells</InputLabel>
                        <Select labelId="bard-spellls" id="bard-spells-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSpells"}>
                            <MenuItem key={"Dancing Lights"} value={"Dancing Lights"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Dancing Lights") > -1} />
                                <ListItemText primary={"Dancing Lights"} />
                            </MenuItem>
                            <MenuItem key={"Light"} value={"Light"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Light") > -1} />
                                <ListItemText primary={"Light"} />
                            </MenuItem>
                            <MenuItem key={"Mage Hand"} value={"Mage Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mage Hand") > -1} />
                                <ListItemText primary={"Mage Hand"} />
                            </MenuItem>
                            <MenuItem key={"Mending"} value={"Mending"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mending") > -1} />
                                <ListItemText primary={"Mending"} />
                            </MenuItem>
                            <MenuItem key={"Message"} value={"Message"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Message") > -1} />
                                <ListItemText primary={"Message"} />
                            </MenuItem>
                            <MenuItem key={"Minor Illusion"} value={"Minor Illusion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Minor Illusion") > -1} />
                                <ListItemText primary={"Minor Illusion"} />
                            </MenuItem>
                            <MenuItem key={"Prestidigitation"} value={"Prestidigitation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Prestidigitation") > -1} />
                                <ListItemText primary={"Prestidigitation"} />
                            </MenuItem>
                            <MenuItem key={"True Strike"} value={"True Strike"}>
                                <Checkbox checked={this.state.charSkills.indexOf("True Strike") > -1} />
                                <ListItemText primary={"True Strike"} />
                            </MenuItem>
                            <MenuItem key={"Vicious Mockery"} value={"Vicious Mockery"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Vicious Mockery") > -1} />
                                <ListItemText primary={"Vicious Mockery"} />
                            </MenuItem>
                            <MenuItem key={"Animal Friendship"} value={"Animal Friendship"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Friendship") > -1} />
                                <ListItemText primary={"Animal Friendship"} />
                            </MenuItem>
                            <MenuItem key={"Bane"} value={"Bane"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Bane") > -1} />
                                <ListItemText primary={"Bane"} />
                            </MenuItem>
                            <MenuItem key={"Charm Person"} value={"Charm Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Charm Person") > -1} />
                                <ListItemText primary={"Charm Person"} />
                            </MenuItem>
                            <MenuItem key={"Comprehend Languages"} value={"Comprehend Languages"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Comprehend Languages") > -1} />
                                <ListItemText primary={"Comprehend Languages"} />
                            </MenuItem>
                            <MenuItem key={"Cure Wounds"} value={"Cure Wounds"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Cure Wounds") > -1} />
                                <ListItemText primary={"Cure Wounds"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Magic") > -1} />
                                <ListItemText primary={"Detect Magic"} />
                            </MenuItem>
                            <MenuItem key={"Disguise Self"} value={"Disguise Self"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Disguise Self") > -1} />
                                <ListItemText primary={"Disguise Self"} />
                            </MenuItem>
                            <MenuItem key={"Feather Fall"} value={"Feather Fall"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Feather Fall") > -1} />
                                <ListItemText primary={"Feather Fall"} />
                            </MenuItem>
                            <MenuItem key={"Healing Word"} value={"Healing Word"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Healing Word") > -1} />
                                <ListItemText primary={"Healing Word"} />
                            </MenuItem>
                            <MenuItem key={"Heroism"} value={"Heroism"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Heroism") > -1} />
                                <ListItemText primary={"Heroism"} />
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
                            <MenuItem key={"Guidance"} value={"Guidance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Guidance") > -1} />
                                <ListItemText primary={"Guidance"} />
                            </MenuItem>
                            <MenuItem key={"Light"} value={"Light"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Light") > -1} />
                                <ListItemText primary={"Light"} />
                            </MenuItem>
                            <MenuItem key={"Mending"} value={"Mending"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mending") > -1} />
                                <ListItemText primary={"Mending"} />
                            </MenuItem>
                            <MenuItem key={"Resistance"} value={"Resistance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Resistance") > -1} />
                                <ListItemText primary={"Resistance"} />
                            </MenuItem>
                            <MenuItem key={"Sacred Flame"} value={"Sacred Flame"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Sacred-Flame") > -1} />
                                <ListItemText primary={"Sacred-Flame"} />
                            </MenuItem>
                            <MenuItem key={"Spare The Dying"} value={"Spare The Dying"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Spare-The-Dying") > -1} />
                                <ListItemText primary={"Spare-The-Dying"} />
                            </MenuItem>
                            <MenuItem key={"Thaumaturgy"} value={"Thaumaturgy"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Thaumaturgy") > -1} />
                                <ListItemText primary={"Thaumaturgy"} />
                            </MenuItem>
                            <MenuItem key={"Animal Friendship"} value={"Animal Friendship"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Friendship") > -1} />
                                <ListItemText primary={"Animal Friendship"} />
                            </MenuItem>
                            <MenuItem key={"Bane"} value={"Bane"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Bane") > -1} />
                                <ListItemText primary={"Bane"} />
                            </MenuItem>
                            <MenuItem key={"Bless"} value={"Bless"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Bless") > -1} />
                                <ListItemText primary={"Bless"} />
                            </MenuItem>
                            <MenuItem key={"Command"} value={"Command"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Command") > -1} />
                                <ListItemText primary={"Command"} />
                            </MenuItem>
                            <MenuItem key={"Create or Destroy Water"} value={"Create or Destroy Water"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Create or Destroy Water") > -1} />
                                <ListItemText primary={"Create or Destroy Water"} />
                            </MenuItem>
                            <MenuItem key={"Cure Wounds"} value={"Cure Wounds"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Cure Wounds") > -1} />
                                <ListItemText primary={"Cure Wounds"} />
                            </MenuItem>
                            <MenuItem key={"Detect Evil and Good"} value={"Detect Evil and Good"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Evil and Good") > -1} />
                                <ListItemText primary={"Detect Evil and Good"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Magic") > -1} />
                                <ListItemText primary={"Detect Magic"} />
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
                            <MenuItem key={"Druidcraft"} value={"Druidcraft"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Druidcraft") > -1} />
                                <ListItemText primary={"Druidcraft"} />
                            </MenuItem>
                            <MenuItem key={"Guidance"} value={"Guidance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Guidance") > -1} />
                                <ListItemText primary={"Guidance"} />
                            </MenuItem>
                            <MenuItem key={"Mending"} value={"Mending"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mending") > -1} />
                                <ListItemText primary={"Mending"} />
                            </MenuItem>
                            <MenuItem key={"Produce Flame"} value={"Produce Flame"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Produce-Flame") > -1} />
                                <ListItemText primary={"Produce-Flame"} />
                            </MenuItem>
                            <MenuItem key={"Resistance"} value={"Resistance"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Resistance") > -1} />
                                <ListItemText primary={"Resistance"} />
                            </MenuItem>
                            <MenuItem key={"Shillelagh"} value={"Shillelagh"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shillelagh") > -1} />
                                <ListItemText primary={"Shillelagh"} />
                            </MenuItem>
                            <MenuItem key={"Animal Friendship"} value={"Animal Friendship"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Friendship") > -1} />
                                <ListItemText primary={"Animal Friendship"} />
                            </MenuItem>
                            <MenuItem key={"Charm Person"} value={"Charm Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Charm Person") > -1} />
                                <ListItemText primary={"Charm Person"} />
                            </MenuItem>
                            <MenuItem key={"Create or Destroy Water"} value={"Create or Destroy Water"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Create or Destroy Water") > -1} />
                                <ListItemText primary={"Create or Destroy Water"} />
                            </MenuItem>
                            <MenuItem key={"Cure Wounds"} value={"Cure Wounds"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Cure Wounds") > -1} />
                                <ListItemText primary={"Cure Wounds"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Magic") > -1} />
                                <ListItemText primary={"Detect Magic"} />
                            </MenuItem>
                            <MenuItem key={"Detect Poison and Disease"} value={"Detect Poison and Disease"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Poison and Disease") > -1} />
                                <ListItemText primary={"Detect Poison and Disease"} />
                            </MenuItem>
                            <MenuItem key={"Entangle"} value={"Entangle"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Entangle") > -1} />
                                <ListItemText primary={"Entangle"} />
                            </MenuItem>
                            <MenuItem key={"Faerie Fire"} value={"Faerie Fire"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Faerie Fire") > -1} />
                                <ListItemText primary={"Faerie Fire"} />
                            </MenuItem>
                            <MenuItem key={"Fog Cloud"} value={"Fog Cloud"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Fog Cloud") > -1} />
                                <ListItemText primary={"Fog Cloud"} />
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
                            <MenuItem key={"Bless"} value={"Bless"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Bless") > -1} />
                                <ListItemText primary={"Bless"} />
                            </MenuItem>
                            <MenuItem key={"Command"} value={"Command"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Command") > -1} />
                                <ListItemText primary={"Command"} />
                            </MenuItem>
                            <MenuItem key={"Cure Wounds"} value={"Cure Wounds"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Cure-Wounds") > -1} />
                                <ListItemText primary={"Cure-Wounds"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect-Magic") > -1} />
                                <ListItemText primary={"Detect-Magic"} />
                            </MenuItem>
                            <MenuItem key={"Divine Favor"} value={"Divine Favor"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Divine-Favor") > -1} />
                                <ListItemText primary={"Divine-Favor"} />
                            </MenuItem>
                            <MenuItem key={"Heroism"} value={"Heroism"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Heroism") > -1} />
                                <ListItemText primary={"Heroism"} />
                            </MenuItem>
                            <MenuItem key={"Hunter's Mark"} value={"Hunter's Mark"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Hunter's Mark") > -1} />
                                <ListItemText primary={"Hunter's Mark"} />
                            </MenuItem>
                            <MenuItem key={"Protection from Evil and Good"} value={"Protection from Evil and Good"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Protection from Evil and Good") > -1} />
                                <ListItemText primary={"Protection from Evil and Good"} />
                            </MenuItem>
                            <MenuItem key={"Purify Food and Drink"} value={"Purify Food and Drink"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Purify Food and Drink") > -1} />
                                <ListItemText primary={"Purify Food and Drink"} />
                            </MenuItem>
                            <MenuItem key={"Shield of Faith"} value={"Shield of Faith"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shield of Faith") > -1} />
                                <ListItemText primary={"Shield of Faith"} />
                            </MenuItem>
                            <MenuItem key={"Aid"} value={"Aid"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Aid") > -1} />
                                <ListItemText primary={"Aid"} />
                            </MenuItem>
                            <MenuItem key={"Branding Smite"} value={"Branding Smite"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Branding Smite") > -1} />
                                <ListItemText primary={"Branding Smite"} />
                            </MenuItem>
                            <MenuItem key={"Find Steed"} value={"Find Steed"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Find Steed") > -1} />
                                <ListItemText primary={"Find Steed"} />
                            </MenuItem>
                            <MenuItem key={"Lesser Restoration"} value={"Lesser Restoration"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Lesser Restoration") > -1} />
                                <ListItemText primary={"Lesser Restoration"} />
                            </MenuItem>
                            <MenuItem key={"Locate Object"} value={"Locate Object"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Locate Object") > -1} />
                                <ListItemText primary={"Locate Object"} />
                            </MenuItem>
                            <MenuItem key={"Magic Weapon"} value={"Magic Weapon"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Magic Weapon") > -1} />
                                <ListItemText primary={"Magic Weapon"} />
                            </MenuItem>
                            <MenuItem key={"Protection From Poison"} value={"Protection From Poison"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Protection From Poison") > -1} />
                                <ListItemText primary={"Protection From Poison"} />
                            </MenuItem>
                            <MenuItem key={"Zone of Truth"} value={"Zone of Truth"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Zone of Truth") > -1} />
                                <ListItemText primary={"Zone of Truth"} />
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
                            <MenuItem key={"Alarm"} value={"Alarm"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Alarm") > -1} />
                                <ListItemText primary={"Alarm"} />
                            </MenuItem>
                            <MenuItem key={"Animal Friendship"} value={"Animal Friendship"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal-Friendship") > -1} />
                                <ListItemText primary={"Animal-Friendship"} />
                            </MenuItem>
                            <MenuItem key={"Cure Wounds"} value={"Cure Wounds"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Cure-Wounds") > -1} />
                                <ListItemText primary={"Cure-Wounds"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect-Magic") > -1} />
                                <ListItemText primary={"Detect-Magic"} />
                            </MenuItem>
                            <MenuItem key={"Fog Cloud"} value={"Fog Cloud"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Fog-Cloud") > -1} />
                                <ListItemText primary={"Fog-Cloud"} />
                            </MenuItem>
                            <MenuItem key={"Goodberry"} value={"Goodberry"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Goodberry") > -1} />
                                <ListItemText primary={"Goodberry"} />
                            </MenuItem>
                            <MenuItem key={"Hunter's Mark"} value={"Hunter's Mark"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Hunter's Mark") > -1} />
                                <ListItemText primary={"Hunter's Mark"} />
                            </MenuItem>
                            <MenuItem key={"Jump"} value={"Jump"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Jump") > -1} />
                                <ListItemText primary={"Jump"} />
                            </MenuItem>
                            <MenuItem key={"Longstrider"} value={"Longstrider"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Longstrider") > -1} />
                                <ListItemText primary={"Longstrider"} />
                            </MenuItem>
                            <MenuItem key={"Speak With Animals"} value={"Speak With Animals"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Speak With Animals") > -1} />
                                <ListItemText primary={"Speak With Animals"} />
                            </MenuItem>
                            <MenuItem key={"Animal Messenger"} value={"Animal Messenger"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Animal Messenger") > -1} />
                                <ListItemText primary={"Animal Messenger"} />
                            </MenuItem>
                            <MenuItem key={"Barkskin"} value={"Barkskin"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Barkskin") > -1} />
                                <ListItemText primary={"Barkskin"} />
                            </MenuItem>
                            <MenuItem key={"Darkvision"} value={"Darkvision"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Darkvision") > -1} />
                                <ListItemText primary={"Darkvision"} />
                            </MenuItem>
                            <MenuItem key={"Find Traps"} value={"Find Traps"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Find Traps") > -1} />
                                <ListItemText primary={"Find Traps"} />
                            </MenuItem>
                            <MenuItem key={"Lesser Restoration"} value={"Lesser Restoration"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Lesser Restoration") > -1} />
                                <ListItemText primary={"Lesser Restoration"} />
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
                            <MenuItem key={"Acid Splash"} value={"Acid Splash"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acid Splash") > -1} />
                                <ListItemText primary={"Acid Splash"} />
                            </MenuItem>
                            <MenuItem key={"Chill Touch"} value={"Chill Touch"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Chill Touch") > -1} />
                                <ListItemText primary={"Chill Touch"} />
                            </MenuItem>
                            <MenuItem key={"Dancing Lights"} value={"Dancing Lights"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Dancing Lights") > -1} />
                                <ListItemText primary={"Dancing Lights"} />
                            </MenuItem>
                            <MenuItem key={"Fire Bolt"} value={"Fire Bolt"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Fire Bolt") > -1} />
                                <ListItemText primary={"Fire Bolt"} />
                            </MenuItem>
                            <MenuItem key={"Light"} value={"Light"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Light") > -1} />
                                <ListItemText primary={"Light"} />
                            </MenuItem>
                            <MenuItem key={"Mage Hand"} value={"Mage Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mage Hand") > -1} />
                                <ListItemText primary={"Mage Hand"} />
                            </MenuItem>
                            <MenuItem key={"Mending"} value={"Mending"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mending") > -1} />
                                <ListItemText primary={"Mending"} />
                            </MenuItem>
                            <MenuItem key={"Message"} value={"Message"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Message") > -1} />
                                <ListItemText primary={"Message"} />
                            </MenuItem>
                            <MenuItem key={"Minor Illusion"} value={"Minor Illusion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Minor Illusion") > -1} />
                                <ListItemText primary={"Minor Illusion"} />
                            </MenuItem>
                            <MenuItem key={"Poison Spray"} value={"Poison Spray"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Poison Spray") > -1} />
                                <ListItemText primary={"Poison Spray"} />
                            </MenuItem>
                            <MenuItem key={"Prestidigitation"} value={"Prestidigitation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Prestidigitation") > -1} />
                                <ListItemText primary={"Prestidigitation"} />
                            </MenuItem>
                            <MenuItem key={"Ray of Frost"} value={"Ray of Frost"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Ray of Frost") > -1} />
                                <ListItemText primary={"Ray of Frost"} />
                            </MenuItem>
                            <MenuItem key={"Shocking Grasp"} value={"Shocking Grasp"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shocking Grasp") > -1} />
                                <ListItemText primary={"Shocking Grasp"} />
                            </MenuItem>
                            <MenuItem key={"True Strike"} value={"True Strike"}>
                                <Checkbox checked={this.state.charSkills.indexOf("True Strike") > -1} />
                                <ListItemText primary={"True Strike"} />
                            </MenuItem>
                            <MenuItem key={"Burning Hands"} value={"Burning Hands"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Burning Hands") > -1} />
                                <ListItemText primary={"Burning Hands"} />
                            </MenuItem>
                            <MenuItem key={"Charm Person"} value={"Charm Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Charm Person") > -1} />
                                <ListItemText primary={"Charm Person"} />
                            </MenuItem>
                            <MenuItem key={"Color Spray"} value={"Color Spray"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Color Spray") > -1} />
                                <ListItemText primary={"Color Spray"} />
                            </MenuItem>
                            <MenuItem key={"Comprehend Languages"} value={"Comprehend Languages"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Comprehend Languages") > -1} />
                                <ListItemText primary={"Comprehend Languages"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Magic") > -1} />
                                <ListItemText primary={"Detect Magic"} />
                            </MenuItem>
                            <MenuItem key={"Disguise Self"} value={"Disguise Self"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Disguise Self") > -1} />
                                <ListItemText primary={"Disguise Self"} />
                            </MenuItem>
                            <MenuItem key={"Expeditious Retreat"} value={"Expeditious Retreat"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Expeditious Retreat") > -1} />
                                <ListItemText primary={"Expeditious Retreat"} />
                            </MenuItem>
                            <MenuItem key={"False Life"} value={"False Life"}>
                                <Checkbox checked={this.state.charSkills.indexOf("False Life") > -1} />
                                <ListItemText primary={"False Life"} />
                            </MenuItem>
                            <MenuItem key={"Feather Fall"} value={"Feather Fall"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Feather Fall") > -1} />
                                <ListItemText primary={"Feather Fall"} />
                            </MenuItem>
                            <MenuItem key={"Fog Cloud"} value={"Fog Cloud"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Fog Cloud") > -1} />
                                <ListItemText primary={"Fog Cloud"} />
                            </MenuItem>
                            <MenuItem key={"Jump"} value={"Jump"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Jump") > -1} />
                                <ListItemText primary={"Jump"} />
                            </MenuItem>
                            <MenuItem key={"Mage Armor"} value={"Mage Armor"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mage Armor") > -1} />
                                <ListItemText primary={"Mage Armor"} />
                            </MenuItem>
                            <MenuItem key={"Magic Missile"} value={"Magic Missile"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Magic Missile") > -1} />
                                <ListItemText primary={"Magic Missile"} />
                            </MenuItem>
                            <MenuItem key={"Shield"} value={"Shield"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shield") > -1} />
                                <ListItemText primary={"Shield"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="warlock-skills" id="warlock-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Chill Touch"} value={"Chill Touch"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Chill Touch") > -1} />
                                <ListItemText primary={"Chill Touch"} />
                            </MenuItem>
                            <MenuItem key={"Eldritch Blast"} value={"Eldritch Blast"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Eldritch Blast") > -1} />
                                <ListItemText primary={"Eldritch Blast"} />
                            </MenuItem>
                            <MenuItem key={"Mage Hand"} value={"Mage Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mage Hand") > -1} />
                                <ListItemText primary={"Mage Hand"} />
                            </MenuItem>
                            <MenuItem key={"Minor Illusion"} value={"Minor Illusion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Minor Illusion") > -1} />
                                <ListItemText primary={"Minor Illusion"} />
                            </MenuItem>
                            <MenuItem key={"Poison Spray"} value={"Poison Spray"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Poison Spray") > -1} />
                                <ListItemText primary={"Poison Spray"} />
                            </MenuItem>
                            <MenuItem key={"Prestidigitation"} value={"Prestidigitation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Prestidigitation") > -1} />
                                <ListItemText primary={"Prestidigitation"} />
                            </MenuItem>
                            <MenuItem key={"True Strike"} value={"True Strike"}>
                                <Checkbox checked={this.state.charSkills.indexOf("True Strike") > -1} />
                                <ListItemText primary={"True Strike"} />
                            </MenuItem>
                            <MenuItem key={"Charm Person"} value={"Charm Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Charm Person") > -1} />
                                <ListItemText primary={"Charm Person"} />
                            </MenuItem>
                            <MenuItem key={"Comprehend Languages"} value={"Comprehend Languages"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Comprehend Languages") > -1} />
                                <ListItemText primary={"Comprehend Languages"} />
                            </MenuItem>
                            <MenuItem key={"Expeditious Retreat"} value={"Expeditious Retreat"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Expeditious Retreat") > -1} />
                                <ListItemText primary={"Expeditious Retreat"} />
                            </MenuItem>
                            <MenuItem key={"Hellish Rebuke"} value={"Hellish Rebuke"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Hellish Rebuke") > -1} />
                                <ListItemText primary={"Hellish Rebuke"} />
                            </MenuItem>
                            <MenuItem key={"Illusory Script"} value={"Illusory Script"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Illusory Script") > -1} />
                                <ListItemText primary={"Illusory Script"} />
                            </MenuItem>
                            <MenuItem key={"Protection from Evil and Good"} value={"Protection from Evil and Good"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Protection from Evil and Good") > -1} />
                                <ListItemText primary={"Protection from Evil and Good"} />
                            </MenuItem>
                            <MenuItem key={"Unseen Servant"} value={"Unseen Servant"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Unseen Servant") > -1} />
                                <ListItemText primary={"Unseen Servant"} />
                            </MenuItem>
                            <MenuItem key={"Darkness"} value={"Darkness"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Darkness") > -1} />
                                <ListItemText primary={"Darkness"} />
                            </MenuItem>
                            <MenuItem key={"Enthrall"} value={"Enthrall"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Enthrall") > -1} />
                                <ListItemText primary={"Enthrall"} />
                            </MenuItem>
                            <MenuItem key={"Hold Person"} value={"Hold Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Hold Person") > -1} />
                                <ListItemText primary={"Hold Person"} />
                            </MenuItem>
                            <MenuItem key={"Invisibility"} value={"Invisibility"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Invisibility") > -1} />
                                <ListItemText primary={"Invisibility"} />
                            </MenuItem>
                            <MenuItem key={"Mirror Image"} value={"Mirror Image"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mirror Image") > -1} />
                                <ListItemText primary={"Mirror Image"} />
                            </MenuItem>
                            <MenuItem key={"Misty Step"} value={"Misty Step"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Misty Step") > -1} />
                                <ListItemText primary={"Misty Step"} />
                            </MenuItem>
                            <MenuItem key={"Ray of Enfeeblement"} value={"Ray of Enfeeblement"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Ray of Enfeeblement") > -1} />
                                <ListItemText primary={"Ray of Enfeeblement"} />
                            </MenuItem>
                            <MenuItem key={"Shatter"} value={"Shatter"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shatter") > -1} />
                                <ListItemText primary={"Shatter"} />
                            </MenuItem>
                            <MenuItem key={"Spiderclimb"} value={"Spiderclimb"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Spiderclimb") > -1} />
                                <ListItemText primary={"Spiderclimb"} />
                            </MenuItem>
                            <MenuItem key={"Suggestion"} value={"Suggestion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Suggestion") > -1} />
                                <ListItemText primary={"Suggestion"} />
                            </MenuItem>
                            <MenuItem key={"Counterspell"} value={"Counterspell"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Counterspell") > -1} />
                                <ListItemText primary={"Counterspell"} />
                            </MenuItem>
                            <MenuItem key={"Dispel Magic"} value={"Dispel Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Dispel Magic") > -1} />
                                <ListItemText primary={"Dispel Magic"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    <> 
                    <FormControl>
                    <InputLabel>Select {this.state.currentClassObj.num_of_proficiency_choices} Skills</InputLabel>
                        <Select labelId="wizard-skills" id="wizard-skills-checkbox" multiple value={this.state.charSkills} onChange={this.handleChange} input={<Input />}
                            renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} onClick={this.handleClass} disabled={!skillEnabled} name={"charSkills"}>
                            <MenuItem key={"Acid Splash"} value={"Acid Splash"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Acid Splash") > -1} />
                                <ListItemText primary={"Acid Splash"} />
                            </MenuItem>
                            <MenuItem key={"Chill Touch"} value={"Chill Touch"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Chill Touch") > -1} />
                                <ListItemText primary={"Chill Touch"} />
                            </MenuItem>
                            <MenuItem key={"Dancing Lights"} value={"Dancing Lights"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Dancing Lights") > -1} />
                                <ListItemText primary={"Dancing Lights"} />
                            </MenuItem>
                            <MenuItem key={"Fire Bolt"} value={"Fire Bolt"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Fire Bolt") > -1} />
                                <ListItemText primary={"Fire Bolt"} />
                            </MenuItem>
                            <MenuItem key={"Light"} value={"Light"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Light") > -1} />
                                <ListItemText primary={"Light"} />
                            </MenuItem>
                            <MenuItem key={"Mage Hand"} value={"Mage Hand"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mage Hand") > -1} />
                                <ListItemText primary={"Mage Hand"} />
                            </MenuItem>
                            <MenuItem key={"Mending"} value={"Mending"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Mending") > -1} />
                                <ListItemText primary={"Mending"} />
                            </MenuItem>
                            <MenuItem key={"Message"} value={"Message"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Message") > -1} />
                                <ListItemText primary={"Message"} />
                            </MenuItem>
                            <MenuItem key={"Minor Illusion"} value={"Minor Illusion"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Minor Illusion") > -1} />
                                <ListItemText primary={"Minor Illusion"} />
                            </MenuItem>
                            <MenuItem key={"Poison Spray"} value={"Poison Spray"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Poison Spray") > -1} />
                                <ListItemText primary={"Poison Spray"} />
                            </MenuItem>
                            <MenuItem key={"Prestidigitation"} value={"Prestidigitation"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Prestidigitation") > -1} />
                                <ListItemText primary={"Prestidigitation"} />
                            </MenuItem>
                            <MenuItem key={"Ray of Frost"} value={"Ray of Frost"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Ray of Frost") > -1} />
                                <ListItemText primary={"Ray of Frost"} />
                            </MenuItem>
                            <MenuItem key={"Shocking Grasp"} value={"Shocking Grasp"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Shocking Grasp") > -1} />
                                <ListItemText primary={"Shocking Grasp"} />
                            </MenuItem>
                            <MenuItem key={"True Strike"} value={"True Strike"}>
                                <Checkbox checked={this.state.charSkills.indexOf("True Strike") > -1} />
                                <ListItemText primary={"True Strike"} />
                            </MenuItem>
                            <MenuItem key={"Alarm"} value={"Alarm"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Alarm") > -1} />
                                <ListItemText primary={"Alarm"} />
                            </MenuItem>
                            <MenuItem key={"Burning Hands"} value={"Burning Hands"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Burning Hands") > -1} />
                                <ListItemText primary={"Burning Hands"} />
                            </MenuItem>
                            <MenuItem key={"Charm Person"} value={"Charm Person"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Charm Person") > -1} />
                                <ListItemText primary={"Charm Person"} />
                            </MenuItem>
                            <MenuItem key={"Color Spray"} value={"Color Spray"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Color Spray") > -1} />
                                <ListItemText primary={"Color Spray"} />
                            </MenuItem>
                            <MenuItem key={"Comprehend Languages"} value={"Comprehend Languages"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Comprehend Languages") > -1} />
                                <ListItemText primary={"Comprehend Languages"} />
                            </MenuItem>
                            <MenuItem key={"Detect Magic"} value={"Detect Magic"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Detect Magic") > -1} />
                                <ListItemText primary={"Detect Magic"} />
                            </MenuItem>
                            <MenuItem key={"Disguise Self"} value={"Disguise Self"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Disguise Self") > -1} />
                                <ListItemText primary={"Disguise Self"} />
                            </MenuItem>
                            <MenuItem key={"Expeditious Retreat"} value={"Expeditious Retreat"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Expeditious Retreat") > -1} />
                                <ListItemText primary={"Expeditious Retreat"} />
                            </MenuItem>
                            <MenuItem key={"False Life"} value={"False Life"}>
                                <Checkbox checked={this.state.charSkills.indexOf("False Life") > -1} />
                                <ListItemText primary={"False Life"} />
                            </MenuItem>
                            <MenuItem key={"Feather Fall"} value={"Feather Fall"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Feather Fall") > -1} />
                                <ListItemText primary={"Feather Fall"} />
                            </MenuItem>
                            <MenuItem key={"Find Familiar"} value={"Find Familiar"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Find Familiar") > -1} />
                                <ListItemText primary={"Find Familiar"} />
                            </MenuItem>
                            <MenuItem key={"Floating Disk"} value={"Floating Disk"}>
                                <Checkbox checked={this.state.charSkills.indexOf("Floating Disk") > -1} />
                                <ListItemText primary={"Floating Disk"} />
                            </MenuItem>
                        </Select>
                        </FormControl>
                    </> : null}
                    <h3>Character Backstory</h3>
                    <TextField onClick={this.handleSkillState} id="character-backstory" name="charBio" label="Please write a descriptive backstory." multiline rowsMax={5} value={this.state.charBio} onChange={this.handleChange} variant="outlined" />
                    <br></br>
                    <br></br>
                    <Button variant="contained" color="primary" disabled={!submitEnabled} onClick={this.handleSubmit}>Create Character</Button>
                </label>
            </FormControl>)
    }
}
export default CharacterCreateForm;

