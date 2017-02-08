var apps = angular.module('show.controller', [])
apps.filter('trustHTML',function($sce){
	return function(text){
	return $sce.trustAsHtml(text);
	}
});
	apps.controller('ShowController', function ($scope,character) {
    $scope.showdata = character;
});