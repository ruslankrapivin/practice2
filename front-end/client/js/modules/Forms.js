import IMask from 'imask';
import axios from 'axios';

export default class Forms {
    constructor(selector) {
        this.forms = document.querySelectorAll(selector);
    }

    setPhoneMasks(forms) {
        forms.forEach((form) => {
            let phoneInputs = form.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach((phoneInput) => {
                let maskOptions = {
                    mask: '+{38Y}(00)000-00-00',
                    blocks: {
                        Y: {
                            mask: IMask.MaskedRange,
                            from: 0,
                            to: 0
                        }
                    }
                };
                new IMask(phoneInput, maskOptions);
            });
        })
    }

    handleSubmit(forms) {

        forms.forEach((form) => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                let formData = new FormData(form);

                if (window.mode === 'dev') {
                    for (let pair of formData.entries()) {
                        console.log(pair[0] + ': ' + pair[1]);
                    }
                }

                let url = form.getAttribute('action') || window.location.href;

                axios.post(url, formData)
                    .then(function (response) {
                        App.modules.popups.success();
                    })
                    .catch(function (error) {
                        App.modules.popups.error();
                    });
            });
        })

    }

    inputsClasses() {
        document.querySelectorAll('.form-control').forEach((input) => {
            input.addEventListener('change', function () {
                if (input.value.length > 0) {
                    input.classList.add('validate');
                    return;
                }
                input.classList.remove('validate');
            });
        });
    }

    init() {
        this.inputsClasses();
        this.setPhoneMasks(this.forms);
        this.handleSubmit(this.forms);
    }
}
