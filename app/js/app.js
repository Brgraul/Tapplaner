
var pw = angular.module('tapplaner', ['ngMaterial'])
pw.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('red', {
    'default': '400'
    })
});

pw.run(['$rootScope','$timeout', function($rootScope, $timeout){
  $rootScope.Utils = {
   keys : Object.keys
  }
  $rootScope.range = function(num)
  {
    return new Array(num)
  }
	$rootScope.fullscreen = false;
	$rootScope.initialized = false;


	llb_app.addListener('window_state', function(data){
		if(data.fullscreen)
		{
			$rootScope.$apply(function(){
				$rootScope.fullscreen = true
			})

		}
		else
		{
			$rootScope.$apply(function(){
				$rootScope.fullscreen = false
				$rootScope.$broadcast("changed_window_state");
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
}])


pw.controller('MainController', ['$rootScope', '$http', function($rootScope, $http){
	var vm = this

	vm.date = new Date()
  vm.date.setDate(vm.date.getDate() + 7);
  vm.date = Math.round((vm.date).getTime() / 1000);
	$rootScope.loading = true;
	vm.location = ''

	vm.eventdata = {}
  vm.eventdisplayed = {}

	llb_app.addListener('location', function(result){

		if(result.status == 'failure')
		{
			vm.failed = true
			return;
		}
		$http.get('https://tapplaner.herokuapp.com/events?lat='+result.data.latitude+'&lng='+result.data.longitude+'&distance=2000&sort=popularity&until='+vm.date+'&accessToken=1954493638107409|zGZC5kWhiCVhPw0GBd7M-68RHAI').then(
      function(response){
  			vm.eventdata = response.data.events;
  		  $rootScope.loading = false;
        eventPicker(vm.eventdata, vm.loading, $rootScope.Utils);
		  },
      function(error){
        console.log("I failed!");
      }
    )
	})

	llb_app.request('location')

  var pic = document.querySelector(".event-pic")

 // Makes sure the transition happens when card is fully loaded
  pic.addEventListener("load", function(){
    document.getElementById("load").style.display = 'none';
    if((document.getElementById("initial").style.display) == 'none'){
      document.getElementById("final").style.display = 'flex';
    }
  })
//

  $rootScope.$on('changed_window_state', function(){
    document.getElementById("initial").style.display = 'inherit';
    document.getElementById("final").style.display = 'none';
    document.getElementById("load").style.display = 'none';
  })

  $rootScope.button1 = function (){
    if($rootScope.loading == false){
      eventPicker(vm.eventdata, vm.loading, $rootScope.Utils);
      document.getElementById("initial").style.display = 'none';
      document.getElementById("final").style.display = 'flex';
    }
    else{
      document.getElementById("initial").style.display = 'none';
      document.getElementById("load").style.display = 'block';
    }
  };

  $rootScope.button2 = function (){
    showTouch();
    eventPicker(vm.eventdata, vm.loading, $rootScope.Utils);
  };


}])
