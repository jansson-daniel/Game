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
            4: -575
        };

        this.play.addEventListener('click', () => {
            this.result.innerHTML = '';
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
                    this.startGame();
                }  else if (xmlhttp.status === 400) {
                    console.log('There was an error 400', xmlhttp);
                }
                else {
                    console.log('something else other than 200 was returned', xmlhttp);
                }
            }
        };

        //xmlhttp.open("GET", "http://127.0.0.1:8080/winner", true);
        xmlhttp.open("GET", "https://game-slotmachine.herokuapp.com/winner", true);
        xmlhttp.send();
    }

    startGame () {
        const spinner1 = document.querySelectorAll('.wheel1 .spinner');
        const spinner2 = document.querySelectorAll('.wheel2 .spinner');
        const spinner3 = document.querySelectorAll('.wheel3 .spinner');
        const slot1 = document.querySelectorAll('.slot-1');
        const slot2 = document.querySelectorAll('.slot-2');

        this.spin(spinner1, 0);
        this.spin(spinner2, 1);
        this.spin(spinner3, 2);

        for (let slot of slot1) { slot.classList.add('spin'); }
        for (let slot of slot2) { slot.classList.add('spin2'); }

    }

    spin (elements, index) {
        const self = this;
        const playButton = document.querySelector('.play img');

        elements.forEach(function(item) {
            item.addEventListener('webkitAnimationEnd', function () {
                this.style.top = `${self.winPositions[self.winners[index]]}px`;
                this.parentNode.childNodes[1].classList.remove('spin');
                this.parentNode.childNodes[3].classList.remove('spin2');

                if (index === 2) {
                    if (self.bonus === false) {
                        self.result.innerHTML = self.typeOfWin;
                        self.resultSubtitle.innerHTML = '';
                    } else {
                        self.result.innerHTML = 'Bonus!';
                        self.resultSubtitle.innerHTML = 'Extra spin...';
                        self.getWinner();
                    }
                    playButton.classList.remove('spin');
                }
            });
        });
    }

    render () {
        const wrapper = document.createElement('div');
        const markup = `
            <h2 id="result-subtitle"></h2>
            <h1 id="result">Welcome</h1>
            <div id="slot-view">	
					<div class="wheel1">
						<div class="spinner slot-1">
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
						<div class="spinner slot-2">
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
						<div class="spinner slot-1">
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
						<div class="spinner slot-2">
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
						<div class="spinner slot-1">
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
						<div class="spinner slot-2">
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
