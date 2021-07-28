import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Context from './context/Context';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [firstDropdown, setFirstDropdown] = useState('population');
  const [secondDropdown, setSecondDropdown] = useState('maior que');
  const [inputNumber, setInputNumber] = useState(0);

  // didMount
  useEffect(() => {
    const getPlanet = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((results) => results.json());
      // console.log(data.results);
      setPlanets(data.results);
    };

    getPlanet();
  }, []);

  function handlePlanetFilteredByName({ target: { value } }) {
    setFilterByName(value);
  }

  function handleFirstDropdown({ target: { value } }) {
    setFirstDropdown(value);
  }

  function handleSecondDropDown({ target: { value } }) {
    setSecondDropdown(value);
  }

  function handleInputNumber({ target: { value } }) {
    setInputNumber(parseInt(value, 10));
  }

  function handleButtonFilter() {
    const newFilter = [...filterByNumericValues];
    newFilter.push({
      column: firstDropdown,
      comparison: secondDropdown,
      value: inputNumber,
    });
    setFilterByNumericValues(newFilter);
  }

  function handleButtonClear() {
    setFilterByName('');
    setFilterByNumericValues([]);
    setFirstDropdown('population');
    setSecondDropdown('maior que');
    setInputNumber(0);
  }

  let filteredPlanets = planets.filter((item) => item.name.includes(filterByName));

  filterByNumericValues.forEach((currentFilter) => {
    const { column, comparison, value } = currentFilter;
    // currentFilter sample:
    //   {
    //   column: 'population',
    //   comparison: 'maior que',
    //   value: '100000',
    // },
    if (comparison === 'maior que') {
      filteredPlanets = filteredPlanets.filter((item) => parseInt(item[column], 10)
       > parseInt(value, 10));
    } else if (comparison === 'menor que') {
      filteredPlanets = filteredPlanets.filter((item) => parseInt(item[column], 10)
        < parseInt(value, 10));
    } else if (comparison === 'igual a') {
      filteredPlanets = filteredPlanets.filter((item) => parseInt(item[column], 10)
       === parseInt(value, 10));
    }
  });

  const allColumns = filterByNumericValues.map((item) => item.column);
  const showPopulation = !allColumns.includes('population');
  const showOrbital = !allColumns.includes('orbital_period');
  const showDiameter = !allColumns.includes('diameter');
  const showRotation = !allColumns.includes('rotation_period');
  const showSurface = !allColumns.includes('surface_water');
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handlePlanetFilteredByName }
        value={ filterByName }
      />

      <select
        data-testid="column-filter"
        onChange={ handleFirstDropdown }
        value={ firstDropdown }

      >
        {showPopulation && <option>population</option>}
        {showOrbital && <option>orbital_period</option>}
        {showDiameter && <option>diameter</option>}
        {showRotation && <option>rotation_period</option>}
        {showSurface && <option>surface_water</option>}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ handleSecondDropDown }
        value={ secondDropdown }

      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ inputNumber }
        onChange={ handleInputNumber }
      />
      <div
        data-testid="filter"
      >

        <button
          type="button"
          onClick={ handleButtonClear }
        >
          X
        </button>
      </div>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButtonFilter }
      >
        Aplicar filtro
      </button>
      <Context.Provider
        value={ {
          data: filteredPlanets,
          filters: {
            filterByName: {
              name: filterByName,
            },
            filterByNumericValues,
          },
        } }
      >
        { filteredPlanets.length && <Table /> }
      </Context.Provider>
    </div>
  );
}

export default App;
