var apps = angular.module('search.controller', ['ngAnimate', 'ui.bootstrap','firebase'])
apps.filter('trustHTML',function($sce){
	return function(text){
	return $sce.trustAsHtml(text);
	}
});
	apps.controller('SearchController', function ($scope,searchResource,$firebaseArray) {
		var cookiesvalue=getCookie("rakeshsavani");
        if (cookiesvalue == "") {
           var randomNumber=Math.random().toString();
           randomNumber=randomNumber.substring(2,randomNumber.length);
           setCookie("rakeshsavani", randomNumber, 30);
           cookiesvalue=getCookie("rakeshsavani");
        }
        function getCookie(cookname) {
            var name = cookname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        function setCookie(cookname,cookvalue,totdays) {
            var d = new Date();
            d.setTime(d.getTime() + (totdays*24*60*60*1000));
            var expiredate = "expires=" + d.toGMTString();
            document.cookie = cookname+"="+cookvalue+"; "+expiredate;
        }
        $scope.getJsonArrays = [];
        var link = 'https://torrid-heat-6468.firebaseio.com/BrowserHistory';
        var datafromfirebase = new Firebase(link).orderByChild('cookiesvalues').equalTo(cookiesvalue);
        $scope.getJsonArrays = $firebaseArray(datafromfirebase);

        $scope.getSearch = function () {
            if($scope.name != ""){
                var hasName = false;
                for(var getJsonArray in $scope.getJsonArrays){
                    if($scope.getJsonArrays[getJsonArray].description === $scope.name){
                        hasName = true;
                    }
                }
                if(hasName == false){
                    $scope.getJsonArrays.$add({cookiesvalues:cookiesvalue , description:$scope.name});
                }
            }
			searchResource.get({
				q: $scope.name
			}, function (response) {
				var result = JSON.parse(response.text);
				$scope.SearchDatas = result;
				$scope.errormsg = "";
				if($scope.SearchDatas == ""){
					$scope.errormsg = "Data is not available";
				}
			});
            $scope.name = "";
		};
});

	apps.directive('searchdirective', function () {
    return {
        restrict: 'E',  
        scope:false,
        template: function(elem, attr,$scope){
        	return "<div class='row'>" +
        		    "<div class='col-xs-12' ng-repeat='SearchData in SearchDatas'>" +
        		     "<div class='panel-primary panel'>" +
        		      "<div class='row'>" +
        		       "<div class='col-md-3'>" +
        		        "<img ng-src='{{SearchData.show.image.medium}}' alt='Description' />" +
        		       "</div>" +
        		       "<div class='col-md-8'>" +
        		        "<h2>{{SearchData.show.name}}</h2>" +
        		        "<p ng-bind-html = 'SearchData.show.summary | trustHTML'></p>" +
                        "<div class='form-group'><div>" +
                        "<a href='/shows/{{SearchData.show.id}}'><button type='button' class='btn btn-primary'>Details</button></a>" +
                        "</div></div>" +
        		       "</div>" +
        		      "</div>" +
        		     "</div>" +
        		    "</div>" +
        		   "</div>" +
        		   "<h3>{{errormsg}}</h3>";
      	},
    }
});