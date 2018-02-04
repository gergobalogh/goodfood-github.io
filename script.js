/* global $ */
// clear input after search
var resetForm = function() {
    $('#user-location').val('');
};

//hide results display before the search
var hideDisplay = function() {
    $('.results-container').hide();
};

//  display search results
var showResults = function(result) {
    $('.results-container').show();
    $('.results-container').html('');
    for (var i = 0; i <= 10; i++) {
        
        
        $('.results-container').append(
            '<br><b><span class="venue-title><a target="_blank" href="' + result.response.groups[0].items[i].venue.url + '">' + result.response.groups[0].items[i].venue.name + '</a></span></b></br>' +
            '<br><b><span>Venue Type:</span></b>	' + result.response.groups[0].items[i].venue.categories[0].name +
            '<br><b><span>Address:</span></b>	' + result.response.groups[0].items[i].venue.location.formattedAddress[0] + ', ' + result.response.groups[0].items[i].venue.location.formattedAddress[1] +
            '<br><b><span>Phone:</span></b>	' + result.response.groups[0].items[i].venue.contact.formattedPhone +
            '<br><b><span>Hours:</span></b>	' + result.response.groups[0].items[i].venue.hours.status +
            '<br><b><span>Facebook page: </span><a href="https://www.facebook.com/' + result.response.groups["0"].items[i].venue.contact.facebookUsername + '">'+ result.response.groups["0"].items[i].venue.contact.facebookUsername + '</a></b>' +
            '<br><b><span>Good to know:</span></b>	' + result.response.groups[0].items[i].tips[0].text + '<br><br>'
        );
            
    
}
};
// return data from Api
var getVenues = function(userLocation) {

    // the parameters we need to pass to FourSquare's API
    var request = {
        near: userLocation,
        client_id: 'XIEMD4N1KGMKC2IEHSBD4FGWLZ3YIVYYFIVKKXUMYZIERG0T',
        client_secret: 'MPJX2PONHDN4X4ISWQNQYDBQT0QSM33GOITRGNKQO3FYJPG0',
        section: 'food',
        openNow: '1',
        sortByDistance: '1',
        v: '20180204',
    };

    var result = $.ajax({
            url: "https://api.foursquare.com/v2/venues/explore",
            data: request,
            dataType: "jsonp",
            type: "GET",
        })
        .done(function(result) {
            showResults(result);
        })
        .fail(function(jqXHR, error) {
            var errorElem = showError(error);
            $('.results-container').append("Aww snap! Something went wrong with your request!");
        });

};

//App kicks in here
$(document).ready(function() {
    hideDisplay();
    $("#submit-button").on('click', function(e) {
        e.preventDefault();
        var userLocation = $("#user-location").val();
        getVenues(userLocation);
        resetForm();
    });
});