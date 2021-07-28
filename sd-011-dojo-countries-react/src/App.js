import React from 'react';
import './App.css';
import { fetchCountries } from './services/countries';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      countries: [],
    };

  }

async componentDidMount() {
  const list = await fetchCountries();
  this.setState({
    countries: list,
  })
  console.log(list[0].translations.br)
}

  render() {

const { countries } = this.state;

    return (
      <main>
        <label htmlFor="filterCountry">
          <input type='text' name="filterCountry"></input>
        </label>
        {countries.map((country) => {
        return (
          <div>
          <h1> {country.translations.br} </h1>
          <img src={country.flag} />
          </div> 
          )
           
        })}
      </main>
    )
  }
}
//
export default App;
