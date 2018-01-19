// Things that needed to be added to html file for javascript code:
// 1. List items for drop down menu need IDs added (id names: pointsofInterest, restaurants, hotels)
// 2. ID needs to be added to <input> tag for search, called searchTerm

var geoplacesApiKey = 'AIzaSyBtFyKPzOmCiguFJEQNXfRdMsqIia2oqSk';

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

var searchName = 'Minneapolis';

var pointofInterestQuery = " point of interest";

var restaurantQuery = " restaurant";

var hotelQuery = " hotel";

grabGoogleData(searchName, pointofInterestQuery);

$('#searchTerm').keyup(function(event) {
	if (event.keyCode === 13) {
		searchName = $(this).val();
		grabGoogleData(searchName, pointofInterestQuery);
		$(this).val("");
	}
});

$('#pointsofInterest').on("click", function(event) {
	grabGoogleData(searchName, pointofInterestQuery)
});

$('#restaurants').on("click", function(event) {
	grabGoogleData(searchName, restaurantQuery)
});

$('#hotels').on("click", function(event) {
	grabGoogleData(searchName, hotelQuery)
});


function grabGoogleData(location, query) {

	$('.photoCarousel').empty();
	$('.info').empty();

	var geoplacesApiURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + location + query + "&language=en&key=" + geoplacesApiKey;
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

	 	console.log(resultList);

	 	// var cardTitle = what the person clicks on from menu options

	 	for (var i = 0; i < 10; i ++) {

	 		var photoReference = resultList[i].photos[0].photo_reference;
	 		var placeText = resultList[i].name;
	 		var placeRating = resultList[i].rating;
	 	
	 		console.log(resultList[i]);

	 		// Adding image
	 		var newImage = $('<img>');
	 		var src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=" + photoReference + "&key=" + geoplacesApiKey;
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

//document ready for search location
	//which pulls ajax for pics and card info
	//which pulls ajax for weather
//on click for menu option on whether card info fills with points of interest, restaurants or hotels
	//need to figure out how to do <a> for h5 tag only and point to that location?
	//do we want the menu for that to be on card itself with three buttons instead of on nav bar?
//how do we do map?