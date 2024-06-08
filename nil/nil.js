function getNasaImages() {
    var searchQuery = $("#search").val();
    
    $.ajax({
        url: `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`, 
        success: function(response) {
            var items = response.collection.items;
            $("#image-gallery").empty(); // Clear previous results
            
            if (items.length > 0) {
                items.forEach(item => {
                    var imageUrl = item.links[0].href;
                    var title = item.data[0].title;
                    var imageElement = `
                        <div class="image-item">
                            <img src="${imageUrl}" alt="${title}">
                            <h3>${title}</h3>
                        </div>
                    `;
                    $("#image-gallery").append(imageElement);
                });
            } else {
                $("#image-gallery").html("No results found.");
            }
        },
        error: function() {
            $("#image-gallery").html("Error fetching data.");
        }
    });
}
