'use strict';
//main container
var mainContainer = document.createElement('div');
AttributeNaming(mainContainer, 'id', 'maincontainer');
mainContainer.innerHTML = '   <h1>Data Finder App</h1>';

//upper container
var upperContainer = document.createElement('div');
AttributeNaming(upperContainer, 'id', 'uppercontainer');

var form = document.createElement('form');
AttributeNaming(form, 'id', 'myform');
upperContainer.append(form);

//search bar and search button

var input = document.createElement('input');

AttributeNaming(input, 'type', 'text');
AttributeNaming(input, 'id', 'name');
AttributeNaming(input, 'required', true);
AttributeNaming(input, 'placeholder', 'Enter first name');

var sub = document.createElement('input');
AttributeNaming(sub, 'type', 'submit');
AttributeNaming(sub, 'value', 'search');
AttributeNaming(sub, 'id', 'searchButton');
form.append(input, sub);
//---append containers---//
mainContainer.append(upperContainer);
document.body.append(mainContainer);

//lower containers of nationality and probolity
let divNationality = document.createElement('div');
AttributeNaming(divNationality, 'id', 'nationality');

let divProbability = document.createElement('div');
AttributeNaming(divProbability, 'id', 'probability');

var lowerContainer = document.createElement('div');
AttributeNaming(lowerContainer, 'id', 'lowercontainer');
lowerContainer.append(divNationality, divProbability);

mainContainer.append(lowerContainer);

function AttributeNaming(variableName, attribute, attributeValue) {
  variableName.setAttribute(attribute, attributeValue);
}

var forms = document.getElementById('myform');
forms.addEventListener('submit', event => {
  event.preventDefault();
  var nameIs = document.getElementById('name').value;
  var url = `https://api.nationalize.io/?name=${nameIs}`;
  dataFinder(url);
});

async function dataFinder(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    let index = data.country.length;

    let nationalityIs = document.getElementById('nationality');
    nationalityIs.innerHTML = ' ';
    let probabilityValue = document.getElementById('probability');
    probabilityValue.innerHTML = ' ';

    if (data.country.length === 0) {
      nationalityIs.innerHTML = `

SORRY! No Data available`;

      //      probabilityValue.innerHTML = `Probability :SORRY! No Data`;
    }

    for (let i in data.country) {
      if (i <= 1) {
        nationalityIs.innerHTML += `
  <p>
    Nationality:<span>${data.country[i].country_id}</span>
  </p>`;
      }
    }

    for (let i in data.country) {
      probabilityValue.innerHTML += `
        
        
  <p>
   Probability:<span>${data.country[i].probability}</span>
  </p>

        
        `;
    }
  } catch (error) {
    console.log(error);
  }
}
