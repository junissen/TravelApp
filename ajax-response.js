var geoplacesApiKey = 'AIzaSyBtFyKPzOmCiguFJEQNXfRdMsqIia2oqSk';

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

var placeName = 'Minneapolis';

var pointofInterestQuery = placeName + " point of interest"

grabPointOfInterestData($('.photoCarousel'));

function grabPointOfInterestData(motherDiv) {

	motherDiv.empty()

	var geoplacesApiURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + pointofInterestQuery + "&language=en&key=" + geoplacesApiKey;
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

	 	for (var i = 0; i < resultList.length; i ++) {

	 		var photoReference = resultList[i].photos[0].photo_reference
	 		var photoText = resultList[i].name

	 		console.log(photoText);



	 		var newImage = $('<img>');
	 		var src = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=500&photoreference=" + photoReference + "&key=" + geoplacesApiKey;
	 		newImage.attr('src', src);

	 		var newText = $('<p>');
	 		newText.attr('class', 'photoText')
	 		newText.html(photoText);
	 		

	 		var newCarousel = $("<a>");
			newCarousel.attr('class', 'carousel-item')
			newCarousel.attr('href', '#' + counterList[counter] + '!')
			newCarousel.append(newImage);
			newCarousel.append(newText);
			carousel.append(newCarousel);
			counter ++;

	 	}

	 	counter = 0;

		$(motherDiv).append(carousel);
		$('.carousel.carousel-slider.center').carousel({fullWidth:true});
	 });
}