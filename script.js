// script.js
document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');

    // Placeholder for moon phase calculation (could use an API or algorithm)
    function loadMoonPhase() {
        // For now, just display a placeholder moon phase
        moonPhaseDisplay.innerHTML = "<p>Current Moon Phase: Full Moon</p>";
    }

    loadMoonPhase();
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');

    // Fetch the current moon phase from an API (placeholder URL)
    function loadMoonPhase() {
        fetch('https://api.farmsense.net/v1/moonphases/?d=2024-09-27')
            .then(response => response.json())
            .then(data => {
                const phase = data[0].Phase;
                moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                moonPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    loadMoonPhase();
});

// script.js

function getMoonriseSet() {
    const lat = document.getElementById('location-lat').value;
    const lon = document.getElementById('location-lon').value;
    if (!lat || !lon) {
        document.getElementById('moonrise-set-times').innerHTML = '<p>Please enter valid latitude and longitude.</p>';
        return;
    }

    // Placeholder URL for moonrise/set API (replace with actual API)
    fetch(`https://api.weather.com/v3/astronomy?lat=${lat}&lon=${lon}&format=json&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const moonrise = data.moonrise;
            const moonset = data.moonset;
            document.getElementById('moonrise-set-times').innerHTML = `<p>Moonrise: ${moonrise}, Moonset: ${moonset}</p>`;
        })
        .catch(error => {
            console.error('Error fetching moonrise/set times:', error);
            document.getElementById('moonrise-set-times').innerHTML = '<p>Error loading moonrise/set times.</p>';
        });
}

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');
    const selectedPhaseDisplay = document.getElementById('selected-phase');

    // Fetch the current moon phase
    function loadMoonPhase() {
        fetch('https://api.farmsense.net/v1/moonphases/?d=2024-09-27')
            .then(response => response.json())
            .then(data => {
                const phase = data[0].Phase;
                moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;
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
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                selectedPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    loadMoonPhase();
    window.getMoonPhaseByDate = getMoonPhaseByDate;
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');

    // Fetch the current moon phase from Farmsense API
    function loadMoonPhase() {
        const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

        fetch(`https://api.farmsense.net/v1/moonphases/?d=${today}`)
            .then(response => response.json())
            .then(data => {
                const phase = data[0].Phase;
                moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                moonPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    loadMoonPhase();
});

// Fetch the moon phase for a specific date from Farmsense API
function getMoonPhaseByDate() {
    const date = document.getElementById('calendar-date').value;

    if (!date) {
        document.getElementById('selected-phase').innerHTML = '<p>Please select a valid date.</p>';
        return;
    }

    fetch(`https://api.farmsense.net/v1/moonphases/?d=${date}`)
        .then(response => response.json())
        .then(data => {
            const phase = data[0].Phase;
            document.getElementById('selected-phase').innerHTML = `<p>Moon Phase on ${date}: ${phase}</p>`;
        })
        .catch(error => {
            console.error('Error fetching moon phase:', error);
            document.getElementById('selected-phase').innerHTML = '<p>Error loading moon phase.</p>';
        });
}


// script.js

function loadMoonPhase() {
    const today = new Date().toISOString().split('T')[0]; // Get today's date

    fetch(`https://api.farmsense.net/v1/moonphases/?d=${today}`)
        .then(response => response.json())
        .then(data => {
            const phase = data[0].Phase;
            moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;

            // Update image based on moon phase
            if (moonPhaseImages[phase]) {
                moonPhaseImage.classList.add('hide');  // Start fading out
                setTimeout(() => {
                    moonPhaseImage.src = moonPhaseImages[phase];
                    moonPhaseImage.classList.remove('hide');
                    moonPhaseImage.classList.add('show');  // Fade in the new image
                }, 500); // Wait for fade-out transition
            } else {
                moonPhaseImage.style.display = "none"; // Hide image if no match
            }
        })
        .catch(error => {
            console.error('Error fetching moon phase:', error);
            moonPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
        });
}
