"use strict";

;(function() {
    const btnInvest = document.querySelector('.invest-btn'),
          investTip = document.querySelector('.invest-btn-tip'),
          body = document.querySelector('.body');

    btnInvest.addEventListener('click', function(e){
        e.preventDefault();
        investTip.classList.toggle('visible');
    });

    window.addEventListener('scroll', handleAddClassFixedHeader);
    window.addEventListener('scroll', handleAnimatePlan);
    window.addEventListener('scroll', handleRemoveClassTipInvest);

    body.addEventListener('click', function(e) {
        if (e.target !== btnInvest && e.target !== investTip && investTip.classList.contains('visible')) {
            investTip.classList.remove('visible');
        }
    });

    function handleAddClassFixedHeader() {
        var pageY = window.pageYOffset || document.documentElement.scrollTop;
        var headerTop = document.querySelector('.header-top');

        ( pageY >= 150 )
                ? headerTop.classList.add('header-top_fixed')
                : headerTop.classList.remove('header-top_fixed');
    };


    function handleAnimatePlan() {
        const planItem = document.querySelectorAll('.plan-item'),
              windowYOffset = window.pageYOffset,
              planItemLength = planItem.length,
              planItemHeight = 400;

        let i;
        let pointScroll;


        for ( i = 0; i < planItemLength; i++ ) {

            pointScroll = planItem[i].getBoundingClientRect().top + windowYOffset - planItem[i].offsetHeight;

            switch ( +planItem[i].dataset.index ) {
                case 0:
                    // pointScroll = planItem[i].getBoundingClientRect().top + windowYOffset - planItem[i].offsetHeight;
                    break;
                case 1:
                    pointScroll = pointScroll + 100;
                    break;
                case 2:
                    pointScroll = pointScroll - 100;
                    break;
                case 3:
                    // pointScroll = pointScroll - 100;
                    break;
                case 4:
                    pointScroll = pointScroll + 100;
                    break;
                case 5:
                    pointScroll = pointScroll - 100;
                    break;
                default:
                    break;
            }

            if (planItem[i].classList.contains('active') && windowYOffset < pointScroll) {
                planItem[i].classList.remove('active');
            }

            else if (windowYOffset > pointScroll) {
                planItem[i].classList.add('active');
            }
        }
    };

    function handleRemoveClassTipInvest() {
        var pageY = window.pageYOffset || document.documentElement.scrollTop;
        var investTipTop = investTip.getBoundingClientRect().top;

        if ( pageY > investTipTop || pageY < investTipTop && investTip.classList.contains('visible') ) {
            investTip.classList.remove('visible');
        }
    };
})();



// Timer

// function startTimer() {
//     // Ячейки циферблата
//     const daysCell = document.querySelector('.number.days'),
//           hourCell = document.querySelector('.number.hour'),
//           minutesCell = document.querySelector('.number.minutes'),
//           secondsCell = document.querySelector('.number.seconds');

//     const dateFuture = new Date("Sept 14, 2017 00:00:00").getTime();

//     const x = setInterval(function() {

//         const dateNow = new Date().getTime();

//         const distance = dateFuture - dateNow;
//         const days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
//         const hours = ('0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
//         const minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
//         const seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

//         daysCell.innerHTML = days;
//         hourCell.innerHTML = hours;
//         minutesCell.innerHTML = minutes;
//         secondsCell.innerHTML = seconds;

//         if (distance < 0) {
//             clearInterval(x);
//         }

//     }, 1000);
// }

// window.onload = startTimer;



// Popup

;(function() {
    const popupButton = document.querySelectorAll('.open-popup'),
          body = document.querySelector('.body'),
          popupButtonClose = document.querySelectorAll('.popup-close'),
          headerTop = document.querySelector('.header-top');

    const overlay = document.querySelectorAll('.popup-index-js');

    function handleOpenPopup(e) {
        const pageY = window.pageYOffset || document.documentElement.scrollTop;
        let index = e.target.dataset.index;
        e.preventDefault();

        overlay[index].classList.add('visible');
        overlay[index].firstElementChild.classList.add('visible');

        if ( overlay[index].firstElementChild.classList.contains('popup-video') ) {
            const parent = overlay[index].firstElementChild,
                  video = parent.lastElementChild,
                  value = parent.firstElementChild.nextElementSibling.value;

            video.setAttribute('src', value);
        }

        body.classList.add('no-scroll');

        // Сompensation scroll
        body.style.marginRight = measureWidthScroll() + 'px';
        headerTop.style.right = pageY > 150 ? measureWidthScroll() + 'px' : '0px';
    };

    function handleClosePopup(e) {
        const el = e.target;

        if (el.classList.contains('visible') && 
            el.classList.contains('popup-overlay')) {

            el.classList.remove('visible');
            el.firstElementChild.classList.remove('visible');

            if ( el.firstElementChild.classList.contains('popup-video') ) {
                const parent = el.firstElementChild,
                      video = parent.lastElementChild,
                      value = parent.firstElementChild.nextElementSibling.value;

                video.removeAttribute('src', value);
            }

            body.classList.remove('no-scroll');

            // Сompensation scroll
            body.style.marginRight = '';
            headerTop.style.right = '0px';
        }

        else {
            return false;
        }
    };

    function handleClosePopupOnBtn(e) {
        const parent = e.target.parentElement;

        if (parent.classList.contains('popup') && 
            parent.classList.contains('visible')) {

            parent.classList.remove('visible');
            parent.parentElement.classList.remove('visible');

            if ( parent.classList.contains('popup-video') ) {
                const video = parent.lastElementChild,
                      value = parent.firstElementChild.nextElementSibling.value;

                video.removeAttribute('src', value);
            }

            body.classList.remove('no-scroll');

            // Сompensation scroll
            body.style.marginRight = '';
            headerTop.style.right = '0px';
        }

        else {
            return false;
        }
    }

    popupButton.forEach(function(el, i) {
        el.addEventListener('click', handleOpenPopup);
    })

    overlay.forEach(function(el, i) {
        el.addEventListener('click', handleClosePopup);
    })

    popupButtonClose.forEach(function(el, i) {
        el.addEventListener('click', handleClosePopupOnBtn);
    })

})();



// Ширина полосы прокрутки
window.measureWidthScroll = function () {
    var scrollWidth, div;

    div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollWidth;
}



// Lang popup
;(function() {
    const langToggle = document.querySelector('.lang-toggle'),
          langList = document.querySelector('.lang-list'),
          body = document.querySelector('.body'),
          google = document.querySelector('#google_translate_element');

    langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('open');

        langList.classList.toggle('visible');
    })

    body.addEventListener('click', function(e) {
        const parent = e.target.parentElement;

        if (e.target !== langToggle && langToggle.classList.contains('open')
            && langList.classList.contains('visible')
            && parent.parentElement !== google) {

            langToggle.classList.remove('open');
            langList.classList.remove('visible');
        }
    })
})();



// Lang item
;(function() {
    const langItem = document.querySelectorAll('.lang-item-path');

    function createCookie(name, value, days, domain) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }

        document.cookie = name + "=" + value + expires + "; domain=" + domain + "; path=/";
    }

    function eraseCookie(name, domain) {
        createCookie(name, "", -1, domain);
    }

    function handleClick(e) {
        e.preventDefault();
        const cookieArr = document.cookie.split(';');

        for (let i = 0; i < cookieArr.length; i++) {
            let key = cookieArr[i].split('=')[0].trim();

            if ( key === 'googtrans' ) {
                eraseCookie(key, '.baner.su');
                eraseCookie(key, '');
            }
        }

        window.location.href = e.target.firstElementChild.getAttribute('href');
    };

    langItem.forEach(function(el, i) {
        el.addEventListener('click', handleClick);
    })
})();



//Subscription
;(function() {

    const subForm = document.querySelector('.form-sub'),
          subInput = document.querySelector('.input-sub'),
          subWrap = document.querySelector('.sub-form-wrapper'),
          selectedLang = document.querySelector('.lang-toggle');

    subForm.addEventListener('submit', function(e) {

        e.preventDefault();

        if (subInput.value.trim() !== '') {

            var xhr = new XMLHttpRequest();
            var stringSend = subInput.getAttribute('name') + '=' + subInput.value.trim();
            var strSuccess = '';

            xhr.open('POST', location.origin + '/mail.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {

                if ( xhr.status === 200 ) {
                    console.log(this.responseText);
                    subInput.value = '';

                    switch (selectedLang.textContent) {
                        case 'Rus': 
                            strSuccess = '<div class="sub-success"> Спасибо за подписку! </div>';
                            break;
                        case 'Chn': 
                            strSuccess = '<div class="sub-success"> 謝謝訂閱！ </div>';
                            break;
                        default:
                            strSuccess = '<div class="sub-success">' + this.responseText + '</div>';
                    }

                    subWrap.innerHTML = strSuccess;

                } else {
                    console.log(this.responseText);
                }
            };

            xhr.send(stringSend);
        }

        else {
            console.log('empty string');
        }
    })

})();



// Total balance

// (function() {

//     var investedBTC = document.querySelector('.invested-btc');
//     var investedUSD = document.querySelector('.invested-usd');

//     var xhr = new XMLHttpRequest();

//     xhr.open('GET', 'https://ico-panel.baner.su/invest/total');

//     xhr.onload = function() {
//         var response = JSON.parse(xhr.responseText);
//         investedBTC.innerHTML = response.invested_btc.toFixed(5);
//         investedUSD.innerHTML = response.invested_usd.toFixed(5);
//     }

//     xhr.onerror = function() {
//       console.log( 'Ошибка ' + this.status );
//     }

//     xhr.send()

// })();
