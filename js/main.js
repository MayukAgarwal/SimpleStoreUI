
(function ($) {
    "use strict";

    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var phone = $('.validate-input input[name="phone"]');
    var message = $('.validate-input textarea[name="message"]');

    $('.contact1-form-btn').on('click',function(e){
        e.preventDefault();
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(phone).val().trim().match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/) == null){
            showValidate(phone);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        if(check){
            $.ajax({
                url: '/sendEmail',
                type: 'POST',
                data: $(".validate-form").serialize(),
                crossOrigin: true,
                async: true
            }).then((data) => {
                if(typeof data !== "object"){
                data = JSON.parse(data);
                }
            }).fail((data) => {
                $(".toast-msg").html("Form submitted successfully")
                $(".toast-msg").stop().fadeIn(400).delay(3000).fadeOut(400);
                $('.validate-form')[0].reset();
            });
           
        }
        else{
            return check
        }
        
    });

    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).find(".invalid-text").removeClass('none');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).find(".invalid-text").addClass('none');
    }

})(jQuery);