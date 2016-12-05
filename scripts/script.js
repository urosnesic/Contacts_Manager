var contacts = angular.module('contacts', ['ngRoute']);

contacts.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'controlLogin'
		})
		.when('/listContacts', {
			templateUrl: 'views/listContacts.html',
			controller: 'controlList'
		})
		.when('/getContact', {
			templateUrl: 'views/getContact.html',
			controller: 'controlGetContact'
		})
		.when('/addNewContact', {
			templateUrl: 'views/addNewContact.html',
			controller: 'controlAdd'
		})
		.when('/editContact', {
			templateUrl: 'views/editContact.html',
			controller: 'controlEdit'
		})
		.when('/deleteContact', {
			templateUrl: 'views/deleteContact.html',
			controller: 'controlDelete'
		})
		.when('/logout', {
			templateUrl: 'views/login.html',
			controller: 'controlLogout'
		})
		.otherwise({
			redirectTo: '/login'
		});

}]);



contacts.controller('controlLogin', ['$scope', '$http', function($scope, $http) {

	$scope.formSubmit = function() {

		$http({
			method: "POST",
			url: "http://developer.digitalcube.rs:8999/user/login?username=" + $scope.user.name + "&password=" + $scope.user.pass
		}).then(function success(response) {
			$scope.token = response.data;
			localStorage.setItem('token', $scope.token.token);
			$scope.successedLogin = 'You successfully loged in';
		});	

	}

}]);


contacts.controller('controlAdd', ['$scope', '$http', function($scope, $http) {

	$scope.contactSubmit = function() {

		$scope.contact.firstName;
		$scope.contact.lastName;
		$scope.contact.phone;
		$scope.contact.email;
		$scope.contact.city;
		$scope.contact.country;

		$http({
			method: "PUT",
			url: "http://developer.digitalcube.rs:8999/api/contacts?first_name=" 
				+ $scope.contact.firstName + "&csv_phones=" 
				+ $scope.contact.phone + "&csv_emails=" 
				+ $scope.contact.email + "&last_name=" 
				+ $scope.contact.lastName + "&city=" 
				+ $scope.contact.city + "&country=" 
				+ $scope.contact.country,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function newContact(response) {
			$scope.newcon = response.data;
			$scope.addsuccess = "You successfully added new contact";
		});

	};

}]);


contacts.controller('controlList', ['$scope', '$http', function($scope, $http) {

	$http({
		method: "GET",
		url: "http://developer.digitalcube.rs:8999/api/contacts",
		headers: {
			'Authorization': localStorage.getItem('token')
		}
	}).then(function myList(response) {
		$scope.contactList = response.data.contacts;
	}, function myError(response) {
		$scope.contactList = response.statusText;
	});

	$scope.show = true;
	$scope.showId = function() {
		if ($scope.show == true) {
			$scope.show = false;
		}
	};
	
}]);


contacts.controller('controlGetContact', ['$scope', '$http', function($scope, $http) {

	$scope.getSubmit = function() {

		$scope.contact.id;
		$scope.prikaz = true;

		$http({
			method: "GET",
			url: "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" + $scope.contact.id,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function myContact(response) {
			$scope.informations = response.data.contact;
		})

	}

}]);


contacts.controller('controlEdit', ['$scope', '$http', function($scope, $http) {

	$http({
			method: "GET",
			url: "http://developer.digitalcube.rs:8999/api/countries",
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function myContact(response) {
			$scope.countries = response.data.countries;
		})

	
	$scope.pickCountry = function() {
		$scope.contact.id;
		$scope.contact.country;

		$http({
			method: "PATCH",
			url: "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" 
				  + $scope.contact.id + "?country=" + $scope.contact.country,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function editing(response) {
			$scope.editsuccess = "Edit was successful";
		})
	};	

	$scope.formEdit = function() {

		$scope.contact.id;
		$scope.contact.value;
		$scope.contact.newValue;

		$http({
			method: "PATCH",
			url: "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" 
				  + $scope.contact.id + "?" + $scope.contact.value + "=" + $scope.contact.newValue,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function editing(response) {
			$scope.editsuccess = "Edit was successful";
		})

	};
		

}]);


contacts.controller('controlDelete', ['$scope', '$http', function($scope, $http) {

	$scope.formDelete = function() {

		$scope.contact.id;

		$http({
			method: "DELETE",
			url: "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" + $scope.contact.id,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		}).then(function myDelete(response) {
			$scope.deleteSuccess = "You successfully deleted contact";
			console.log(response.status);
			console.log(response.statusText);
		})

	};

}]);


contacts.controller('controlLogout', ['$scope', function($scope) {

	if (localStorage.getItem('token') != null) {
		localStorage.removeItem('token');
		$scope.successedLogin = 'You successfully loged out';
	}

}]);

