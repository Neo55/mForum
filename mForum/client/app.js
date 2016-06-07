angular.module('forum', ['angular-meteor', 'ui.router'])

.config(function($urlRouterProvider, $stateProvider){

    //set the default route
    $urlRouterProvider
        .when('/', '/topics')
        .otherwise('/topics');

    //Add states
    $stateProvider.state('topics', {
        url: '/topics',
        templateUrl: 'views/pages/topics.html',
        controller: 'TopicsController'
    });

        $stateProvider.state('topic', {
            url: '/topic/:topicId',
            templateUrl: 'views/pages/topic.html',
            controller: 'TopicController'
        });

})
    .run(function($state){
        // we inject $state here to initialize ui.router
    })

.controller('TopicsController', function($scope){
        $scope.subscribe('topics');
        $scope.helpers({
            topics: function(){
                return Topics.find({}, {sort: {name:1}});
            }
        });
    })

.controller('TopiController', function($scope, $stateParams){
        $scope.subscribe('topic', function(){ return [$stateParams.topicId]; });
        $scope.helpers({
            topic: function(){
                return Topics.findOne({_id: $stateParams.topicId});
            }
        });
    })