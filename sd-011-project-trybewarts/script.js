function handleLogin() {
  const loginText = document.getElementById('login').value;
  const passwordText = document.getElementById('senha').value;
  if ((loginText === 'tryber@teste.com') && (passwordText === '123456')) {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

function handleAgreement(event) {
  const agreeElement = event.target;
  const buttonSubmit = document.getElementById('submit-btn');
  if (agreeElement.checked === true) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}

function countCaracter() {
  const textEntered = document.getElementById('textarea').value;
  const counter = (500 - textEntered.length);
  const countRemaining = document.getElementById('counter');
  countRemaining.textContent = counter;
}

function handleChangeFullName() {
  const nameElement = document.getElementById('input-name');
  const nameFilled = nameElement.value;
  const lastNameFilled = document.getElementById('input-lastname').value;
  const divParent = nameElement.parentNode;
  divParent.innerHTML = `Nome: ${nameFilled} ${lastNameFilled}`;
}

function handleChangeEmail() {
  const emailElement = document.getElementById('input-email');
  const emailFilled = emailElement.value;
  const divParent = emailElement.parentNode;
  divParent.innerHTML = `Email: ${emailFilled}`;
}

function handleChangeHouse() {
  const houseElement = document.getElementById('input-house');
  const houseSelected = houseElement.value;
  const divParent = houseElement.parentNode;
  divParent.innerHTML = `Casa: ${houseSelected}`;
}

function handleFamily() {
  const familyElementSelected = document.querySelector('input[name="family"]:checked');
  const familyElementValue = familyElementSelected.value;
  const divParent = familyElementSelected.parentNode;
  divParent.innerHTML = `Família: ${familyElementValue}`;
}

function handleSubject() {
  const subjectElementSelected = document.getElementsByName('materia');
  const subjectsSelected = [];
  for (let i = 0; i < subjectElementSelected.length; i += 1) {
    if (subjectElementSelected[i].checked === true) {
      subjectsSelected.push(subjectElementSelected[i].value);
    }
  }
  const divParent = subjectElementSelected[0].parentNode;
  divParent.innerHTML = `Matérias: ${subjectsSelected.join(', ')}`;
}

function handleChanges() {
  handleChangeFullName();
  handleChangeEmail();
  handleChangeHouse();
  handleFamily();
  handleSubject();
}

const button = document.getElementById('botao');
button.addEventListener('click', handleLogin);

const agreement = document.getElementById('agreement');
agreement.addEventListener('change', handleAgreement);

const textAreaElement = document.getElementById('textarea');
textAreaElement.addEventListener('keyup', countCaracter);

const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', handleChanges);
