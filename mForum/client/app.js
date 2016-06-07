angular.module('forum', ['angular-meteor', 'ui.router', 'accounts.ui'])

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

    .controller('TopicContoller', function($scope, $stateParams, $meteor){
        $scope.subscribe('topic', function(){ return [$stateParams.topicId]; });
        $scope.subscribe('threads', function(){ return [$stateParams.topicId]; });
        $scope.helpers({
            topic: function() {
                return Topics.findOne({_id: $stateParams.topicId});
            },
            threads: function() {
                return Threads.find({topicId: $stateParams.topicId});
            }
        });
        $scope.createThread = function(thread){
            $meteor.call("createThread", $stateParams.topicId, thread.content).then(function(){
                thread.content = '';
            }).catch(function(){
                alert("An error occured while creating the thread!");
            });
        };
    })


//.controller('TopicController', function($scope, $stateParams, $meteor){
        //$scope.subscribe('topic', function(){ return [$stateParams.topicId]; });
        //$scope.subscribe('threads', function(){ return [$stateParams.topicId]; });
        //$scope.helpers({
            //topic: function(){
            //    return Topics.findOne({_id: $stateParams.topicId});
            //},
            //threads: function(){
            //    return Threads.find({topicId: $stateParams.topicId});
          //  }
        //});
        //$scope.createThread = function(thread){
        //    $meteor.call("createThread", $stateParams.topicId, thread.content).then(function(){
        //        thread.content = '';
        //    }).catch(function(){
        //        alert("An error occured while creating the thread")
        //    });
       // };
    //})