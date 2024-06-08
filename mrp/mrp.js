$(document).ready(function() {
    getMarsRoverPhotos();
});

function getMarsRoverPhotos() {
    var apiKey = "SVTYfH95wQgVQH1OQVIj7LIGO3KHKVojHBp0Hryh"; // Replace with your actual NASA API key

    $.ajax({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`,
        success: function(response) {
            $("#photo-gallery").empty(); // Clear previous results

            var photos = response.photos;
            console.log("Photos:", photos); // Logging the photos data

            if (photos && photos.length > 0) {
                photos.forEach(photo => {
                    var photoElement = `
                        <div class="photo">
                            <img src="${photo.img_src}" alt="Mars Rover Photo">
                            <p>${photo.earth_date}</p>
                        </div>
                    `;
                    $("#photo-gallery").append(photoElement);
                });
            } else { 
                $("#photo-gallery").html("No photos available for this sol.");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error fetching data:", textStatus, errorThrown); // Logging error details
            $("#photo-gallery").html("Error fetching data.");
        }
    });
}
