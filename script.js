document.addEventListener('DOMContentLoaded', function() {
    const moonPhaseDisplay = document.getElementById('moon-phase-display');
    const moonPhaseImage = document.getElementById('moon-phase-image');

    // A dictionary to map moon phases to image paths (ensure these paths are correct)
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

    function loadMoonPhase() {
        const today = Math.floor(new Date().getTime() / 1000); // Unix timestamp // Get today's date
    
        fetch(`https://api.farmsense.net/v1/moonphases/?d=${today}`)

            .then(response => response.json())
            .then(data => {
                console.log('API Response:', data); // Log the entire response for debugging
                const phase = data[0]?.Phase; // Optional chaining to safely access Phase
                if (!phase) {
                    console.error('No phase returned from API');
                    moonPhaseDisplay.innerHTML = '<p>No moon phase data available.</p>';
                    return;
                }
                moonPhaseDisplay.innerHTML = `<p>Current Moon Phase: ${phase}</p>`;
    
                // Update image based on moon phase
                if (moonPhaseImages[phase]) {
                    moonPhaseImage.src = moonPhaseImages[phase];
                    moonPhaseImage.style.display = "block"; // Show image
                    console.log(`Displaying image for phase: ${phase} at ${moonPhaseImages[phase]}`); // Debug log
                } else {
                    moonPhaseImage.style.display = "none"; // Hide image if no match
                    console.log(`No image found for phase: ${phase}`); // Debug log
                }
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                moonPhaseDisplay.innerHTML = '<p>Error loading moon phase.</p>';
            });
    }
    
    

    // Fetch the moon phase for a specific date
    function getMoonPhaseByDate() {
        const dateInput = document.getElementById('calendar-date').value;
    
        if (!dateInput) {
            document.getElementById('selected-phase').innerHTML = '<p>Please select a valid date.</p>';
            return;
        }
    
        // Convert the selected date to a Unix timestamp (in seconds)
        const selectedDate = new Date(dateInput);
        const unixTimestamp = Math.floor(selectedDate.getTime() / 1000); // Convert to seconds
    
        // Fetch moon phase data using the Unix timestamp
        fetch(`https://api.farmsense.net/v1/moonphases/?d=${unixTimestamp}`)
            .then(response => response.json())
            .then(data => {
                if (data[0].Error) {
                    document.getElementById('selected-phase').innerHTML = `<p>Error: ${data[0].Error_msg}</p>`;
                } else {
                    const phase = data[0].Phase;
                    document.getElementById('selected-phase').innerHTML = `<p>Moon Phase on ${dateInput}: ${phase}</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching moon phase:', error);
                document.getElementById('selected-phase').innerHTML = '<p>Error loading moon phase.</p>';
            });
    }

    // Fetch moonrise and moonset times based on location (lat/lon)
    function getMoonriseSet() {
        const lat = document.getElementById('location-lat').value;
        const lon = document.getElementById('location-lon').value;
    
        // Validate inputs
        if (!lat || !lon) {
            document.getElementById('moonrise-set-times').innerHTML = '<p>Please enter valid latitude and longitude.</p>';
            return;
        }
    
        fetch(`https://cors-anywhere.herokuapp.com/https://api.farmsense.net/v1/moonriseset/?lat=${lat}&lon=${lon}`)


            .then(response => response.json())
            .then(data => {
                console.log('Moonrise/Set API Response:', data); // Log the response for debugging
                if (data.length === 0) {
                    document.getElementById('moonrise-set-times').innerHTML = '<p>No data available for the provided location.</p>';
                    return;
                }
    
                const moonrise = data[0]?.moonrise;
                const moonset = data[0]?.moonset;
                document.getElementById('moonrise-set-times').innerHTML = `
                    <p>Moonrise: ${new Date(moonrise * 1000).toLocaleString()}</p>
                    <p>Moonset: ${new Date(moonset * 1000).toLocaleString()}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching moonrise/set times:', error);
                document.getElementById('moonrise-set-times').innerHTML = '<p>Error loading moonrise/set times.</p>';
            });
    }
    

    // Load current moon phase on page load
    loadMoonPhase();

    // Export functions to the global scope so they can be used in the HTML
    window.getMoonPhaseByDate = getMoonPhaseByDate;
    window.getMoonriseSet = getMoonriseSet;
});
