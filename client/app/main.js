/**
 * Slot-machine - Game
 * Author: Daniel Jansson
 * Date: 30/8-17
 * Description: casino slot-machine game
 */
class Game {
    /**
     * Sets up initial application parameters
     * and event-listener on start-button
     * @returns {void}
     */
    constructor () {
        const app = document.getElementById('app');
        const markup = this.render();

        app.appendChild(markup);

        this.start = document.getElementById('start');
        this.result = document.getElementById('result');
        this.resultSubtitle = document.getElementById('result-subtitle');
        this.playButton = document.getElementById('play-button');

        this.bonus = false;
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
     * show relevant information for user, bonus or win
     * @returns {void}
     */
    startGame () {
        this.getResult();

        if (this.bonus === false) {
            this.result.innerHTML = 'Good Luck';
            this.resultSubtitle.innerHTML = '';
        }
    }

    /**
     * Make server request for game result
     * Set relevant variables with data from server
     * Start visual animation
     * @returns {object} data, array with result and type of win
     */
    getResult() {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
                if (xmlhttp.status === 200) {
                    const data = JSON.parse(xmlhttp.responseText);
                    this.bonus = data.bonus;
                    this.typeOfWin = data.win;
                    this.winners = data.result.split(' ');

                    setTimeout(() => {
                        this.playButton.classList.add('spin');
                        this.spinSlots();
                    }, 500);

                }  else if (xmlhttp.status === 400) {
                    console.log('There was an error 400', xmlhttp);
                } else {
                    console.log('something else other than 200 was returned', xmlhttp);
                }
            }
        };

        //xmlhttp.open("GET", "http://127.0.0.1:8080/winner", true);
        xmlhttp.open("GET", "https://game-slotmachine.herokuapp.com/winner", true);
        xmlhttp.send();
    }

    /**
     * Start animation of the symbols
     * to show result visually for user
     * @returns {object} event
     */
    spinSlots () {
        const slots = document.querySelectorAll('.spinner');
        const slot1 = document.querySelectorAll('.slot-1');
        const slot2 = document.querySelectorAll('.slot-2');

        this.bindAnimation(slots);

        for (let slot of slot1) { slot.classList.add('spin') }
        for (let slot of slot2) { slot.classList.add('spin2') }
    }

    /**
     * Check for browser-specific event
     * @returns {string} type of event event
     */
    whichAnimationEvent () {
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
    bindAnimation (slots) {
        const eventType = this.whichAnimationEvent();
        const promises = [];

        slots.forEach((slot) => {
            const promise = new Promise((resolve) => {
                slot.addEventListener(eventType, () => {
                    this.stopSpin(slot, resolve);
                })
            });
            promises.push(promise)
        });

        this.extraSpin(promises);
    }

    /**
     * Creates extra spin (simulates user click) if user gets bonus
     * @returns {void}
     */
    extraSpin (promises) {
        Promise.all(promises).then(() => {
                this.result.innerHTML = this.typeOfWin;
                this.resultSubtitle.innerHTML = '';
                this.playButton.classList.remove('spin');

                if (this.bonus === true) {
                    setTimeout(() => {
                        this.result.innerHTML = 'Bonus';
                        this.resultSubtitle.innerHTML = 'Extra spin';
                        const event = new Event('click');
                        this.start.dispatchEvent(event);
                    }, 1000);
                }
            })
            .catch((e) => {
                console.log('error', e)
            });
    }

    /**
     * Stops animation and positions
     * the elements according to result
     * and stop animation
     * @returns {object} promise
     */
    stopSpin (item, resolve) {
        item.style.top = `${this.winPositions[this.winners[parseInt(item.dataset.id) - 1]]}px`;
        item.classList.remove('spin');
        item.classList.remove('spin2');
        resolve();
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
