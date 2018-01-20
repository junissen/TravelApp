var geoplacesApiKey0 = 'AIzaSyBtFyKPzOmCiguFJEQNXfRdMsqIia2oqSk';

var geoplacesApiKey1 = 'AIzaSyAGSfQ__issw6jvRIGyAspjxxwV53GTP5c';

var geoplacesApiKey2 = 'AIzaSyBla269WqKcDmjRCj1rqyTCw88wSwMIgQs';

var geoplacesApiKey3 = 'AIzaSyA_rHgXs_vLb2tUX2qesrBdF0ijvGFA4GM';

var geoplaceApiKey4 = 'AIzaSyDYDV-ay382NoDxM-WQTtSVzju6pp8v3yI';

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

var searchName = 'Minneapolis';

var pointofInterestQuery = " point of interest";

var restaurantQuery = " restaurant";

var hotelQuery = " hotel";

var apiKeyArray = [geoplacesApiKey0, geoplacesApiKey1, geoplacesApiKey2, geoplacesApiKey3, geoplaceApiKey4];

var currentIndex = 0;

grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);

$(".searchCity").text(searchName + ": " + "Points of Interest");

$('#search').keyup(function(event) {
    if (event.keyCode === 13) {
        searchName = $(this).val();
        grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);
        $(this).val("");
        $(".searchCity").text(searchName);
        // $(".searchCity").text(searchName + " " + query);
        console.log("1");
        console.log(searchName);
        // console.log(searchName + query);
    }
});

$('#searchMenu').keyup(function(event) {
    if (event.keyCode === 13) {
        $(".button-collapse").sideNav('hide');
        searchName = $(this).val();
        grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);
        $(this).val("");
        $(".searchCity").text(searchName);
        console.log("2");
        console.log(searchName);
    }
});

$(".button-collapse").sideNav();

$('#closeMenu').on("click", function(event) {
    $(".button-collapse").sideNav('hide');
});

$('#pointsofInterest').on("click", function(event) {
    grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex])
});

$('#restaurants').on("click", function(event) {
    grabGoogleData(searchName, restaurantQuery, apiKeyArray[currentIndex])
});

$('#hotels').on("click", function(event) {
    grabGoogleData(searchName, hotelQuery, apiKeyArray[currentIndex])
});

$('#pointsofInterestSideNav').on("click", function(event) {
    $(".button-collapse").sideNav('hide');
    grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex])
});

$('#restaurantsSideNav').on("click", function(event) {
    $(".button-collapse").sideNav('hide');
    grabGoogleData(searchName, restaurantQuery, apiKeyArray[currentIndex])
});

$('#hotelsSideNav').on("click", function(event) {
    $(".button-collapse").sideNav('hide');
    grabGoogleData(searchName, hotelQuery, apiKeyArray[currentIndex])
});



function grabGoogleData(location, query, apiKey) {

    $('.photoCarousel').empty();
    $('.info').empty();

    var geoplacesApiURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + location + query + "&language=en&key=" + apiKey;
    var newURL = cors_api_url + geoplacesApiURL;
    var counter = 0;
    var counterList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

    var carousel = $('<div>');
    carousel.attr('class', 'carousel carousel-slider center');
    carousel.attr('data-indicators', 'true');

    $.ajax({
         url:newURL,
         async: false,
         method:'GET'
     }).then(function(response) {
         // Adding place of interest photos
         var resultList = response.results;

         // console.log(resultList);

         if (resultList.length === 0) {
             currentIndex ++
             grabGoogleData(location, query, apiKeyArray[currentIndex]);
         }

         for (var i = 0; i < 10; i ++) {

             var photoReference = resultList[i].photos[0].photo_reference;
             var placeText = resultList[i].name;
             var placeRating = resultList[i].rating;
         
             console.log(resultList[i]);

             // Adding image
             var newImage = $('<img>');
             var src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=" + photoReference + "&key=" + apiKey;
             newImage.attr('src', src);

             var newText = $('<p>');
             newText.attr('class', 'photoText')
             newText.html(placeText);
             
             var newCarousel = $("<a>");
            newCarousel.attr('class', 'carousel-item')
            newCarousel.attr('href', '#' + counterList[counter] + '!')
            newCarousel.append(newImage);
            newCarousel.append(newText);
            carousel.append(newCarousel);
            
            // Adding info

            var titleSub = ""

            if (query === " point of interest") {
                titleSub = "Top Points of Interests in "
            }

            else if (query === " restaurant") {
                titleSub = "Top Restaurants in "
            }

            else if (query === " hotel") {
                titleSub = "Top Hotels in "
            }

            $('.titleInfo').html(titleSub + location);

            var newTitle = $('<h5>');
            newTitle.attr('class', 'cityInfo');
            newTitle.html(placeText);
            newTitle.attr('href', '#' + counterList[counter] + '!');
            var newOpen = $('<h6>');

            if (resultList[i].opening_hours) {
                var placeOpen = resultList[i].opening_hours.open_now;
                
                if (placeOpen == true) {
                    newOpen.html("Open now")
                }
                else {
                    newOpen.html("Not open now")
                }

            }

            newTitle.append(newOpen);

            var newRating = $('<h6>');
            newRating.html('Average user rating: ' + placeRating);

            newTitle.append(newRating);

            $('.info').append(newTitle);

            counter ++;

         }

         counter = 0;

        $('.photoCarousel').append(carousel);
        $('.carousel.carousel-slider.center').carousel({fullWidth:true});
     });
}