const btn = document.querySelector('#submitForm'),
    a1El = document.querySelector('#a1'),
    b1El = document.querySelector('#b1'),
    a2El = document.querySelector('#a2'),
    b2El = document.querySelector('#b2'),
    sumCheckEl = document.querySelector('#sum'),
    differenceCheckEl = document.querySelector('#difference'),
    multiplyCheckEl = document.querySelector('#multiply'),
    devideCheckEl = document.querySelector('#devide'),
    formEl = document.querySelector('form'),
    section = document.querySelector('section');

formEl.addEventListener('submit', evt => {
    console.log(section.querySelectorAll('.row').length);
    evt.preventDefault();
    if (a1El.value == '' || a2El.value == '' || b1El.value == '' || b2El.value == '') {
        return;
    }
    const a1 = Number(a1El.value),
        b1 = Number(b1El.value),
        a2 = Number(a2El.value),
        b2 = Number(b2El.value);

    Array.from(document.querySelectorAll('input[type="checkbox"]')).filter(el => el.checked).forEach(element => {
        let resObj = Object.entries(calculate(element.id, a1, b1, a2, b2));
        console.log(resObj);
        const divEl = document.createElement('div');
        divEl.classList.add('row');
        const insideDiv = document.createElement('div');
        insideDiv.classList.add('col', 'd-flex', 'justify-content-center', 'align-items-center');
        let textCont = `(${a1!=0? a1 + '&nbsp;':''}${b1!=0? b1>0?'+&nbsp;'+b1:'-&nbsp;'+Math.abs(b1) :''}&nbsp;<span class="math">i</span>&nbsp;)&nbsp;${sing(element.id)}
                    (${a2!=0? a2 + '&nbsp;':''}${b2!=0? b2>0?'+&nbsp;'+b2:'-&nbsp;'+Math.abs(b2) :''}&nbsp;<span class="math">i</span>&nbsp;)&nbsp;=&nbsp;`;
        if (typeof(resObj[0][1]) != 'object') {
            textCont += `${resObj[0][1]!=0? resObj[0][1]>0?resObj[0][1]:'-&nbsp;'+Math.abs(resObj[0][1])+'&nbsp;' :''}`;
        } else {
            textCont += `${resObj[0][1][1]>0?resObj[0][1][1]>0?resObj[0][1][1]+'/'+resObj[0][1][2]:'-'+resObj[0][1][1]+'/'+resObj[0][1][2]: resObj[0][1][0]>0?'&nbsp;-'+resObj[0][1][1]+'/'+resObj[0][1][2]:'&nbsp;'+resObj[0][1][1]+'/'+resObj[0][1][2]}`;
        }

        if (typeof(resObj[1][1]) != 'object') {
            textCont += `${resObj[1][1]!=0? resObj[1][1]>0?resObj[1][1]!=1?'+&nbsp;'+resObj[1][1]+'&nbsp;<span class="math">i</span>':'&nbsp;+&nbsp;<span class="math">i</span>':resObj[1][1]!=1?'-&nbsp;'+Math.abs(resObj[1][1])+'&nbsp;<span class="math">i</span>': '&nbsp;-&nbsp;<span class="math">i</span>':''}`;
        } else {
            textCont += `${resObj[1][1][1]>0?resObj[1][1][1]>0?'&nbsp;+&nbsp;'+resObj[1][1][1]+'/'+resObj[1][1][2]+'&nbsp;<span class="math">i</span>':'-&nbsp'+resObj[1][1][1]+'/'+resObj[1][1][2]+'&nbsp;<span class="math">i</span>': resObj[1][1][0]>0?'-&nbsp;'+resObj[1][1][1]+'/'+resObj[1][1][2]+'&nbsp;<span class="math">i</span>':'+&nbsp;'+resObj[1][1][1]+'/'+resObj[1][1][2]+'&nbsp;<span class="math">i</span>'}`;
        }
        insideDiv.innerHTML = textCont;
        divEl.appendChild(insideDiv);
        section.appendChild(divEl);
    });
    refrefClearEl();
    const clearBtn = document.getElementById('clear');
    if (clearBtn != null) {
        clearBtn.addEventListener('click', () => {
            section.innerHTML = '';
            clearBtn.parentElement.parentElement.remove();
        });
    }
});

function sing(typeOfEl) {
    let result = '';
    switch (typeOfEl) {
        case 'sum':
            result = '+';
            break;
        case 'difference':
            result = '-';
            break;
        case 'multiply':
            result = '*';
        break;
        case 'devide':
            result = '/';
            break;
        default:
            break;
    }
    return result;
}

function refrefClearEl() {
    if (section.querySelectorAll('.row').length > 0 && document.getElementById('clear') == null) {
        const divElBtn = document.createElement('div');
        divElBtn.classList.add('row', 'd-flex', 'justify-content-center', 'align-items-center');
        const divInsideBtn = document.createElement('div');
        divInsideBtn.classList.add('col-3');
        const btnEl = document.createElement('button');
        btnEl.classList.add('btn', 'btn-primary', 'btn-block', 'px-0');
        btnEl.setAttribute('id', 'clear');
        btnEl.textContent = 'Clear';
        divInsideBtn.appendChild(btnEl);
        divElBtn.appendChild(divInsideBtn);
        section.parentElement.appendChild(divElBtn);
    }
}

function calculate(id, a1, b1, a2, b2) {
    let result = {};
    switch (id) {
        case 'sum':
            result = {
                first: a1 + a2,
                second: b1 + b2
            }
            break;
        case 'difference':
            result = {
                first: a1 - a2,
                second: b1 - b2
            }
            break;
        case 'multiply':
            result = {
                first: a1 * a2 - b1 * b2,
                second: b1 * a2 + a1 * b2
            }
        break;
        case 'devide':
            let x1 = a1 * a2 + b1 * b2,
                xy = a2 * a2 + b2 * b2,
                x2 = a2 * b1 - a1 * b2,
                aFinal = null,
                bFinal = null;

            if (x1 % xy == 0 || x1 / xy == 0) {
                aFinal = x1 / xy;
            } else if (xy % x1 == 0 || xy / x1 == 0) {
                aFinal = xy / x1;
            }

            if (x2 % xy == 0 || x2 / xy == 0) {
                bFinal = x2 / xy;
            } else if (xy % x2 == 0 || xy / x2 == 0) {
                bFinal = xy / x2;
            }
            result = {
                first: aFinal == null ? {1: x1, 2: xy}: aFinal,
                second: bFinal == null ? {1: x2, 2: xy}: bFinal
            }
            break;
        default:
            break;
    }

    return result;
}