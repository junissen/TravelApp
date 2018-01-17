var geoplacesApiKey = 'AIzaSyBtFyKPzOmCiguFJEQNXfRdMsqIia2oqSk';

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

var defaultName = 'Minneapolis';

var pointofInterestQuery = " point of interest";

var restaurantQuery = " restaurant";

grabGoogleData($('.photoCarousel'), defaultName, pointofInterestQuery);

function grabGoogleData(motherDiv, location, query) {

	motherDiv.empty()

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
	 	var resultList = response.results

	 	console.log(resultList)

	 	for (var i = 0; i < 10; i ++) {

	 		var photoReference = resultList[i].photos[0].photo_reference;
	 		var placeText = resultList[i].name;
	 		var placeOpen = resultList[i].opening_hours.open_now;
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

			var newTitle = $('<div>');
			newTitle.attr('class', 'cityInfo');
			newTitle.html(placeText);
			newTitle.attr('href', '#' + counterList[counter] + '!');
			var newOpen = $('<div>');
			
			if (placeOpen == true) {
				newOpen.html("Open now")
			}
			else {
				newOpen.html("Not open now")
			}

			newTitle.append(newOpen);

			var newRating = $('<div>');
			newRating.html('Average user rating: ' + placeRating);

			newTitle.append(newRating);

			$('.info').append(newTitle);

			counter ++;
 

	 	}

	 	counter = 0;

		$(motherDiv).append(carousel);
		$('.carousel.carousel-slider.center').carousel({fullWidth:true});
	 });
}