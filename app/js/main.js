const app = document.querySelector('.app'),
      header = document.querySelector('.header'),
      problem = document.querySelector('.app__problem'),
      input = document.querySelector('input'),
      btns = document.querySelectorAll('.btn'),
      delBtn = document.querySelector('.btn_del'),
      okBtn = document.querySelector('.btn_ok'),
      correctCount = document.getElementById('correct'),
      wrongCount = document.getElementById('wrong');

const menu = document.querySelector('.menu'),
      startBtn = document.getElementById('start'),
      settings = document.querySelector('.settings'),
      settingsBtn = document.getElementById('settings'),
      darkBtn = document.getElementById('dark'),
      lightBtn = document.getElementById('light'),
      level = document.getElementById('level'),
      about = document.querySelector('.about'),
      aboutBtn = document.getElementById('about');

let a, b, sign;
const signArr = ['+', '-', '/', '*'];

let correct = 0,
    wrong = 0;

startBtn.addEventListener('click', () => {
    app.classList.toggle('app_active');
    menu.classList.toggle('menu_active');
    update();
    resetStats();
});

header.addEventListener('click', () => {
    if(menu.classList[1] != 'menu_active' && app.classList[1] != 'app_active' && about.classList[1] != 'about_active') {
        settings.classList.toggle('settings_active');
        menu.classList.toggle('menu_active');
    } else if(menu.classList[1] != 'menu_active' && app.classList[1] != 'app_active' && settings.classList[1] != 'settings_active') {
        about.classList.toggle('about_active');
        menu.classList.toggle('menu_active');
    } else {
        app.classList.toggle('app_active');
        menu.classList.toggle('menu_active');
    }
});

aboutBtn.addEventListener('click', () => {
    menu.classList.toggle('menu_active');
    about.classList.toggle('about_active');
});

settingsBtn.addEventListener('click', () => {
    menu.classList.toggle('menu_active');
    settings.classList.toggle('settings_active');
});

function randomGenerator(n) {
    return Math.round(Math.random()*n);
}

function update() {
    if (level.value == 'Normal') {
        a = randomGenerator(499);
        b = randomGenerator(499);
        let x = randomGenerator(3);
        sign = signArr[x];
    
        if (a > b && sign == '-') {
            problem.textContent = `${a} ${sign} ${b} = `;
        } else if (b > a && sign == '-') {
            problem.textContent = `${b} ${sign} ${a} = `;
        } else if (sign == '+') {
            problem.textContent = `${a} ${sign} ${b} = `;
        } else if (sign == '/') {
            a = randomGenerator(999);
            b = randomGenerator(20);
            for(a; a % b != 0; a = randomGenerator(999)) {
                a;
            }
            problem.textContent = `${a} ${sign} ${b} = `;
        } else if (sign == '*') {
            a = randomGenerator(20);
            b = randomGenerator(20);
            problem.textContent = `${a} ${sign} ${b} = `;
        } else {
            problem.textContent = `${a} ${sign} ${b} = `;
        }

    } else if (level.value == 'Hard') {
        a = randomGenerator(499);
        b = randomGenerator(499);
        let x = randomGenerator(3);
        sign = signArr[x];
    
        if (sign == '+') {
            for (a, b; a < 100 || b < 100; a = randomGenerator(499), b = randomGenerator(499)) {
                a, b;
            }
            problem.textContent = `${a} ${sign} ${b} = `;
        } else if (sign == '-') {
            a = randomGenerator(999);
            b = randomGenerator(999);
            for (a, b; a < 100 || b < 100; a = randomGenerator(999), b = randomGenerator(999)) {
                a, b;
            }
            if (a > b) {
                problem.textContent = `${a} ${sign} ${b} = `;
            } else if (b > a) {
                problem.textContent = `${b} ${sign} ${a} = `;
            }
        } else if (sign == '/') {
            a = randomGenerator(999);
            b = randomGenerator(99);
            for(b; b < 11; b = randomGenerator(99)) {
                b;
            }
            for(a; a % b != 0; a = randomGenerator(999)) {
                a;
            }
            problem.textContent = `${a} ${sign} ${b} = `;
        } else {
            a = randomGenerator(32);
            b = randomGenerator(31);
            for(a; a < 11; a = randomGenerator(32)) {
                a;
            }
            for(b; b < 11; b = randomGenerator(31)) {
                b;
            }
            problem.textContent = `${a} ${sign} ${b} = `;
        }
    } else { //Easy level
        let x = randomGenerator(1);
        sign = signArr[x];
        a = randomGenerator(99);
        b = randomGenerator(99);
        
        if (b > a) {
            problem.textContent = `${b} ${sign} ${a} = `;
        } else {
            problem.textContent = `${a} ${sign} ${b} = `;
        }
    }

    correctCount.textContent = `Correct: ${correct}`;
    wrongCount.textContent = `Wrong: ${wrong}`;
}

function submit() {
    if (sign == '+' && +input.value == (a + b)) {
        ++correct;
        update();
        input.value = '';
    } else if (sign == '-' && a > b && +input.value == (a - b)) {
        ++correct;
        update();
        input.value = '';
    } else if (sign == '-' && b > a && +input.value == (b - a)) {
        ++correct;
        update();
        input.value = '';
    } else if (sign == '/' && +input.value == (a / b)) {
        ++correct;
        update();
        input.value = '';
    } else if (sign == '*' && +input.value == (a * b)) {
        ++correct;
        update();
        input.value = '';
    } 
    else {
        input.value = '';
        ++wrong;
        wrongCount.textContent = `Wrong: ${wrong}`;
    }
}

function del() {
    let str = input.value;
    let newStr = str.substring(0, str.length - 1);
    input.value = newStr;
}

function resetStats() {
    correct = 0;
    wrong = 0;
    correctCount.textContent = `Correct: ${correct}`;
    wrongCount.textContent = `Wrong: ${wrong}`;
}

function lightMode() {
    document.body.style.background = '#fff';
    document.body.style.color = '#000';
    input.style.background = '#fff';
    input.style.color = '#000';
}

function darkMode() {
    document.body.style.background = '#282c34';
    document.body.style.color = '#fff';
    input.style.background = '#282c34';
    input.style.color = '#fff';
}

update();

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        input.value += btn.textContent;
    })
})

delBtn.addEventListener('click', del);

okBtn.addEventListener('click', submit);

lightBtn.addEventListener('click', lightMode);
darkBtn.addEventListener('click', darkMode);

//Key binds for PC version
document.addEventListener('keydown', function(event) {
    if (event.code == 'Digit0') {
      input.value += '0';
    }
    if (event.code == 'Digit1') {
        input.value += '1';
    }
    if (event.code == 'Digit2') {
        input.value += '2';
    }
    if (event.code == 'Digit3') {
        input.value += '3';
    }
    if (event.code == 'Digit4') {
        input.value += '4';
    }
    if (event.code == 'Digit5') {
        input.value += '5';
    }
    if (event.code == 'Digit6') {
        input.value += '6';
    }
    if (event.code == 'Digit7') {
        input.value += '7';
    }
    if (event.code == 'Digit8') {
        input.value += '8';
    }
    if (event.code == 'Digit9') {
        input.value += '9';
    }
    if (event.code == 'Enter') {
        submit();
    }
    if (event.code == 'Backspace') {
        del();
    }
  });
