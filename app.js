/*this javascript file is to create module of angular app and controller and for routing*/ 
var myApp= angular.module('myApp',
['ngRoute']);
/* In config stage routing of angular app using $routeprovider as dependency injection*/
myApp.config(['$routeProvider',
function($routeProvider) {
$routeProvider
  .when('/userPosts', { templateUrl: 'templates/userPosts.html',
							controller: 'userPostDataController' })
	     		.otherwise({ redirectTo: '/userPosts' });
}]);
/* Creating controller to load post data author info and post comments*/
myApp.controller('userPostDataController' ,    function($scope,$http) {
		$scope.newInfoData=[]; /*new array used to add data from userposts, authorinfo,and postscomments*/
		$scope.postData = []; /*the array used to add postdata after http call. */
		$scope.authData =[]; /*the array used to add author info after http call. */
function init() {
	loadPostData();
}
/*This method calls http get request to load all user posts,
		 to load author info, and to load posts comments*/
function loadPostData() {
  $http.get("https://jsonplaceholder.typicode.com/posts")
		.then(function (response) {
				angular.forEach(response.data,function(temp){
				$scope.postData.push(temp);
			});
		});
	$http.get("https://jsonplaceholder.typicode.com/users")
	.then(function (resp) {
		$scope.authData = resp.data;
			});
	$http.get("https://jsonplaceholder.typicode.com/comments")
	.then(function (resp) {
			angular.forEach(resp.data,function(comments){
				angular.forEach($scope.authData,function(auth){
			angular.forEach($scope.postData,function(item){
				if(item.id == comments.postId && item.userId == auth.id){
						$scope.newInfoData.push({'email':comments.email,'commentbody':comments.body,'id':item.userId,'title':item.title,'body':item.body,'name':auth.name,'username':auth.username});
										}
			});	
		});
	});		
});
	}
init();

});




