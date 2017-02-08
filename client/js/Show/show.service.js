angular.module('show.service', [])
	.factory('ShowService', function ($resource) {
		return $resource('http://api.tvmaze.com/shows/:id?embed=cast');
	});