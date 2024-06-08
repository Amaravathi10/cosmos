document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("date-form");
    var neoDataContainer = document.getElementById("neo-data");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var startDate = document.getElementById("start-date").value;
        var endDate = document.getElementById("end-date").value;

        // Fetch NEO data based on user-entered dates
        fetchNEOData(startDate, endDate);
    });

    function fetchNEOData(startDate, endDate) {
        var apiKey = "SVTYfH95wQgVQH1OQVIj7LIGO3KHKVojHBp0Hryh"; // Replace with your actual NASA API key

        var apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch NEO data.");
                }
                return response.json();
            })
            .then(data => {
                displayNEOData(data);
            })
            .catch(error => {
                neoDataContainer.innerHTML = "Error fetching NEO data: " + error.message;
            });
    }
    
    function displayNEOData(data) {
        var neoData = data.near_earth_objects;

        // Clear previous data
        neoDataContainer.innerHTML = "";

        // Loop through each date and display NEOs
        for (var date in neoData) {
            if (neoData.hasOwnProperty(date)) {
                var neoObjects = neoData[date];

                neoDataContainer.innerHTML += `<h2>${date}</h2>`;

                neoObjects.forEach(neo => {
                    neoDataContainer.innerHTML += `
                        <div>
                            
                            
                            <h3 style>${neo.name}</h3>
                            <p>ID: ${neo.id}</p>
                            <p>Absolute Magnitude: ${neo.absolute_magnitude_h}</p>
                            <p>Estimated Diameter (km): ${neo.estimated_diameter.kilometers.estimated_diameter_max}</p>
                            <p>Potentially Hazardous: ${neo.is_potentially_hazardous_asteroid}</p>
                            <p>Miss Distance (km): ${neo.close_approach_data[0].miss_distance.kilometers}</p>
                            <p>Orbiting Body: ${neo.close_approach_data[0].orbiting_body}</p>
                            <p>NASA JPL URL(for more details): <a href="${neo.nasa_jpl_url}" target="_blank">${neo.nasa_jpl_url}</a></p>
                        </div>
                    `;
                });
            }
        }
    }
});
