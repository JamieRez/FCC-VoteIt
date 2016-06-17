var mongoose = require('mongoose');
var User = require('./user.js');

var choiceSchema = mongoose.Schema({
    name : String,
    votes : {type :Number , default :0}
});

var pollSchema = mongoose.Schema({
    question : String ,
    choices : [choiceSchema],
    num : Number,
    user : String
});

var Poll = mongoose.model('Poll' , pollSchema);
var pollsArr = [];
var pollNum = 0;

var Choice = mongoose.model('Choice' , choiceSchema);



function create(Question, ChoiceNames, theUser){
    var choiceArr =[];
    ChoiceNames.forEach(function(choiceName){
        var newChoice = new Choice({name : choiceName});
        newChoice.save();
        choiceArr.push(newChoice);
    });
    var newPoll = new Poll({question : Question , choices : choiceArr , num : pollNum , user : theUser});
    pollNum++;
    newPoll.save();
    pollsArr.unshift(newPoll);
    getPolls();
}

function getPolls(){
    var pollsArrNames =[];
    pollsArr.forEach(function(poll){
        pollsArrNames.push(poll.question);
    });
    
    Poll.find({}, function(err,polls){
        if(err){console.log('err finding polls')}
        for(var i=0; i<polls.length;i++){
            if(pollsArrNames.indexOf(polls[i].question) == -1){
                pollsArr.push(polls[i]);
            }
        }
    });
    return pollsArr;
}

function getPollFromNum(thisNumber, callback){
    Poll.findOne({num : thisNumber}, function(err, poll){
        if(err){console.log('shoot')}
        callback(poll);
    });
}

function addVote(curPoll, votedChoice, newChoice, callback){
    if(votedChoice){
    Poll.findOne({num:curPoll.num} , function(err,poll){
        if(err){console.log('coultnfindit')}
        var choiceInd = poll.choices.indexOf(votedChoice);
        console.log(choiceInd);
        poll.choices[choiceInd].votes++;
        poll.save(function(err,savedPoll){
            if(err){console.log('couldntsave')}
            callback(savedPoll);
        });
    });
}
    if(newChoice){
        var myNewChoice = new Choice({name : newChoice , votes:1});
        curPoll.choices.push(myNewChoice);
        curPoll.save(function(err,savedPoll){
            if(err){console.log('couldntsavethisne')}
            callback(savedPoll);
        });
    }
}

function getUserPolls(theUser,callback){
    var userPolls =[];
    pollsArr.forEach(function(poll){
        if(poll.user == theUser){
            userPolls.push(poll);
        }
    });
    callback(userPolls);
}

function deletePoll(pollNum,callback){
    Poll.findOne({num : pollNum}, function(err,thePoll){
        if(err){console.log('errrigthere')}
        var pollInd = pollsArr.indexOf(thePoll);
        pollsArr.splice(pollInd , 1);
        thePoll.remove();
    });
    callback();
}

function deleter(){
    Poll.find({}, function(err, polls) {
        if(err){console.log('err finding polls')}
    
    polls.forEach(function(lePoll) {
        lePoll.remove();
    });
  });
  pollsArr = [];
  pollNum = 0;
}

module.exports = {create , deleter, getPolls, getPollFromNum , addVote , getUserPolls , deletePoll};