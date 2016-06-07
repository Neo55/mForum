angular.module('forum', ['angular-meteor', 'ui.router'])
.config(function($urlRouterProvider, $stateProvider){

    //set the default route
    $urlRouterProvider
        .when('/', '/topics')
        .otherwise('/topics');

    //Add states
    $stateProvider.state('topics', {
        url: '/topics',
        templateUrl: 'views/pages/topics.html'
    });

})
    .run(function($state){
        // we inject $state here to initialize ui.router
    })
