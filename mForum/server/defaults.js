if (Topics.find().count() === 0) {
    _.each(['General Discussion', 'Tutorials', 'Help'], function(topicName){
        Topics.insert({name: topicName});
    });
}
