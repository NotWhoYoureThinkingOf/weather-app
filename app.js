window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span')
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const APIKey = `8574f343012f8c5b7a7267a82442344b`;
            const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&APPID=${APIKey}`;

            fetch(weatherAPI)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                const { main } = data.current.weather[0]
                locationTimezone.textContent = data.timezone;
                temperatureDegree.textContent = Math.floor(data.current.temp)
                temperatureDescription.textContent = data.current.weather[0].main
                //Formula for celsius
                let celsius = Math.floor((Math.floor(data.current.temp) - 32) * (5 / 9))
                //Set Icon
                setIcons(data.current.weather[0].main, document.querySelector('.icon'))

                //change temp to celsius/fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = celsius;
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(data.current.temp);
                    }
                })
            })
        })
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({
            color: 'white'
        });
        const currentIcon = icon.toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})

        
