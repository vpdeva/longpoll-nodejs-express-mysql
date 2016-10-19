var app = angular.module('sample',[]);
app.controller('sample', function ($scope,$http,$timeout) {	
    
    var TypeTimer;                
    var TypingInterval = 1000;

    $scope.keyup = function() {
        $timeout.cancel(TypeTimer);
        TypeTimer=$timeout( function(){ get_data(); }, TypingInterval);
    };

    $scope.keydown = function(){
        $timeout.cancel(TypeTimer);
    };

    function get_data(){
        console.log($scope.name);
        var name=$scope.name;
        $http.post('/get_data',{name:name}).success(function(data, status, headers, config) {
           $scope.data_server=data;
        }).error(function(data, status) {
            alert("Connection Error");
        });
    }
    
});