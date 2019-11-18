import React, { Component, useState } from 'react';
import './App.css';
import {connect} from "react-redux";
import logo from "./logo2.png";
import { setCharacter, setRace, characterDetails, getAbilityScr } from './Components/character';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     character: {results: []}, characterDetails: {proficiencies: []}, raceDetatils:{languages: []},
     abilityScore: {results: []}, language_desc: null, languages: [], abilityBonus: [0,0,0,0,0,0],
     characterRace: {results: []}, inputValue: [0,0,0,0,0,0], charName: null, charRace: null,
     charClass: null, isName: false, showAbilities: true
    };
  }

  
  
  render() {
  return (
    
    <div className="App parent-div">
      <div className="header-condoments">
          <img src={logo} className="App-logo" alt="logo" />
          
          <h1 className="title" >Dungions and Dragons Character Sheet</h1>
          </div>
      <header className="App-header">
      
          
          
        
        <div className="left-col"> 
          <div className="input-div">
            <label > Character Name:
            <input  value={this.state.charName} onChange={(evt) => this.updateCharName(evt.target.value)} type="text" min="0" ></input>
          </label>
          <label > Character Class:
           <select className='class-leng' onChange={(event) => this.props.characterDetails(event.target.value).then(response => {
      this.setState({
           characterDetails: response.value,
           charClass: response.value.name
      });
          })}> 
            {this.state.character.results.map((object, index) => 
              <option value={object.url} key={index} >{object.name}</option>
              )}
          </select> 
          </label>
          <label> Character Race:
          <select onChange={(event) => this.props.characterDetails(event.target.value).then(response => {      
              this.setState({
                  raceDetails: response.value,
                  languages: response.value.languages,
                  abilityBonus: response.value.ability_bonuses,
                  language_desc: response.value.language_desc,
                  charRace: response.value.name
              });
              })}> 
            {this.state.characterRace.results.map((object, index) => 
              <option value={object.url} key={index} >{object.name}</option>
              )}
          </select>
          </label>
          </div>
          </div>
          <div className="right-col">
          <div className="txt-sz">
          <div className="name-title">{!this.state.isName ? " " : this.state.charName + " the "} {this.state.charRace} {this.state.charClass}</div>
          <div className="add-space">
          <button className="add-space"onClick={() => this.toggleProficencies()}>Proficiencies</button>
            <ul className={!this.state.showProficencies ? " show " : "hide "}>
             {this.state.characterDetails.proficiencies.map((object, index) =>
              <li className="align-left" key={index}>{object.name}</li>
              )} 
            </ul>
          </div>
          <div className="add-space" >
          <button className="add-space" onClick={() => this.toggleLanguage()}>Languages</button>
            <ul className={!this.state.showLanguage ? " show " : "hide "}>
              <li className="no-deco align-left add-space"> {this.state.language_desc}</li>
             {this.state.languages.map((object, index) =>
              <li className="align-left" key={index}>{object.name}</li>
              )} 
            </ul>
          </div>
          <div className="add-space" >
          <button className="add-space" onClick={() => this.toggleAbilities()}>Ability Score</button>
            <ul className={!this.state.showAbilities ? " show " : "hide "}>
              {this.state.abilityScore.results.map((object, index) =>
              <li className="no-deco align-left"  key={index}>{object.name} {this.state.abilityBonus[index]+ this.state.inputValue[index]} <input className="even" key={index} value={this.state.inputValue[index]} onChange={(evt) => this.updateAbilityScore(index, evt.target.value)} type="number" min="0" max="20" step="1"></input> </li>
              )} 
            </ul>
          </div>
          
        </div>
        </div>
      </header>
    </div>
  );
}

updateAbilityScore(index, evt) {
  const updatedArray = [...this.state.inputValue];
  updatedArray[index] = parseInt(evt);
  this.setState({
    inputValue: updatedArray
  });
  
}
toggleAbilities(){
  this.setState({
    showAbilities: !this.state.showAbilities
  })
}
toggleLanguage(){
  this.setState({
    showLanguage: !this.state.showLanguage
  })
}
toggleProficencies(){
  this.setState({
    showProficencies: !this.state.showProficencies
  })
}
updateCharName(evt){
  {if (evt == ""){
    this.setState({
      isName: false,
      charName: evt
    })
  } else {this.setState({
    isName: true,
    charName: evt
  })}}
  
}
async componentDidMount(){
  let character = this.props.setCharacter().then(response => {
      this.setState({
           character: response.value
      });
 
})
let characterRace = this.props.setRace().then(response => {
  this.setState({
       characterRace: response.value
  });

})
let abilityScore = this.props.getAbilityScr().then(response => {
  this.setState({
       abilityScore: response.value
  });
}) 
}
}
const mapStateToProps = (state) => {
  return state;
}
export default connect(mapStateToProps, {setCharacter, setRace, characterDetails, getAbilityScr})(App);
//export default App;
