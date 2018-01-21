var geoplacesApiKey0 = 'AIzaSyBtFyKPzOmCiguFJEQNXfRdMsqIia2oqSk';

var geoplacesApiKey1 = 'AIzaSyAGSfQ__issw6jvRIGyAspjxxwV53GTP5c';

var geoplacesApiKey2 = 'AIzaSyBla269WqKcDmjRCj1rqyTCw88wSwMIgQs';

var geoplacesApiKey3 = 'AIzaSyA_rHgXs_vLb2tUX2qesrBdF0ijvGFA4GM';

var geoplacesApiKey4 = 'AIzaSyDYDV-ay382NoDxM-WQTtSVzju6pp8v3yI';

var geoplacesApiKey5 = 'AIzaSyAZEIrQAkq-XiUz7EvqcHi878-DUA2xCBM';

var geoplacesApiKey6 = 'AIzaSyAtTcT_IofDsjFlCOzk6XQ3jP_YyQRplUI'

var geoMapsEmbedApiKey = 'AIzaSyCN2Ot2OCVfI9m7dkS9oAR5mPgM6_sVS9M';

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

var searchName = 'Minneapolis';

var pointofInterestQuery = " point of interest";

var restaurantQuery = " restaurant";

var hotelQuery = " hotel";

var apiKeyArray = [geoplacesApiKey0, geoplacesApiKey1, geoplacesApiKey2, geoplacesApiKey3, geoplacesApiKey4, geoplacesApiKey5, geoplacesApiKey6];

var currentIndex = 0;

$(document).ready(function() {

    grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);

    // $('#search').keyup(function(event) {
    //       var searchStr = $(this).val();
    //       updateAutocomplete(searchStr);
    // });

    // $('#search').autocomplete().on("click", function(event) {
    //     searchName = $('#search').val()
    //     grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);
    //     $('#search').val("");
    // })

    $('#search').keyup(function(event) {
        if (event.keyCode === 13) {
            searchName = $(this).val();
            grabGoogleData(searchName, pointofInterestQuery, apiKeyArray[currentIndex]);
            $(this).val("");
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

    $('#testButtonForward').on("click", function(event) {
        $('.carousel').carousel('next');
        setTimeout(grabActiveImage, 300);
    })

    $('#testButtonBack').on("click", function(event) {
        $('.carousel').carousel('prev');
        setTimeout(grabActiveImage, 300);
    })


});

function grabGoogleData(location, query, apiKey) {

    $('.photoCarousel').empty();
    $('.info').empty();
    $('#map').empty();

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

            // Adding images in carousel


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

            var newInfoDiv = $('<div>');
            newInfoDiv.attr('class', 'cityInfo');
            newInfoDiv.attr('id', '#' + counterList[counter] + '!');

            var newTitle = $('<div>');
            newTitle.attr('id', 'newPlaceTitle')
            newTitle.html(placeText);
            var newOpen = $('<div>');
            newOpen.attr('id', 'newPlaceOpen')

            if (resultList[i].opening_hours) {
                var placeOpen = resultList[i].opening_hours.open_now;
                
                if (placeOpen == true) {
                    newOpen.html("Open now")
                }
                else {
                    newOpen.html("Not open now")
                }

            }

            else {
                newOpen.html("Always open")
            }

            newTitle.append(newOpen);

            var newRating = $('<div>');
            newRating.attr('id', 'newPlaceRating')

            newRating.html('Average user rating: ' + placeRating);

            newTitle.append(newRating);

            newInfoDiv.append(newTitle);

            $('.info').append(newInfoDiv);

            counter ++;

         }

        counter = 0;

        var newFrame = $('<iframe>');
        // newFrame.attr('width', '400');
        // newFrame.attr('height', '400');
        newFrame.attr('width', '95%');
        newFrame.attr('height', '500');
        newFrame.attr('frameborder', '0');
        newFrame.attr('style', 'border:0');
        newFrame.attr('src', 'https://www.google.com/maps/embed/v1/place?q=' + location + "&key=" + geoMapsEmbedApiKey);
        newFrame.attr('allowfullscreen');

        $('.mapLocation').html("Map of " + location);
        $('#map').append(newFrame);
        $('.photoCarousel').append(carousel);

        $('.carousel.carousel-slider').carousel({fullWidth:true, indicators:false});

        console.log('--------------------------------');
        grabActiveImage();
     });
}

function grabActiveImage() {
    $('.cityInfo').attr('style', "background-color: none")
    var activePhoto = $('a.carousel-item.active');
    var hrefValue = activePhoto[0].hash;
    var textAttr = $('.cityInfo[id="' + hrefValue + '"]');
    textAttr.attr('style', "background-color: red");
}

    // function updateAutocomplete(searchStr) {
    //   var availableTags = {};
    //   jQuery.getJSON("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?key=" + "AIzaSyDfhVC4Hbd8rWHg1IrIONTu7BXot7liwq8" + "&input=" + searchStr)
    //     .done(function(response) {
    //         for (var i=0; i < response.predictions.length; i++) {
    //             var options = response.predictions[i].description;
    //             availableTags[options]=null;
    //         }
    //         console.log(availableTags);
    //         $('#search').autocomplete({
    //           data: availableTags,
    //           limit: 40, // The max amount of results that can be shown at once. Default: Infinity.
    //           onAutocomplete: function(val) {
    //             // Callback function when value is autcompleted.
    //             // console.log("autocompleted")
    //           },
    //           minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    //         });
    //     });
    // }
