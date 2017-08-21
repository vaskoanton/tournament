import React, { Component } from 'react';
import Constants from '../constants/constants';
import NumericInput from 'react-numeric-input';
import TournamentData from '../storage';
import '../styles/form.css';

class Form extends Component {

    nameMaxLength = 10;

    constructor(props) {
        super(props);

        this.tournamentTypes = Constants.tournamentType;
        this.tournamentSettings = Constants.tournamentSettings;

        this.state = {
            tournament: {
                name: '',
                teams: '',
                type: this.tournamentTypes.single
            },
            formErrors: {
                name: [],
                teams: []
            },
            nameValid: false,
            teamsValid: false,
            formValid: false,
            currentField: ''
        };


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTeamsChange = this.handleTeamsChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount(){
        TournamentData.removeTournament();
    }

    handleNameChange(event) {
        const fieldName = event.target.name;
        const tournament = this.state.tournament;
        tournament.name = event.target.value;
        this.setState({ tournament: tournament }, () => { this.validateField(fieldName, tournament.name) });
        this.setState({currentField: event.target.name});
    }

    handleTeamsChange(val){
        if(this.state.currentField !== '') return;

        const fieldName = "teams";
        const tournament = this.state.tournament;
        tournament.teams = val;
        this.setState({ tournament: tournament }, () => { this.validateField(fieldName, tournament.teams) });
    }

    handleTypeChange(event){
        const fieldName = event.target.name;
        const tournament = this.state.tournament;
        tournament.type = event.target.value;
        this.setState({ tournament: tournament }, () => { this.validateField(fieldName, tournament.type) });
        this.setState({currentField: event.target.name});
    }

    handleSubmit(event) {
        const tournament = this.state.tournament;
        this.setState({ tournament: tournament }, () => { this.validateField('name', this.state.tournament.name) });
        this.setState({ tournament: tournament }, () => { this.validateField('teams', this.state.tournament.teams) });
        this.setState({currentField: ''});

        if(this.state.formValid){
            TournamentData.setTournament(this.state.tournament);
            this.props.history.push("/tournament");
        }

        event.preventDefault();
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let teamsValid = this.state.teamsValid;

        switch(fieldName) {
            case 'name':
                let nameFieldState = {
                    nameIsEmpty: {
                        valid: this.nameIsNotEmptyRule(value),
                        message: `${this.capitalizeFirstLetter(fieldName)} should not be empty`
                    },
                    nameMaxLength: {
                        valid: this.nameMaxLengthRule(value),
                        message:  `${this.capitalizeFirstLetter(fieldName)} should be less than ${this.nameMaxLength} symbols`
                    },
                    isValid: () => {
                        return this.nameMaxLengthRule(value) && this.nameIsNotEmptyRule(value);
                    }
                };

                this.updateMessageErrors(fieldName, nameFieldState.nameIsEmpty);
                this.updateMessageErrors(fieldName, nameFieldState.nameMaxLength);
                nameValid = nameFieldState.isValid();
                break;
            case 'teams':
                let teamsFieldState = {
                    teamsIsEmpty: {
                        valid: this.teamIsNotEmptyRule(value),
                        message: `${this.capitalizeFirstLetter(fieldName)} should not be empty`
                    },

                    isValid: () => {
                        return this.teamIsNotEmptyRule(value);
                    }
                };

                this.updateMessageErrors(fieldName, teamsFieldState.teamsIsEmpty);
                teamsValid = teamsFieldState.isValid();

                break;
            default:
                break;
        }

        this.setState({currentField: ''});
        this.setState({formErrors: fieldValidationErrors,
            nameValid: nameValid,
            teamsValid: teamsValid
        }, this.validateForm);
    }

    checkErrorMessage(fieldName, message){
        let fieldValidationErrors = this.state.formErrors;
        let errorsArr = fieldValidationErrors[fieldName];
        return errorsArr.find((msg) => {
            return msg === message;
        })
    }

    updateMessageErrors(fieldName, fieldState){
        let fieldValidationErrors = this.state.formErrors;
        if(!fieldState.valid && !this.checkErrorMessage(fieldName, fieldState.message)){
           fieldValidationErrors[fieldName].push(fieldState.message);
        }
        else if(fieldState.valid) {
            let index = fieldValidationErrors[fieldName].indexOf(fieldState.message);
            if(index !== -1)  fieldValidationErrors[fieldName].splice(index, 1);
        }
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.teamsValid});
    }

    nameIsNotEmptyRule(value){
        return value !== undefined && value !== "";
    }

    nameMaxLengthRule(value){
        if(value === undefined) return;

        return value.length <= this.nameMaxLength;
    }

    teamIsNotEmptyRule(value){
        return value !== undefined && value > 0;
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div className="tournament-form">
                <p>New tournament</p>
                <div className="tournament-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="tournament-field">
                            <div className={`input-field ${this.errorClass(this.state.formErrors.name)}`}>
                                <input type="text" value={this.state.tournament.name} onChange={this.handleNameChange} placeholder="Tournament Name*" name="name"/>
                            </div>
                            <div className="required">
                                {
                                    this.state.formErrors.name.map((err) =>{
                                        return <span key={err}>{err.toString()}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className="tournament-field">
                            <div className={`input-field ${this.errorClass(this.state.formErrors.teams)}`}>
                                <NumericInput
                                    value={this.state.tournament.teams}
                                    min={ this.tournamentSettings.minTeams }
                                    max={ this.tournamentSettings.maxTeams }
                                    step={ 1 }
                                    precision={ 0 }
                                    size={ 5 }
                                    style={ false }
                                    placeholder="Teams Number*"
                                    name="teams"
                                    onChange={this.handleTeamsChange}
                                />
                            </div>
                            <div className="required">
                                {
                                    this.state.formErrors.teams.map((err) =>{
                                        return <span key={err}>{err.toString()}</span>
                                    })
                                }
                            </div>
                        </div>
                        <div className="tournament-field">
                            <div className="radio-field">
                                <div className="radio-component">
                                <input
                                    type="radio"
                                    id="single"
                                    name="elimination"
                                    onChange={this.handleTypeChange}
                                    value={this.tournamentTypes.single}
                                    checked={this.state.tournament.type === this.tournamentTypes.single}  />
                                <label htmlFor="single"> Single Elimination </label>
                                </div>
                                <div className="radio-component">
                                    <input
                                        type="radio"
                                        id="double"
                                        name="elimination"
                                        onChange={this.handleTypeChange}
                                        value={this.tournamentTypes.double}
                                        checked={this.state.tournament.type === this.tournamentTypes.double}  />
                                    <label htmlFor="double"> Double Elimination </label>
                                </div>
                            </div>
                        </div>
                        <div className="tournament-field">
                            <div className="button-field">
                                <input type="submit" value="Generate"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
