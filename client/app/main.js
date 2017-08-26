class Game {
    constructor () {
        const app = document.getElementById('app');
        const image = this.render();

        app.appendChild(image);

        this.start = document.getElementById('start');
        this.result = document.getElementById('result');
        this.resultSubtitle = document.getElementById('result-subtitle');
        this.play = start.childNodes[1];
        this.winners = [];
        this.winPositions = {
            0: -90,
            1: -215,
            2: -340,
            3: -450,
            4: -575,
            5: -700
        };

        this.play.addEventListener('click', () => {
            if (this.bonus === true) {
                this.result.innerHTML = 'Bonus';
                this.resultSubtitle.innerHTML = 'Extra spinn';
            } else {
                this.result.innerHTML = '';
                this.resultSubtitle.innerHTML = '';
            }

            this.play.classList.add('spin');
            this.getWinner();
        });
    }

    getWinner() {
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
                if (xmlhttp.status === 200) {
                    const data = JSON.parse(xmlhttp.responseText);
                    this.bonus = data.bonus;
                    this.typeOfWin = data.win;
                    this.winners = data.result.split(' ');
                    setTimeout(() => { this.startGame(); }, 500);

                }  else if (xmlhttp.status === 400) {
                    console.log('There was an error 400', xmlhttp);
                } else {
                    console.log('something else other than 200 was returned', xmlhttp);
                }
            }
        };

        xmlhttp.open("GET", "http://127.0.0.1:8080/winner", true);
        //xmlhttp.open("GET", "https://game-slotmachine.herokuapp.com/winner", true);
        xmlhttp.send();
    }

    startGame () {
        const slots = document.querySelectorAll('.spinner');
        const slot1 = document.querySelectorAll('.slot-1');
        const slot2 = document.querySelectorAll('.slot-2');

        this.bindAnimations(slots);

        for (let slot of slot1) { slot.classList.add('spin') }
        for (let slot of slot2) { slot.classList.add('spin2') }
    }

    bindAnimations (elements) {
        const self = this;
        elements.forEach(function(item, index) {
            item.addEventListener('webkitAnimationEnd', function(event) {
                self.handleAnimation(event) }, false
            );
        });
    }

    handleAnimation (event) {
        const self = this;
        event.target.style.top = `${this.winPositions[this.winners[parseInt(event.target.dataset.id) - 1]]}px`;

        if (event.target.parentNode !== null) {
            event.target.parentNode.childNodes[1].classList.remove('spin');
            event.target.parentNode.childNodes[3].classList.remove('spin2');
            const newone = event.target.cloneNode(true);
            event.target.parentNode.replaceChild(newone, event.target);
        }

        if (parseInt(event.target.dataset.id) === 3) {
            this.result.innerHTML = self.typeOfWin;
            this.resultSubtitle.innerHTML = '';
            this.play.classList.remove('spin');
        }

        if (this.bonus === true) {
            setTimeout(() => {
                this.result.innerHTML = 'Bonus!';
                this.resultSubtitle.innerHTML = 'Extra spin...';
                const event = new Event('click');
                self.play.dispatchEvent(event);
            }, 2000)
        }
    }

    render () {
        const wrapper = document.createElement('div');
        const markup = `
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
				    <img src="../assets/images/button.png" />
				</button>
        `;

        wrapper.innerHTML = markup;
        return wrapper;
    }
}

module.exports = new Game;
