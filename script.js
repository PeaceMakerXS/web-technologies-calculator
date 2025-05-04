document.addEventListener('DOMContentLoaded', function() {
    const fromBaseSelect = document.getElementById('fromBase');
    const toBaseSelect = document.getElementById('toBase');
    const numberInput = document.getElementById('numberInput');
    const resultOutput = document.getElementById('resultOutput');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const numberButtons = document.querySelectorAll('.btn-number');

    let currentNumber = '';

    // Обновление доступных кнопок при изменении системы счисления
    function updateAvailableButtons() {
        const fromBase = parseInt(fromBaseSelect.value);
        const maxDigit = fromBase - 1;

        numberButtons.forEach(button => {
            const value = button.value;
            let digitValue;

            // Преобразуем буквенные цифры в числовые значения
            if (/^[A-F]$/.test(value)) {
                digitValue = value.charCodeAt(0) - 55; // A=10, B=11, ..., F=15
            } else {
                digitValue = parseInt(value);
            }

            if (digitValue > maxDigit) {
                button.classList.add('btn-disabled');
                button.disabled = true;
            } else {
                button.classList.remove('btn-disabled');
                button.disabled = false;
            }
        });
    }

    // Обработчики событий для кнопок цифр
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentNumber += this.value;
            numberInput.value = currentNumber;
        });
    });

    // Очистка ввода
    clearBtn.addEventListener('click', function() {
        currentNumber = '';
        numberInput.value = '';
        resultOutput.value = '';
    });

    // Конвертация числа
    convertBtn.addEventListener('click', function() {
        if (!currentNumber) {
            alert('Введите число для конвертации.');
            return;
        }

        const fromBase = parseInt(fromBaseSelect.value);
        const toBase = parseInt(toBaseSelect.value);

        try {
            // Преобразуем в десятичное число
            let decimalValue = parseInt(currentNumber, fromBase);

            // Проверка на NaN (некорректный ввод)
            if (isNaN(decimalValue)) {
                throw new Error('Некорректное число для выбранной системы счисления :(');
            }

            // Преобразуем в целевую систему счисления
            let result;
            if (toBase === 10) {
                result = decimalValue.toString();
            } else {
                result = decimalValue.toString(toBase).toUpperCase();
            }

            resultOutput.value = result;
        } catch (error) {
            alert('Ошибка конвертации: ' + error.message);
            resultOutput.value = 'Ошибка';
        }
    });

    // Обновляем доступные кнопки при загрузке и изменении системы счисления
    updateAvailableButtons();
    fromBaseSelect.addEventListener('change', updateAvailableButtons);
});