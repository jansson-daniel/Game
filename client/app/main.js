class Game {
    constructor () {
        const app = document.getElementById('app');
        const markup = this.render();

        app.appendChild(markup);

        this.start = document.getElementById('start');
        this.result = document.getElementById('result');
        this.resultSubtitle = document.getElementById('result-subtitle');
        this.playButton = document.getElementById('play-button');

        this.bonus = false;
        this.previousBonus = false;
        this.winners = [];
        this.winPositions = {
            0: -90,
            1: -215,
            2: -340,
            3: -450,
            4: -575,
            5: -700
        };

        this.start.addEventListener('click', () => {
            this.startGame();
        });
    }

    /**
     * Starts game when user clicks button
     * @returns {void}
     */
    startGame () {
        // make server request to get result
        this.getResult();
        // add animation to play-button
        this.playButton.classList.add('spin');

        // show relevant information for user, bonus or win
        if (this.bonus === true) {
            this.result.innerHTML = 'Bonus';
            this.resultSubtitle.innerHTML = 'Extra spin';
        } else if (event.target.id === 'play-button') {
            this.result.innerHTML = 'Good Luck';
            this.resultSubtitle.innerHTML = '';
        }
    }

    /**
     * Get result from server
     * @returns {object} data, array with result and type of win
     */
    getResult() {
        const xmlhttp = new XMLHttpRequest();
        // Server request callback
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
                if (xmlhttp.status === 200) {
                    // if server response is okay, set variables with data
                    const data = JSON.parse(xmlhttp.responseText);
                    this.bonus = this.previousBonus === false ? data.bonus : false;
                    this.typeOfWin = data.win;
                    this.winners = data.result.split(' ');

                    // start visual animation for user
                    setTimeout(() => {
                        this.spinSlots();
                    }, 500);

                // error handling
                }  else if (xmlhttp.status === 400) {
                    console.log('There was an error 400', xmlhttp);
                } else {
                    console.log('something else other than 200 was returned', xmlhttp);
                }
            }
        };

        // server request (local/test-server)
        //xmlhttp.open("GET", "http://127.0.0.1:8080/winner", true);
        xmlhttp.open("GET", "https://game-slotmachine.herokuapp.com/winner", true);
        xmlhttp.send();
    }

    /**
     * Animate symbols and show result visually for user
     * @returns {object} event
     */
    spinSlots () {
        const slots = document.querySelectorAll('.spinner');
        const slot1 = document.querySelectorAll('.slot-1');
        const slot2 = document.querySelectorAll('.slot-2');

        // bind event to when animation ends
        this.bindAnimation(slots);

        // start animation
        for (let slot of slot1) { slot.classList.add('spin') }
        for (let slot of slot2) { slot.classList.add('spin2') }
    }

    whichAnimationEvent () {
        // Check for browser-specific event
        const element = document.createElement("fakeelement");
        const animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (let type in animations){
            if (element.style[type] !== undefined){
                return animations[type];
            }
        }
    }

    /**
     * Fires when animation ends and shows result
     * @returns {object} event
     */
    bindAnimation (elements) {
        const self = this;
        const eventType = this.whichAnimationEvent();

        elements.forEach(function(item) {
            // Listen for end of event
            item.addEventListener(eventType, function () {
                // Position the elements according to result
                this.style.top = `${self.winPositions[self.winners[parseInt(this.dataset.id) - 1]]}px`;
                // Remove animations
                this.classList.remove('spin');
                this.classList.remove('spin2');

                // Reset event-handlers
                if (this.parentNode !== null) {
                    const newone = this.cloneNode(true);
                    this.parentNode.replaceChild(newone, this);
                }

                // Display type of win after last slot has stopped
                // Remove animation from start button
                if (parseInt(this.dataset.id) === 3) {
                    self.result.innerHTML = self.typeOfWin;
                    self.resultSubtitle.innerHTML = '';
                    self.playButton.classList.remove('spin');
                }

                // if bonus, simulate user click for free spin
                if (self.bonus === true && self.previousBonus === false) {
                    setTimeout(() => {
                        const event = new Event('click');
                        self.start.dispatchEvent(event);
                        self.previousBonus = true;
                    }, 2000)
                } else {
                    self.previousBonus = false;
                }
            })
        });
    }

    /**
     * Renders markup for game (could have been done
     * with template engine but no external libraries
     * was allowed)
     */
    render () {
        const wrapper = document.createElement('div');
        const markup = `
            <img id="rotate" src="../assets/images/rotate.png" />
            <span id="rotate-text">Pleas rotate device to play</span>
            <h2 id="result-subtitle"></h2>
            <h1 id="result">Casino</h1>
            <div id="slot-view">	
                <div class="wheel1">
                    <div data-id="1" class="spinner slot-1">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
                    <div data-id="1" class="spinner slot-2">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
                </div>
                <div class="wheel2">
                    <div data-id="2" class="spinner slot-1">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
                    <div data-id="2" class="spinner slot-2">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
				</div>
                <div class="wheel3">
                    <div data-id="3" class="spinner slot-1">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
                    <div data-id="3" class="spinner slot-2">
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                        <div class="wild"> <img src="../assets/images/Symbol_0.png" alt="wild" width="100" height="100"></div>
                        <div class="strawberry"><img src="../assets/images/Symbol_1.png" alt="strawberry" width="100" height="100"></div>
                        <div class="pineapple"><img src="../assets/images/Symbol_2.png" alt="pineapple" width="100" height="100"> </div>
                        <div class="grapes"><img src="../assets/images/Symbol_3.png" alt="grapes" width="100" height="100"></div>
                        <div class="apple"><img src="../assets/images/Symbol_4.png" alt="apple" width="100" height="100"></div>
                        <div class="lemon"> <img src="../assets/images/Symbol_5.png" alt="lemon" width="100" height="100"></div>
                    </div>
                </div>
            </div>
            <button id="start" class="play">
                <img id="play-button" src="../assets/images/button.png" />
            </button>
        `;

        wrapper.innerHTML = markup;
        return wrapper;
    }
}

module.exports = new Game;
