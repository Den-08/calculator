// ======описание переменных======
var numberBtn = document.querySelectorAll('.number'),
    operatorBtn = document.querySelectorAll('.operator'),
    operlinkBtn = document.querySelectorAll('.btn-hover-orange'),
    decimalBtn = document.getElementById('decimal'),

    minusBtn = document.getElementById('minus'),
    sqrtBtn = document.getElementById('sqrt'),
    MemorySqrtFlag = false,

    MemoryhowWorkFlag = false,

    clearBtn = document.querySelectorAll('.clear-btn'),
    displayScr = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumberFlag = false,
    MemoryPendingOperation = '',
    howWorkBtn = document.getElementById('how-work'),
    operlinkList = document.getElementById('operlink-list');


// =====обработчики событий=====

for (let i = 0; i < numberBtn.length; i++) {
    let numberBtnElem = numberBtn[i];
    numberBtnElem.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}
for (let l = 0; l < operatorBtn.length; l++) {
    let operatorBtnElem = operatorBtn[l];
    operatorBtnElem.addEventListener('click', function (e) {
        operationPress(e.target.textContent);
    });
}
for (let j = 0; j < clearBtn.length; j++) {
    let clearBtnElem = clearBtn[j];
    clearBtnElem.addEventListener('click', function (e) {
        clearPress(e.srcElement.id);
    });
}

minusBtn.addEventListener('click', minusPress);

sqrtBtn.addEventListener('click', sqrtPress);

decimalBtn.addEventListener('click', decimalPress);
howWorkBtn.addEventListener('click', howWorkPress);


// ======описание функций======

function numberPress(textContentButton) {
    if (MemoryNewNumberFlag) {
        displayScr.value = textContentButton;
        MemoryNewNumberFlag = false;
    } else {
        if (displayScr.value === '0') {
            displayScr.value = textContentButton;
        } else {
            displayScr.value += textContentButton;
        }
    }
}



function operationPress(textContentOperation) {
    let localOperationMemory = displayScr.value;
    if (MemoryNewNumberFlag && (MemoryPendingOperation !== '=') && MemorySqrtFlag === false) {
        displayScr.value = MemoryCurrentNumber;
    } else {

        if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === 'x^y') {
            MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, parseFloat(localOperationMemory));
            //} else if (MemoryPendingOperation === '√x') {  //&#8730;x
            // console.log('l=',localOperationMemory,' M=',MemoryCurrentNumber);
            // MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }
        displayScr.value = toFixedFloat(MemoryCurrentNumber);
        MemoryPendingOperation = textContentOperation;
        MemoryNewNumberFlag = true;
        MemorySqrtFlag = false;
    }
}

function minusPress() {
    let localMinusMemory = displayScr.value;
    if (MemoryNewNumberFlag) {
        localMinusMemory = '0';
        MemoryNewNumberFlag = false;
    } else {
        displayScr.value = parseFloat(localMinusMemory) * (-1);
    }
}

function sqrtPress() {
    let localSqrtMemory = displayScr.value;
    if (localSqrtMemory < 0) {
        displayScr.value = 'error - not valid value';
        MemoryNewNumberFlag = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    } else {
        MemoryCurrentNumber = Math.sqrt(parseFloat(localSqrtMemory));
        if (Number.isNaN(MemoryCurrentNumber)) {
            displayScr.value = 'error - not valid value';
            MemoryNewNumberFlag = true;
            MemoryCurrentNumber = 0;
            MemoryPendingOperation = '';
        } else {
            displayScr.value = toFixedFloat(MemoryCurrentNumber);
            MemoryNewNumberFlag = true;
            MemorySqrtFlag = true;
        }
    }
}

function decimalPress() {
    let localDecimalMemory = displayScr.value;
    if (MemoryNewNumberFlag) {
        localDecimalMemory = '0.';
        MemoryNewNumberFlag = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    displayScr.value = localDecimalMemory;
}

function clearPress(id) {
    if (id === 'ce') {
        displayScr.value = '0';
        MemoryNewNumberFlag = true;
    } else if (id === 'c') {
        displayScr.value = '0';
        MemoryNewNumberFlag = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}

function howWorkPress() {
    if (MemoryhowWorkFlag === false) {
        for (let k = 0; k < operlinkBtn.length; k++) {
            let newLi = document.createElement('li');
            let operlinkText = operlinkBtn[k].value;
            newLi.innerText = operlinkText;
            operlinkList.appendChild(newLi);
        }
        MemoryhowWorkFlag = true;
    }
}

function toFixedFloat(value) {
    let power = Math.pow(10, 14);
    return String(Math.round(value * power) / power);
}
