const countrysInfoContainer = document.querySelector('.countrysInfoContainer')
const countryInput = document.getElementById('countryInput')
const searchBtn = document.getElementById('searchBtn')
// spinner loader
const spinnerLoader = document.querySelector('.loading')
const mainContainer = document.querySelector('.container')
document.addEventListener('DOMContentLoaded', ()=>{
    spinnerLoader.classList.remove('hide')
    mainContainer.classList.add('hide')
})
window.addEventListener('load', function(){
    setTimeout(()=>{
        spinnerLoader.classList.add('hide')
        mainContainer.classList.remove('hide')
    }, 3000)
})
// listening for an event

searchBtn.addEventListener('click', function(){
    const enteredCountryName = countryInput.value
    if(enteredCountryName === ''){
        alert('Please Enter A Country Name...!!!')
    } else {
        const finalURL = `https://restcountries.com/v3.1/name/${enteredCountryName}?fullText=true`
        console.log(finalURL)
        async function fetchCountryGuideData(){
            const response = await fetch(finalURL)
            const fetchedData = await response.json()
            console.log(fetchedData[0])
            displayCountrysInfoOnUI(fetchedData)
        }
        fetchCountryGuideData()
    }
})

function displayCountrysInfoOnUI(data){
    countrysInfoContainer.innerHTML = ''
    console.log(data)
    const countrysInfoContainerTemplate = `
            <div class="heading">
                <h3>Country's Information</h3>
            </div>
            <div class="country-flag-image-container">
                <img src="${data[0].flags.svg}" alt="${data[0].flags.alt}">
            </div>
            <div class="countryNameContainer">
                <h3>Republic Of ${data[0].name.nativeName
                    ? data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].official : data[0].name.official}</h3>
            </div>
            <div class="country-subs-and-detail-image-container">
                <div class="country-subs">
                    <h4>Capital City : <span>${data[0].capital[0]}</span></h4>
                    <h4>Continent : <span>${data[0].continents[0]}</span></h4>
                    <h4>Population : <span>${data[0].population}</span></h4>
                    <h4>Currency : <span>${Object.keys(data[0].currencies)[0]}</span> - <span>${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</span></h4>
                    <h4>Common Language Spoken : <span>${data[0].languages[Object.keys(data[0].languages)[0]]}</span></h4>
                </div>
                <div class="details-image-container">
                    <img src="./Images/3d-travel-icon-with-couple.png" alt="">
                </div>
            </div>
    `
    countrysInfoContainer.insertAdjacentHTML('beforeend', countrysInfoContainerTemplate)
}