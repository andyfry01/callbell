

var fillHandlebars = function(object) {

  directionsOne.innerHTML = "";
  var templateSource = document.getElementById().innerHTML;
  var template = Handlebars.compile(templateSource);
  var container = document.getElementById();
  var computedHtml = template(object);
  var filledTemplate = document.createElement();
  filledTemplate.innerHTML = computedHtml;
  directions.appendChild(filledTemplate);

}
