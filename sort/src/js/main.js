const arrayContainer = document.querySelector('.array');
const algorithmSelect = document.getElementById('algorithm');
const visibleArrButton = document.getElementById('visibleArr');
const stopButton = document.getElementById('stop');
const startButton = document.getElementById('start');
let animationId;
let currentArray;
let sortingInProgress = false;
let currentStep = 0;

// Генерация случайного массива чисел.
function generateRandomArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

// Отрисовка массива на экране
function renderArray(array) {
    arrayContainer.innerHTML = '';
    for (const num of array) {
        if (isNaN(num)) {
            alert('Ошибка: в массиве есть элемент, который не является числом. \nТакже ошибку может вызвать то, что в массиве присутствуют точки.\n\nВведите корректный массив или напишите "random" в поле ввода, для отображения случайно сгенерированного массива');
            return; 
        }
        const element = document.createElement('div');
        element.className = 'array-element'; 
        const minHeight = 20; // Минимальная высота в пикселях
        const height = minHeight + num; // Увеличиваем высоту в зависимости от числа
        element.style.height = `${height}px`;

        // Создаем дополнительный div для текста
        const textElement = document.createElement('div');
        textElement.textContent = num;
        element.appendChild(textElement);
        arrayContainer.appendChild(element);
    }
}

// Сортировка пузырьком
async function bubbleSort(array, visibleArrIdx) {
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = visibleArrIdx; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                renderArray(array);
                await sleep(200);
                swapped = true;
            }
            if (!sortingInProgress) {
                return;
            }
        }
    } while (swapped);
}

// Сортировка выбором
async function selectionSort(array, visibleArrIdx) {
    const n = array.length;
    for (let i = visibleArrIdx; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray(array);
            await sleep(200);
        }
        if (!sortingInProgress) {
            return;
        }
    }
}

// Сортировка вставками
async function insertionSort(array, visibleArrIdx) {
    const n = array.length;
    for (let i = visibleArrIdx + 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        renderArray(array);
        await sleep(200);
        if (!sortingInProgress) {
            return;
        }
    }
}


// Быстрая сортировка
async function quickSort(array, low, high) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);
        if (!sortingInProgress) {
            return;
        }
        await quickSort(array, low, pivotIndex - 1);
        if (!sortingInProgress) {
            return;
        }
        await quickSort(array, pivotIndex + 1, high);
    }
    if (!sortingInProgress) {
        return;
    }
}

async function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            if (!sortingInProgress) {
                return;
            }
            renderArray(array);
            await sleep(200);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    if (!sortingInProgress) {
        return;
    }
    renderArray(array);
    await sleep(200);
    return i + 1;
}

// Сортировки слиянием
async function mergeSort(array, left, right) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        if (!sortingInProgress) {
            return;
        }
        await mergeSort(array, left, middle);
        if (!sortingInProgress) {
            return;
        }
        await mergeSort(array, middle + 1, right);
        if (!sortingInProgress) {
            return;
        }
        await merge(array, left, middle, right);
        if (!sortingInProgress) {
            return;
        }
    }
}

async function merge(array, left, middle, right) {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = array[middle + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        if (!sortingInProgress) {
            return;
        }
        renderArray(array); // Анимация
        await sleep(200);
        k++;
    }

    while (i < n1) {
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;
    }
}


// Вспомогательная функция для создания задержки
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Слушатели событий
visibleArrButton.addEventListener('click', async () => {
        sortingInProgress = true;
        const algorithm = algorithmSelect.value;
        const inputArray = document.getElementById('inputArray').value;

        // Проверяем, выбран ли режим "случайный массив" или "пользовательский массив"
        if (inputArray === 'random') {
            currentArray = generateRandomArray(20); // Здесь 10 - это длина массива
        } else {
            currentArray = inputArray.split(',').map(Number);
        }

        renderArray(currentArray);

        switch (algorithm) {
            case 'bubble':
                await bubbleSort(currentArray);
                break;
            case 'selection':
                await selectionSort(currentArray);
                break;
            case 'insertion':
                await insertionSort(currentArray);
                break;
            case 'quick':
                await quickSort(currentArray);
                break;
            case 'merge':
                await mergeSort(currentArray);
                break;
        }
        sortingInProgress = false;
        currentStep = 0; // Сбрасываем текущий шаг после завершения сортировки
});
window.addEventListener('DOMContentLoaded', () => {
    const randomArray = generateRandomArray(20); // Здесь 10 - это длина массива
    renderArray(randomArray);
});
window.addEventListener('DOMContentLoaded', async () => {
        // Проверяем, выбран ли режим "случайный массив" или "пользовательский массив"
        currentArray = generateRandomArray(20); // Здесь 10 - это длина массива
        renderArray(currentArray);
        switch (algorithm) {
            case 'bubble':
                await bubbleSort(currentArray);
                break;
            case 'selection':
                await selectionSort(currentArray);
                break;
            case 'insertion':
                await insertionSort(currentArray);
                break;
            case 'quick':
                await quickSort(currentArray);
                break;
            case 'merge':
                await mergeSort(currentArray);
                break;
        }
        sortingInProgress = false;
});

stopButton.addEventListener('click', () => {
    if (sortingInProgress) {
        sortingInProgress = false;
    }
});

startButton.addEventListener('click', async () => {
    if (!sortingInProgress && currentStep < currentArray.length - 1) {
        sortingInProgress = true; 
        const algorithm = algorithmSelect.value;

        switch (algorithm) {
            case 'bubble':
                await bubbleSort(currentArray, currentStep); // Передаем текущий массив и индекс текущего элемента
                break;
            case 'selection':
                await selectionSort(currentArray, currentStep); // Передаем текущий массив и индекс текущего элемента
                break;
            case 'insertion':
                await insertionSort(currentArray, currentStep); // Передаем текущий массив и индекс текущего элемента
                break;
            case 'quick':
                await quickSort(currentArray, currentStep, currentArray.length - 1);
                break;
            case 'merge':
                await mergeSort(currentArray, currentStep, currentArray.length - 1);
                break;
        }

        sortingInProgress = false; // Устанавливаем обратно в false после завершения
    }
});
