var signClicked = false;

$(document).ready(function(){
    $('a[name=signup]').click(function(){
        if(!signClicked){
            signClicked = true;
            $('.signup-box').css('display' , 'block');
            $( ".signup-box" ).animate({
                    top : "-15vh"
                }, 500, function() {
                // Animation complete.
            });
        }
    });
});