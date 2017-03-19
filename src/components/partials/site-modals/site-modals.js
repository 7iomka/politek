// validation library
import 'jquery-validation';
// custom validator settings
import 'vendors/jquery.validator-custom';

domready(function () {
  exports.init = function () {
    /********************************** SETTINGS FOR ALL FORMS in MODAL *************************************/
    var $actionModal = $('.action-modal');

    $actionModal.each(function() {
        var $this = $(this),
            $form = $(this).find('.form'),
            $action_id = $this.attr('id');
        // предотвращаем отправку формы
        $form.submit(function(e) {
            e.preventDefault();
        });

        var rules = {},
            messages = {};

        var namespaces = ["user_name", "user_phone", "user_email", "user_password"];

        $.each(namespaces, function(i, namespace) {
            var $form_elements = $form.find('input[name^="' + namespace + '"], textarea[name^="' + namespace + '"]');

            $form_elements.each(function() {
                var elem_name = $(this).attr('name');
                var message;

                switch (namespace) {
                    case "user_name":
                        message = "Заполните Ваше имя";
                        break;
                    case "user_phone":
                        message = "Укажите телефон";
                        break;
                    case "user_email":
                        message = "Укажите корректный email";
                        break;
                    case "user_password":
                        message = "Укажите пароль";
                        break;
                    default:
                        message = "Заполните данное поле";
                        break;
                }

                rules[elem_name] = {
                    required: true
                };
                // if (namespace === 'user_phone') {
                //     // $('input[name^="' + value + '"]').mask("+7 (999) 999 99 99");
                //     rules[elem_name].usPhoneFormat = true;
                // }
                if (namespace === 'user_email') {
                    rules[elem_name].email = true;
                }
                messages[elem_name] = {
                    required: message
                }

            });

        })
        // console.log(rules, messages);
        $form.validate({
            rules: rules,
            messages: messages,
            highlight: function (element) {
               $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
               $(element).removeClass('form-control-success').addClass('form-control-danger');
             },
             unhighlight: function (element) {
                 $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
                 $(element).removeClass('form-control-danger').addClass('form-control-success');

             },
           errorClass: 'form-control-feedback',
           errorPlacement: function (error, element) {
               if (element.parent('.input-group').length) {
                   error.insertAfter(element.parent());
               } else {
                   error.insertAfter(element);
               }
           },
            submitHandler: function(form) {
                submitModalForm(form, $action_id);
            }
        });

    });
    function submitModalForm(form, task) {
        // форма
        var $form = $(form);

        // в какой модалке находится
        var $formModal = $form.closest('.action-modal');

        // прочие элементы модалки
        var $modalTitle     = $formModal.find('.action-modal__title');
        var $modalAnnonce   = $formModal.find('.action-modal__annonce');

        var $successContainer = $formModal.find('.success-container');



        /*  prepare serialized array for the addition of a form type identifier  */
        var form_data = $(form).serializeArray();
        // for php data
        form_data.push({name: "task", value: task});
        form_data = $.param(form_data);

        var modalVariables = {
          $form,
          $formModal,
          $modalTitle,
          $modalAnnonce,
          $successContainer
        };

        switch (task) {
          case 'login':
            loginActions(form_data, modalVariables);
            break;
          case 'register':
            registerActions(form_data, modalVariables);
            break;
          case 'call-back':
            callBackActions(form_data, modalVariables);
        }




    };


  }
});
