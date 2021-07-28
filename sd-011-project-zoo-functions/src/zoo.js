/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  const idsFiltered = data.species.filter((value) => {
    console.log('------');
    console.log('value id', value.id, value.name);
    let existeElementoMatch = ids.includes(value.id);
    // for (let i = 0; i < ids.length; i += 1) {
    //   console.log(`verificando se ${value.id} === ${ids[i]}`);
    //   if (value.id === ids[i]) {
    //     existeElementoMatch = true;
    //     break;
    //   }
    // }
    console.log(`retornando ${existeElementoMatch} `);
    return existeElementoMatch;
  });
  return idsFiltered;
}

function getAnimalsOlderThan(animal, age) {
  const verifyAge = data.species.some((value) => {
    let condicao1 = value.name === animal;
    let condicao2 = value.residents.every((resident) => resident.age >= age);
    //  let condicao2 = true;
    //  for (let i = 0; i < value.residents.length; i +=1) {
    //    let currentAge = value.residents[i].age;
    //     if (currentAge < age) {
    //       condicao2 = false;
    //       break;
    //     }
    //  }
    return condicao1 && condicao2;
  });
  return verifyAge;
}

function getEmployeeByName(...employeeNames) {
  if (employeeNames.length === 0) {
    return {};
  }
  let firstOrSecondName = employeeNames[0];
  const verifyFirstName = data.employees.filter((value) => (value.firstName === firstOrSecondName || value.lastName === firstOrSecondName));
  return verifyFirstName[0];
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((value) => value.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species === undefined) {
    let response = data.species.reduce((acc, value) => {
      acc[value.name] = value.residents.length;
      return acc;
    }, {});
    return response;
  }
  const result = data.species.filter((value) => value.name === species);
  return result[0].residents.length;
}

function calculateEntry(entrants = {}) {
  let result = 0;
  const {
    Senior = 0,
    Adult = 0,
    Child = 0,
  } = entrants;
  result += Senior * data.prices.Senior;
  result += Adult * data.prices.Adult;
  result += Child * data.prices.Child;
  return result;
}

function handleAnimals() {
  let response = data.species.reduce((acc, value) => {
    if (!acc[value.location]) {
      acc[value.location] = [];
    }
    acc[value.location].push(value.name);
    return acc;
  }, {});
  return response;
}

function handleAnimalsWithName(options) {
  let response = data.species.reduce((acc, value) => {
    if (!acc[value.location]) {
      acc[value.location] = [];
    }
    let obj = {};
    let arrayAnimais = value.residents.map((value2) => value2.name);

    if (options.sex) {
      arrayAnimais = value.residents
        .filter((value2) => value2.sex === options.sex)
        .map((value3) => value3.name);
    }
    if (options.sorted === true) {
      arrayAnimais.sort();
    }
    obj[value.name] = arrayAnimais;
    acc[value.location].push(obj);
    return acc;
  }, {});
  return response;
}

function getAnimalMap(options) {
  if (!options || !options.includeNames) {
    return handleAnimals();
  }
  if (options && options.includeNames === true) {
    return handleAnimalsWithName(options);
  }
}

function HandleHour(number) {
  if (number < 12) {
    return `${number}am`;
  }
  return `${number - 12}pm`;
}
function formatHour(obj) {
  if (obj.close === 0) {
    return 'CLOSED';
  }
  return `Open from ${HandleHour(obj.open)} until ${HandleHour(obj.close)}`;
}

function getSchedule(dayName) {
  if (!dayName) {
    return {
      Monday: formatHour(data.hours.Monday),
      Tuesday: formatHour(data.hours.Tuesday),
      Wednesday: formatHour(data.hours.Wednesday),
      Thursday: formatHour(data.hours.Thursday),
      Friday: formatHour(data.hours.Friday),
      Saturday: formatHour(data.hours.Saturday),
      Sunday: formatHour(data.hours.Sunday),
    };
  }
  let obj = {};
  obj[dayName] = formatHour(data.hours[dayName]);
  return obj;
}

function getOldestFromFirstSpecies(id) {
  let myEmployee = data.employees.find((value) => value.id === id);
  // console.log(myEmployee)
  const animals = myEmployee.responsibleFor.reduce((acc, value) => {
    const specieById = data.species.find((value2) => value2.id === value);
    // console.log('AQUI', specieById.residents);
    acc = [...acc, ...specieById.residents];
    return acc;
  }, []);
  animals.sort((a, b) => b.age - a.age);
  return Object.values(animals[0]);
}
function increasePrices(percentage) {
  const key = Object.keys(data.prices);
  const NewObj = key.forEach((pricesKey) => {
    data.prices[pricesKey] = Math.round(data.prices[pricesKey] * (1 + percentage / 100) * 100) / 100;
  });
  return NewObj;
}

function getEmployeeCoverage(idOrName) {
  const employee = data.employees.find(({ id, firstName, lastName }) => idOrName === id || idOrName === firstName || idOrName === lastName);
  let obj = {};
  if (!idOrName) {
    data.employees.forEach((elementEmployee) => {
      obj[`${elementEmployee.firstName} ${elementEmployee.lastName}`] = elementEmployee.responsibleFor.map((animal1) => data.species.find((animal2) => animal2.id === animal1).name);
    });
    return obj;
  }
  obj[`${employee.firstName} ${employee.lastName}`] = employee.responsibleFor.map((animal1) => data.species.find((animal2) => animal2.id === animal1).name);
  return obj;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
