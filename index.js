let loc = document.getElementById("cityname");
let climate= document.getElementById("description");
let day=document.getElementById("day");
let date=document.getElementById("date")
let todayDate=new Date();
let temp= document.getElementById("temp");
let tempMax=document.getElementById("valueMax");
let tempMin=document.getElementById("valueMin");
let precipitation= document.getElementById("valueP");
let hum= document.getElementById("valueH");
let windspeed= document.getElementById("valueW");
const searchInput= document.getElementById("search-input");
const searchButton= document.getElementById("search-button");



searchButton.addEventListener('click', (e)=>
{

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';

});

const getWeather=async(city)=>
{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=866c1f23479a4216a239e9eb8a752af9`,
        {mode: 'cors'});

    const weatherData= await response.json();
    const{name}=weatherData;
    const{country}=weatherData.sys;
    const{feels_like}=weatherData.main;
    const{id,main}=weatherData.weather[0];
    const{temp_max}=weatherData.main;
    const{temp_min}=weatherData.main;
    const{pressure}=weatherData.main;
    const{humidity}=weatherData.main;
    const{speed}=weatherData.wind;

    loc.textContent=name + ", " + country;
    climate.textContent=main;
    temp.textContent=Math.round(feels_like-273) + " °C";
    tempMax.textContent=Math.round(temp_max-273) + " °C";
    tempMin.textContent=Math.round(temp_min-273) + " °C";
    precipitation.textContent=Math.round(pressure) + " %";
    hum.textContent=humidity + " %";
    windspeed.textContent=speed + " km/h";
    date.textContent=dateManage(todayDate);
    day.textContent=dayManage(todayDate);
        
    }
    catch(error)
    {
        alert('city not found');
    }

};


window.addEventListener("load" ,()=>
{
    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            
            const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=866c1f23479a4216a239e9eb8a752af9`

            fetch(api).then((response)=>{

                return response.json();
                
            })

            .then(data =>
                {

                    const{name}=data;
                    const{country}=data.sys;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];
                    const{temp_max}=data.main;
                    const{temp_min}=data.main;
                    const{pressure}=data.main;
                    const{humidity}=data.main;
                    const{speed}=data.wind;
                    

                    loc.textContent=name + ", " + country;
                    climate.textContent=main;
                    temp.textContent=Math.round(feels_like-273) + " °C";
                    tempMax.textContent=Math.round(temp_max-273) + " °C";
                    tempMin.textContent=Math.round(temp_min-273) + " °C";
                    precipitation.textContent=Math.round(pressure) + " %";
                    hum.textContent=humidity + " %";
                    windspeed.textContent=speed + " km/h";
                    date.textContent=dateManage(todayDate);
                    day.textContent=dayManage(todayDate);
                    
            })

        })
    }
})    


function dateManage(dateArg){

    

    let months= ["January", "February", "March", "April", "June", "July", "Septmber", "October", "November", "December"];

    let year= dateArg.getFullYear();
    let month= months[dateArg.getMonth()];
    let date= dateArg.getDate();

    return `${date} ${month} ${year}`;
}

function dayManage(dayArg){

    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day= days[dayArg.getDay()];

    return `${day}`;
}

