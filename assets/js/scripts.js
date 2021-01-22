var cocktailSearchEl = document.getElementById("search-button");
var oldCocktailEl = document.getElementById("search-history");
var clearHirstoryEl = document.getElementById("clear-history");
var randomEl = document.getElementById("random");


// clear history
var clearHistory = function () {
  cocktailsList = [];
  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  loadCocktails();
  oldCocktailEl = document.getElementById("cocktail-info-ul");
  if (oldCocktailEl) {
    oldCocktailEl.remove();
    var oldCocktailEl = document.createElement("ul");
    oldCocktailEl.id = "cocktail-info-ul";
    oldCocktailDivEl = document.getElementById("cocktail-info");
    oldCocktailDivEl.append(oldCocktailEl);
  };
};

// Display old search
var loadCocktails = function () {
  oldSearchEl = document.getElementById("search-history-ul");
  if (oldSearchEl) {
    oldSearchEl.remove();
    var oldSearchEl = document.createElement("ul");
    oldSearchEl.id = "search-history-ul";
    oldSearchDivEl = document.getElementById("search-history");
    oldSearchDivEl.append(oldSearchEl);
  };

  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
  if (cocktailsList) {
    for (var i = 0; i < cocktailsList.length; i++) {
      var cocktailEl = document.createElement("li");
      cocktailEl.id = "old-cocktail";
      cocktailEl.textContent = cocktailsList[i].text;
      oldSearchEl.append(cocktailEl);
    };
  };
};

// save the cocktail to history and local storage
var saveCocktail = function (cocktail) {
  cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));

  if (cocktailsList) {
    var cocktailObject = { text: cocktail };

    if (!cocktailsList.some(cocktailob => cocktailob.text == cocktail)) { cocktailsList.push(cocktailObject); };
  }
  else {
    if (!cocktail == "") { cocktailsList = [{ text: cocktail }] };
  };

  localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));

  loadCocktails();
};

// display the cocktail details
var displayCocktail = async function (CocktailData) {

  // check if api returned any data
  if (CocktailData.drinks.length === 0) {
    alert("No data found.");   ///////////////////////////// to be replaced by modal
    return;
  };

  oldCocktailEl = document.getElementById("cocktail-info-ul");
  if (oldCocktailEl) {
    oldCocktailEl.remove();
    var oldCocktailEl = document.createElement("ul");
    oldCocktailEl.id = "cocktail-info-ul";
    oldCocktailDivEl = document.getElementById("cocktail-info");
    oldCocktailDivEl.append(oldCocktailEl);
  };

  var cocktailIngListEl = document.getElementById("cocktail-info-ul");

  // loop over data
  for (var i = 0; i < CocktailData.drinks.length; i++) {
    var cocktailIngEl = document.createElement("li");
    cocktailIngEl.id = "cocktail-name";
    cocktailIngEl.innerHTML = CocktailData.drinks[i].strDrink;
    cocktailIngListEl.append(cocktailIngEl);

    var cocktailIngEl = document.createElement("li");
    cocktailIngEl.id = "cocktail-ingredient";
    cocktailIngEl.innerHTML = CocktailData.drinks[i].strIngredient1 + "</br>" + CocktailData.drinks[i].strIngredient2 + "</br>" + CocktailData.drinks[i].strIngredient3 + "</br>" + CocktailData.drinks[i].strIngredient4;
    cocktailIngListEl.append(cocktailIngEl);
  };
}

// call api to get the cocktail details
var getCocktail = function (event) {
  var checkRandom = false;
  //get the cocktail name from the search form
  if ($(this)[0].id == "search-button" || $(this)[0].id == "random") {
    if ($(this)[0].id == "random") { checkRandom = true; };
    event.preventDefault();
    var cocktail = document.getElementById("searchTerm").value;

    document.getElementById("searchTerm").value = "";

    oldCocktailEl = document.getElementById("cocktail-info-ul");
    if (oldCocktailEl) {
      // scroll down to results
      $('html, body').animate(
        {
          scrollTop: $(oldCocktailEl).offset().top,
        },
        200,
        'linear'
      )

      // displays results
      oldCocktailEl.remove();
      var oldCocktailEl = document.createElement("ul");
      oldCocktailEl.id = "cocktail-info-ul";
      oldCocktailDivEl = document.getElementById("cocktail-info");
      oldCocktailDivEl.append(oldCocktailEl);
    };

  }
  else { var cocktail = event.target.textContent };

  // check if there is a string in the city name field
  if ((checkRandom == false) && cocktail.length == 0) {
    alert("Please enter a Cocktail name.");  ///////////////////////////// to be replaced by modal
    return;
  };

  // format the github api url
  if ($(this)[0].id == "random") { var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"; }
  else { var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail };

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          if (data.drinks) {
            if (cocktail) { saveCocktail(cocktail); }
            else { saveCocktail(data.drinks[0].strDrink) };
            displayCocktail(data);
          }
          else { alert("Sorry, we don't have this drink!") };  ///////////////////////////// to be replaced by modal};
        });
      } else {
        alert("Error: " + response.statusText);  ///////////////////////////// to be replaced by modal
      }
    })

    .catch(function (error) {
      alert("Unable to connect" + error);  ///////////////////////////// to be replaced by modal
    });
};

// load old cocktails
loadCocktails();

// click the search button
cocktailSearchEl.addEventListener("click", getCocktail);

// click the clear history button
clearHirstoryEl.addEventListener("click", clearHistory);

// click the random button
randomEl.addEventListener("click", getCocktail);

// click on one of the old cocktails
oldCocktailEl.addEventListener("click", getCocktail);


$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });