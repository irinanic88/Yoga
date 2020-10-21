window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Tabs

    let info = document.querySelector('.info-header'),
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2021-01-01';

    function getTimeRemaining(endtime) {
        let total = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / 1000 / 60 / 60));
        return {
            'total': total,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function formatTime(timeUnit) {
                let formattedTimeUnit;
                if (timeUnit < 10) {
                    formattedTimeUnit = '0' + timeUnit;
                } else {
                    formattedTimeUnit = timeUnit;
                };
                return formattedTimeUnit;
            };

            hours.textContent = formatTime(t.hours);
            minutes.textContent = formatTime(t.minutes);
            seconds.textContent = formatTime(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

            };
        };
    };

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        moreTabs = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    function findMore(btn) {

        btn.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add = ('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function () {
            overlay.style.display = 'none';
            more.classList.remove = ('more-splash');
            document.body.style.overflow = '';
        });

    }

    findMore(more);
    moreTabs.forEach(findMore);

    //Form


    let moreForm = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form');


    function sendFormToServer(form) {

        let message = {
            loading: "Загрузка...",
            success: "Спасибо! Скоро мы с Вами свяжемся.",
            failure: "Что-то пошло не так..."
        };

        let input = document.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(form);

            let formDataObject = {};
            formData.forEach(function (value, key) {
                formDataObject[key] = value;
            });

            let jsonFormatData = JSON.stringify(formDataObject);

            request.send(jsonFormatData);

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }

                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }

            });

        });

    }

    sendFormToServer(moreForm);
    sendFormToServer(contactForm);


});