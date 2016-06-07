Meteor.publish('topics', function(){
    return Topics.find();
});

Meteor.publish('topic', function(id){
    check(id, String);
    return Topics.find({_id: id});
});