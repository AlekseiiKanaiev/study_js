let interval; 

window.onload = () => {

    function startTime(){
        setTime();
        interval = setInterval(() => {
            setTime();
        }, 1000);
    }


    function stopTime(){
        console.log('stop');
        clearInterval(interval);
    }

    function setTime(){
        let time = (new Date().toLocaleTimeString('ru', { hour12: false })).split(':');
        hours.textContent = time[0];
        minutes.textContent = time[1];
        seconds.textContent = time[2];
    }

    let clock = document.getElementById('clock');
    let hours = clock.querySelector('.hours');
    let minutes = clock.querySelector('.minutes');
    let seconds = clock.querySelector('.seconds');
    document.getElementById('start-button').addEventListener('click', startTime);
    document.getElementById('stop-button').addEventListener('click', stopTime);
    startTime();

}
