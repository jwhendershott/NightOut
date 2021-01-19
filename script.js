'use strict';


//set variables
var city = document.getElementById("city-field");
const tmKey = "8IbZBo40AnRzs987iA70DEBWvamJn6Ub"

// .on("click") function associated with Find Drinks button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;
    //logs updated city value to console
    console.log(city);

    //generates call and logs response for openbrewery
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=-name ",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // Makes the brewery listed random
        var breweryChoice = Math.floor(Math.random() * 5);
        console.log(breweryChoice);
        console.log(response[breweryChoice].name);
        console.log(response[breweryChoice].phone);
        console.log(response[breweryChoice].website_url);
        
        $("#name").html("Name: " + response[breweryChoice].name);
        $("#phone").html("Phone Number: " + response[breweryChoice].phone);
        $("#street").html("Street: " + response[breweryChoice].street);

        // Creates variables for mapboxAPI and calls function
        // var streetAddress = response[breweryChoice].street + "%20";
        // var cityAddress = response[breweryChoice].city+ "%20";
        // var stateAddress = response[breweryChoice].state + "%20";
        // var zipCode = response[breweryChoice].postal_code + "%20";
        // mapboxAPI(streetAddress, cityAddress, stateAddress, zipCode);
        var breweryName = response[breweryChoice].name;
        var longitude = response[breweryChoice].longitude;
        var latitude = response[breweryChoice].latitude;
        mapboxAPI(breweryName, longitude, latitude);

    });
    
})

// .on("click") function associated with Find Event button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;
    //logs updated city value to console
    console.log(city);

    //generates call and logs response for ticketmaster
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=" + tmKey + "&city=" + city,
        async:true,
        dataType: "json",
        success: function(response) {
                    console.log(response);
                    // Makes the event listed random
                    var eventChoice = Math.floor(Math.random() * 5);
                    // Parse the response.
                    console.log(response._embedded.events[eventChoice].name);
                    console.log(response._embedded.events[eventChoice].url);

                    $("#event-name").html("Event Name: " + response._embedded.events[eventChoice].name);
                    $("#event-url").html("<a href='" + response._embedded.events[eventChoice].url + "'>" + response._embedded.events[eventChoice].url + "</a>");
                    

                },
        error: function(err) {
                    console.log(err)
                }
    }) 
    
});

// Function associated with Mapbox API
function mapboxAPI(breweryName, longitude, latitude) {
    // console.log(streetAddress);
    // console.log(cityAddress);
    // console.log(stateAddress);
    // console.log(zipCode);
    console.log(breweryName);
    console.log(longitude);
    console.log(latitude);

    // Generates and logs response from Mapbox
    $.ajax({
        // url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + streetAddress + cityAddress + stateAddress + zipCode + ".json?access_token=pk.eyJ1IjoicmNoYXBoZWthciIsImEiOiJja2swcHU5eGowZzlrMm9vdGZjYW41cmQyIn0.6LlorWQZFVTlXJcLezW6pw",
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + breweryName + ".json?proximity=" + longitude + "," + latitude + "&access_token=pk.eyJ1IjoicmNoYXBoZWthciIsImEiOiJja2swcHU5eGowZzlrMm9vdGZjYW41cmQyIn0.6LlorWQZFVTlXJcLezW6pw",
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
};

$("#searchResults").hide();

$("#searchButton").click(function(){
    var searchBar = $("#city-field").val();
    var modal = $(".modal");
    
    if (searchBar == "") {
        modal.addClass("is-active");
        $(".modal-close").click(function(){
            modal.removeClass("is-active");
        });
        $(".modal-background").click(function(){
            modal.removeClass("is-active");
        });
    }
    else {
        $("#searchResults").show();
    }
})