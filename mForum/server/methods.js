Meteor.methods({
    createThread: function(topicId, content){
        check(topicId, String);
        check(content, String);
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error("You are not logged in!");
        }
        if (!content){
            throw new Meteor.Error("Content is required!");
        }
        var thread = {
            author: user.emails[0].address,
            createdAt: new Date(),
            topicId: topicId,
            content: content
        };
        return Threads.insert(thread);
    }
});
