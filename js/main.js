(function () {
    'use strict';

    var flagArray = [];

    var makeFlag = {
        country: "",
        init: function(country) {
            this.country = country;
        },
        draw: function() {
            if (this.country.toLowerCase() === "france") {
                var flagFrance = '<div class="flag france"><div class="left"></div>\n' +
                                '<div class="right"></div></div>';

                flagArray.push(flagFrance);
            } else if (this.country.toLowerCase() === "sweden") {
                var flagSweden = '<div class="flag swedish"><div class="horizontal">\n' +
                                '</div><div class="vertical"></div></div>';

                flagArray.push(flagSweden);
            } else if (this.country.toLowerCase() === "turkey") {
                var flagTurkey = '<div class="flag turkey"><div class="circle1"></div>\n' +
                '<div class="circle2"></div><div class="star"><span>★</span></div></div>';

                flagArray.push(flagTurkey);
            } else if (this.country.toLowerCase() === "greenland") {
                var flagGreenland = '<div class="flag greenland"><div class="top"></div>\n' +
                                '<div class="bottom"></div><div class="circle"></div></div>';

                flagArray.push(flagGreenland);
            } else if (this.country.toLowerCase() === "japan") {
                var flagJapan = '<div class="flag japan"><div class="innerCircle"></div>\n' +
                            '</div>';

                flagArray.push(flagJapan);
            } else if (this.country.toLowerCase() === "holland") {
                var flagHolland = '<div class="flag holland"><div class="upperHolland"></div>\n' +
                              '<div class="lowerHolland"></div></div>';

                flagArray.push(flagHolland);
            }
        }
    };

    var allFlags = ["France", "Sweden", "Turkey", "Greenland", "Japan", "Holland"];
    var backs = document.getElementsByTagName("td");
    var turnCount = 0;
    var card1, card2, back1, back2, cardTurn1, cardTurn2;

    for (var i in allFlags) {
        var country = Object.create(makeFlag);

        country.init(allFlags[i].toString());
        country.draw();
        country.draw();
    }

    flagArray.sort(() => 0.5 - Math.random());

    flagArray.forEach(function(item, i) {
        //item.classList.toggle("hidden");
        backs[i].innerHTML += item;
    });

    var clicks = 0;
    var clickCount = 0;

    function onClick() {
        for (i = 0; i < backs.length; i++) {
            backs[i].addEventListener('click', function(e) {
                clicks++;
                clickCount++;
                checkMatch(e);
            });
        }
    }


    function checkMatch(e) {
        var card = e.target.childNodes[1];
        var back = e.target;

        if (clicks === 1) {
            card.style.visibility = "visible";
            back.style.visibility = "collapse";
            card1 = card.className;
            back1 = back;
            cardTurn1 = card;
            console.log("you clicked on card 1 named " + card1);
        } else if (clicks == 2) {
            card.style.visibility = "visible";
            back.style.visibility = "collapse";
            card2 = card.className;
            back2 = back;
            cardTurn2 = card;
            console.log("You've clicked on card 2 named " + card2);
            if (card1 == card2) {
                console.log("Good job, you've found a pair");
                turnCount++;
                setTimeout(function() {
                    clicks = 0;
                }, 1000);
            } else if (card1 != card2) {
                setTimeout(function() {
                    cardTurn1.style.visibility = "hidden";
                }, 1000);
                setTimeout(function() {
                    cardTurn2.style.visibility = "hidden";
                }, 1000);
                setTimeout(function() {
                    back1.style.visibility = "visible";
                }, 1000);
                setTimeout(function() {
                    back2.style.visibility = "visible";
                }, 1000);
                console.log("That was not a matching card");
                setTimeout(function() {
                    clicks = 0;
                }, 1000);
            }
        }
        if (turnCount === 6) {
            var wellDone = "Well done, you have found all the flags in ";

            console.log("Good job, you found all cards, press OK on the alert to start over");
            setTimeout(function() {
                alert(wellDone + (clickCount / 2) + " turns!");
            }, 1200);
            setTimeout(function() {
                window.location.reload(true);
            }, 2000);
        }
    }

    onClick();
}());
