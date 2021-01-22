var cocktailSearchEl= document.getElementById("search-button");
var cocktailIngListEl= document.getElementById("cocktail-info-ul");

// Display old search
var loadCocktails = function() {
    oldSearchEl = document.getElementById("search-history-ul");
    if (oldSearchEl){
    oldSearchEl.remove();
    var oldSearchEl = document.createElement("ul");
    oldSearchEl.id = "search-history-ul";
    oldSearchDivEl =document.getElementById("search-history");
    oldSearchDivEl.append(oldSearchEl);};
  
    citiesList = JSON.parse(localStorage.getItem("cocktailsList"));
    if (cocktailsList){
      for (var i = 0; i < cocktailsList.length; i++)  { 
        var cocktailEl = document.createElement("li");
        cocktailEl.id="old-cocktail";
        cocktailEl.textContent = cocktailsList[i].text;
        oldSearchEl.append(cocktailEl);
      };
    };
  };

// save the cocktail to history and local storage
var saveCocktail = function(cocktail){
    cocktailsList = JSON.parse(localStorage.getItem("cocktailsList"));
    
    if (cocktailsList){
      var cocktailObject ={text:cocktail};
      
      if (!cocktailsList.some(cocktailob => cocktailob.text === cocktail))
        {cocktailsList.push(cocktailObject);};
    }
    else {cocktailsList=[{text:cocktail}]};
  
    localStorage.setItem("cocktailsList", JSON.stringify(cocktailsList));
  
    loadCocktails();
  };

// display the cocktail details
var displayCocktail = async function(CocktailData) {
    console.log(CocktailData.drinks);
    // check if api returned any data
    if (CocktailData.drinks.length === 0) {
      alert("No data found.");   ///////////////////////////// to be replaced by modal
      return;
    };
    
    // loop over data
    for (var i = 0; i < CocktailData.drinks.length; i++) {
        var cocktailIngEl = document.createElement("li");
        cocktailIngEl.id="cocktail-name";
        cocktailIngEl.innerHTML = CocktailData.drinks[i].strDrink ;
        cocktailIngListEl.append(cocktailIngEl);

        var cocktailIngEl = document.createElement("li");
        cocktailIngEl.id="cocktail-ingredient";
        cocktailIngEl.innerHTML = CocktailData.drinks[i].strIngredient1 +"</br>"+ CocktailData.drinks[i].strIngredient2 +"</br>"+ CocktailData.drinks[i].strIngredient3+"</br>"+ CocktailData.drinks[i].strIngredient4 ;
        cocktailIngListEl.append(cocktailIngEl);
    };
}

// call api to get the cocktail details
var getCocktail = function(event) {
   
    //get the cocktail name from the search form
    if ($(this)[0].id=="search-button"){
    event.preventDefault();
    var cocktail = document.getElementById("searchTerm").value;
    document.getElementById("searchTerm").value="";}
    else {var cocktail = event.target.textContent};
    
  
    // check if there is a string in the city name field
    if (cocktail.length === 0) {
      alert("Please enter a Cocktail name.");  ///////////////////////////// to be replaced by modal
      return;
    };
  
    // format the github api url
    var apiUrl ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+cocktail ;
  
    // make a request to the url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            saveCocktail(cocktail);
            displayCocktail(data);
          });
        } else {
          alert("Error: " + response.statusText);  ///////////////////////////// to be replaced by modal
        }
      })
  
      .catch(function(error) {
        alert("Unable to connect" + error);  ///////////////////////////// to be replaced by modal
      });
  };
  
// click the search button
cocktailSearchEl.addEventListener("click", getCocktail);
