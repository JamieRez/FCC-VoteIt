$(document).ready(function(){
    var choiceNum = 2;
    
    $('#addOpt').click(function(){
        choiceNum++;
        
        $('#origChoice').clone().appendTo('#newChoicePos').css('display', 'block').attr('name' , "choice");
    });
    
    
    
});