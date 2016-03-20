var signClicked = false;

$(document).ready(function(){
    $('a[name=signup]').click(function(){
        if(!signClicked){
            signClicked = true;
            $('.signup-box').css('display' , 'block');
            $( ".signup-box" ).animate({
                    marginTop : "-5vmax"
                }, 500, function() {
                // Animation complete.
            });
        }
    });
});