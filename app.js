angular.module('wordGuess', [])
	
.controller('wordGuessCtrl', function($scope, wordFactory) {
	
	var i = Math.floor(Math.random()*5);
	var arr = [];
	var ans = [];
	var temp = 0;
	//var count = 0;
	$scope.category = '';
	$scope.words = {};
	$scope.word = '';
	$scope.hint = '____';
	$scope.lives = 10;
	$('p#answer').text('__ __ __ __');
	
	setTimeout(function() {
		wordFactory.getWords().success(function(data) {
			$scope.words = data.words;
			$scope.category = data.words[i]['category'];
			$scope.word = data.words[i]['word'];
			arr = $scope.word.split('');
		}, function(err) {});
	});
	
	$scope.Hint = function() {
		$scope.hint = $scope.words[i]['hint'];
	}
	
	$scope.again = function() {
		i = Math.floor(Math.random()*5);
		arr = [];
		ans = [];
		temp = 0;
		$scope.words = {};
		$scope.word = '';
		$scope.hint = '____';
		$('p#answer').text('__ __ __ __');
		$scope.lives = 10;
		setTimeout(function() {
			wordFactory.getWords().success(function(data) {
				$scope.words = data.words;
				$scope.category = data.words[i]['category'];
				$scope.word = data.words[i]['word'];
				arr = $scope.word.split('');
			}, function(err) {});
		});
	}
	
	$('button').on('click', function() {
		
		var len = arr.length;
		var guess = $(this).text();
		var flag = false;
		var win = 0;
		
		if(temp == 0) {
			for(var i=0; i<arr.length; i++) {
				ans.push('__ ');
			}
			temp = 1;
		}
		
		for(var i=0; i<len; i++) {
			if(guess == arr[i]) {
				//count++;
				ans.splice(i, 1, guess);
				flag = true;
				/*if(count == len) {
					alert('You Win!!!');
					$scope.again();
					count = 0;
				}*/
			}
		}
		
		if(flag) {
			flag = false;
		} else {
			$scope.lives = $scope.lives - 1;
			if($scope.lives == 0) {
				alert('Game Over!');
				$scope.again();
			} else {
				alert('Loss one live!');
			}
		}
		
		for(var i=0; i<len; i++) {
			if(ans[i] == arr[i]) {
				win++;
			}
		}
		
		if(win == len) {
			win = 0;
			alert('You Win!!!');
			$scope.again();
		} else {
			win = 0;
		}
		
		$scope.$apply();
		$('p#answer').empty();
		for(var i=0, len=ans.length; i<len; i++) {
			$('p#answer').append(ans[i]);	
		}
	});
})

.factory('wordFactory', function($http) {
	return {
		getWords: function() {
			return $http.get('json/words.json');
		}
	}
});











