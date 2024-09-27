document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');
    const moonPhaseImage = document.getElementById('moon-phase-image');
    const moonriseSetTimes = document.getElementById('moonrise-set-times');
    const selectedPhaseDisplay = document.getElementById('selected-phase');

    // Map moon phases to their corresponding images
    const moonPhaseImages = {
        "New Moon": "images/new_moon.png",
        "Waxing Crescent": "images/waxing_crescent.png",
        "First Quarter": "images/first_quarter.png",
        "Waxing Gibbous": "images/waxing_gibbous.png",
        "Full Moon": "images/full_moon.png",
        "Waning Gibbous": "images/waning_gibbous.png",
        "Last Quarter": "images/last_quarter.png",
        "Waning Crescent": "images/waning_crescent.png"
    };

    // Fetch the current moon phase
    function loadMoonPhase() {
        const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

        fetch(`https://api.farmsense.net/v1/moonphases/?d=${today}`)
            .then(response => response.json())
            .then(data => {
                const phase = data[0].Phase;
                moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;

                // Update image based on moon phase
                if (moonPhaseImages[phase]) {
                    moonPhaseImage.src = moonPhaseImages[phase];
                    moonPhaseImage.style.display = "block"; // Show image
                } else {
                    moonPhaseImage.style.display = "none"; // Hide image if no phase found
                }
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                moonPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    // Fetch the moon phase for a specific date
    function getMoonPhaseByDate() {
        const date = document.getElementById('calendar-date').value;

        if (!date) {
            selectedPhaseDisplay.innerHTML = '<p>Please select a valid date.</p>';
            return;
        }

        fetch(`https://api.farmsense.net/v1/moonphases/?d=${date}`)
            .then(response => response.json())
            .then(data => {
                const phase = data[0].Phase;
                selectedPhaseDisplay.innerHTML = `<p>Moon Phase on ${date}: ${phase}</p>`;

                // Update image based on moon phase
                if (moonPhaseImages[phase]) {
                    moonPhaseImage.src = moonPhaseImages[phase];
                    moonPhaseImage.style.display = "block"; // Show image
                } else {
                    moonPhaseImage.style.display = "none"; // Hide image if no phase found
                }
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                selectedPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    // Fetch moonrise and moonset times based on location (lat/lon)
    function getMoonriseSet() {
        const lat = document.getElementById('location-lat').value;
        const lon = document.getElementById('location-lon').value;

        if (!lat || !lon) {
            moonriseSetTimes.innerHTML = '<p>Please enter valid latitude and longitude.</p>';
            return;
        }

        // Call weather.com API (replace with your actual API key)
        fetch(`https://api.weather.com/v3/astronomy?lat=${lat}&lon=${lon}&format=json&apiKey=483cdf821a6a4cd6bb363126242709`)
            .then(response => response.json())
            .then(data => {
                const moonrise = data.moonrise || 'N/A';
                const moonset = data.moonset || 'N/A';
                moonriseSetTimes.innerHTML = `<p>Moonrise: ${moonrise}, Moonset: ${moonset}</p>`;
            })
            .catch(error => {
                console.error('Error fetching moonrise/set times:', error);
                moonriseSetTimes.innerHTML = '<p>Error loading moonrise/set times.</p>';
            });
    }

    // Load current moon phase on page load
    loadMoonPhase();

    // Export functions to the global scope so they can be used in the HTML
    window.getMoonPhaseByDate = getMoonPhaseByDate;
    window.getMoonriseSet = getMoonriseSet;
});
