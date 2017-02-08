angular.module('app', 
	['ngRoute', 'ngResource', 'search.controller', 'search.service', 'show.controller', 'show.service'])
	.config(['$routeProvider', '$locationProvider', 
		function ($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: 'views/search.html',
					controller: 'SearchController'
				})
				.when('/shows/:id', {
					templateUrl: 'views/show.html',
					controller: 'ShowController',
					resolve: {
		            character: function($route, ShowService){
		              return ShowService.get({id: $route.current.params.id });
		            }
		          }
				})
				.otherwise({
					redirectTo: '/'
				});

			$locationProvider.html5Mode(true);
	}]);