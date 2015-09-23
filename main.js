//Setting an Angular module: myApp
angular.module ('myApp',[])

//Defining the Controller function: mainControllerFunc
var mainControllerFunc = function ($scope, $timeout) {


var foodItemArray = []
var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name = name
	this.calories = calories
	this.vegan = vegan
	this.glutenFree = glutenFree
	this.citrusFree = citrusFree

	foodItemArray.push(this)
}

FoodItem.prototype.stringify = function () {
	
	var diet = []
	if (this.vegan) diet.push('Vegan')
	if (this.glutenFree) diet.push('Gluten Free')
	if (this.citrusFree) diet.push('Citrus Free')

	var description = this.name + ': has ' + this.calories +' calories, and is suitable for: '
	for (var i=0; i<diet.length; i++) {
		if (i<diet.length-1)
		description += diet[i] + ', '
		else if (diet.length === 1) description += diet[i] + ' diets.'
		else description += 'and ' + diet[i] + ' diets.'
	}
	// console.log(description)
	return description
}

var pizza = new FoodItem ('Pizza', 400, true, true, true)
var burger = new FoodItem ('Burger', 500, false, false, true)
var tacos = new FoodItem ('Tacos', 400, true, false, false)

foodItemArray.forEach(function(item) {
	item.stringify()
})


var Drink = function (name, description, price, ingredients) {
	this.name = name
	this.description = description
	this.price = price
	this.ingredients = ingredients
}

Drink.prototype.stringify = function () {
	var drinkDescription = '> ' + this.name + '\n Description: ' + this.description + '\n Price: $'+ this.price +  '\n Ingredients: '+ this.ingredients.join(', ')
	
	return drinkDescription
}

var Plate = function (name, description, price, ingredients) {
	this.name = name
	this.description = description
	this.price = price
	this.ingredients = ingredients

	// console.log('Plate:', this.name, '\n', 'Ingredients:', this.ingredients)
	this.isVegan = function () {
		var verification = 0
		this.ingredients.forEach(function(ingredient){ //the ingredient is a foodItem instance
			// console.log(ingredient.name, ingredient.vegan)
			if (!ingredient.vegan) {
				verification++
			}
		})
		// console.log(verification)
		if (verification) return false
			else return true
	}

	this.isGlutenFree = function () {
		var verification = 0
		this.ingredients.forEach(function(ingredient){ //the ingredient is a foodItem instance
			// console.log(ingredient.name, ingredient.vegan)
			if (!ingredient.glutenFree) {
				verification++
			}
		})
		// console.log(verification)
		if (verification) return false
			else return true
	}

	this.isCitrusFree = function () {
		var verification = 0
		this.ingredients.forEach(function(ingredient){ //the ingredient is a foodItem instance
			// console.log(ingredient.name, ingredient.vegan)
			if (!ingredient.citrusFree) {
				verification++
			}
		})
		// console.log(verification)
		if (verification) return false
			else return true
	}



}

Plate.prototype.stringify = function () {
	var ingredientDescription = ''
	
	//console.log('ingredients:', this.ingredients)

	this.ingredients.forEach(function(ingredient) {
		//console.log('ingredient individual stringify', ingredient.stringify())
		ingredientDescription += '\n >>>>' + ingredient.stringify()
		//console.log('ingredient Description:', ingredientDescription)
	})


	var plateDescription = '> ' + this.name + '\n Description: ' + this.description + '\n Price: $'+ this.price +  '\n Ingredients: '+ ingredientDescription
	return plateDescription
}



var Order = function (plates, drinks) {
	this.PLATES = plates
	this.DRINKS = drinks
}


Order.prototype.stringify = function () {
	var OrderDescription = 'This order consists of the following plates: \n'

	this.plates.forEach (function (plateItem) {
		OrderDescription += plateItem.stringify() + '\n'
	})
	
	OrderDescription += 'and includes the following Drinks: \n'
	this.drinks.forEach (function (drinkItem) {
		OrderDescription += drinkItem.stringify() + '\n'
	})


	return orderDescription
}

var Menu = function (plates, drinks) {
	this.PLATES = plates
	this.DRINKS = drinks
}

Menu.prototype.stringify = function () {
	var menuDescription = '\n This menu consists of the following plates: \n'

	this.plates.forEach (function (plateItem) {
		menuDescription += plateItem.stringify() + '\n'
	})
	
	menuDescription += '\n And includes the following Drinks: \n'
	this.drinks.forEach (function (drinkItem) {
		menuDescription += drinkItem.stringify() + '\n'
	})


	return menuDescription
}


var Restaurant = function (name, description, menu) {
	this.name = name
	this.description = description
	this.menu = menu
}

Restaurant.prototype.stringify = function () {
	return this.name + '\n' + this.menu.stringify()
}

var Cuatomer = function (dietaryPreference) {
	this.dietaryPreference = dietaryPreference
}


/////// Instantiating Items
//Ingredients -> foodItems
$scope.avocado = new FoodItem ('Avocados', 60, true, true, true)
$scope.garlic = new FoodItem ('Garlic', 10, true, true, true)
$scope.onions = new FoodItem ('Onions', 5, true, true, true)
$scope.lemons = new FoodItem ('Lemons', 5, true, true, false)
$scope.rice = new FoodItem ('Rice', 15, true, true, true)
$scope.beans = new FoodItem ('Beans', 10, true, true, true)
$scope.steak = new FoodItem ('Steak', 120, false, true, true)
$scope.salsa = new FoodItem ('Salsa', 15, true, true, true)
$scope.lime = new FoodItem ('Lime', 5, true, true, false)
//Drinks
$scope.margarita = new Drink ('Margarita', 'A Cup of Love', 10, ['Tequila', 'Cointreau', 'Lime', 'Salt'])
//Plates
$scope.burrito = new Plate ('Burrito', 'All roled up', 6, [$scope.rice, $scope.beans, $scope.steak, $scope.salsa])
$scope.guacamole = new Plate ('Guacamole', 'Green goodness', 4, [$scope.avocado, $scope.garlic, $scope.onions, $scope.lemons])
//Menu
$scope.myMenu = new Menu ([$scope.burrito, $scope.guacamole], [$scope.margarita])
//Restaurants
$scope.threeItemRestaurant = new Restaurant ('3 Item Restaurant', 'The best restaurant ever', $scope.myMenu)

$scope.myOrder = new Order([],[])

$scope.addToOrder = function(myMenuIndex, menuItem, myElementIndex, element) {
	if (myMenuIndex === 'PLATES')
		$scope.myOrder.PLATES.push(element)
	else if (myMenuIndex === 'DRINKS')
		$scope.myOrder.DRINKS.push(element)
}

$scope.removeFromOrder = function(myMenuIndex, menuItem, myElementIndex, element) {
	if (myMenuIndex === 'PLATES')
		$scope.myOrder.PLATES.splice(myElementIndex,1)
	else if (myMenuIndex === 'DRINKS')
		$scope.myOrder.DRINKS.splice(myElementIndex,1)
}





// $timeout(function(){
// 	document.getElementById(‘elementId').focus()
// },0)

}

//Registering the controller: mainController
angular.module('myApp').controller('mainController',['$scope','$timeout', mainControllerFunc])








