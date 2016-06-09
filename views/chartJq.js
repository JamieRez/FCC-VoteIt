
var choiceNames =[];
var choiceVotes = [];

var colorArr = ["#FF6384","#36A2EB","#FFCE56",'#33FF5E', '#E391FF', '#F4B329', '#35DFC0', '#7F4B4B' , '#801ECE'];

myPoll.choices.forEach(function(choice){
    choiceNames.push(choice.name);
    choiceVotes.push(choice.votes);
});


var ctx = $('#myChart');
    
    var data = {
        labels: choiceNames,
        datasets: [
          {
            data: choiceVotes,
            backgroundColor: colorArr,
            hoverBackgroundColor: colorArr
         }]
        };
        
      var options = { 
        responsive: true,
        maintainAspectRatio: true,
        legend : {
            labels : {
                fontColor : '#FFFFFF'
            }
        }
    };
    
      var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: data,
      options : options,
      })