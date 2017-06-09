
var pw = angular.module('tapplaner', ['ngMaterial'])
pw.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('red', {
    'default': '400'
    })
});

pw.run(['$rootScope', '$timeout',  function($rootScope, $timeout){

	$rootScope.fullscreen = false;
	$rootScope.initialized = false;


	llb_app.addListener('window_state', function(data){
		if(data.fullscreen)
		{
			$timeout(function(){
				$rootScope.fullscreen = true
			}, 400)
			$rootScope.$apply(function(){
				//$rootScope.fullscreen = true
			})
		}
		else
		{
			$rootScope.$apply(function(){
				$rootScope.fullscreen = false
			})
		}
	})

	llb_app.request('window_dimensions')

	llb_app.addListener('window_dimensions', function(data){
		$rootScope.$apply(function(){
			$rootScope.window_dimensions = data
			$rootScope.initialized = true;
		})
	})

	$rootScope.range = function(num)
	{
		return new Array(num)
	}
}])

pw.controller('MainController', ['$rootScope', '$http', function($rootScope, $http){
	var vm = this
	vm.date = new Date()
	vm.loading = true;
	vm.location = ''
	$rootScope.myCard = 0;

	vm.eventdata = {}
  vm.eventdisplayed = {}

	llb_app.addListener('location', function(result){

		if(result.status == 'failure')
		{
			vm.failed = true
			return;
		}
		$http.get('https://tapplaner.herokuapp.com/events?lat='+result.data.latitude+'&lng='+result.data.longitude+'&distance=2000&sort=popularity&accessToken=1954493638107409|zGZC5kWhiCVhPw0GBd7M-68RHAI').success(function(res){
			vm.eventdata = res.events;
      eventPicker(vm.eventdata, vm.loading);
		  vm.loading = false;
		})
	})

	llb_app.request('location')

  $rootScope.button1 = function (){
    $rootScope.myCard = $rootScope.myCard + 1;
  };

  $rootScope.button2 = function (){
    eventPicker(vm.eventdata);
  };


}])
