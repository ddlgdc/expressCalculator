const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function calculateMean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        return (numbers[middle - 1] + numbers[middle]) / 2;
    }
    else {
        return numbers[middle];
    }
}

function calculateMode(numbers) {
    const countMap = {};
    numbers.forEach((num) => {
        countMap[num] = (countMap[num] || 0) + 1;
    });
    let mode = null;
    let maxCount = 0;

    for(const num in countMap) {
        if(countMap[num] > maxCount) {
            maxCount = countMap[num];
            mode = num;
        }
    }
    return parseInt(mode);
}

app.get('/mean', (req, res) => {
    const { nums } = req.query;
    if(!nums) {
        return res.status(400).json({ error: 'nums are required' });
    }
    const mean = calculateMean(numbers);
    res.json({ operation: 'mean', value: mean });
});

app.get('/median', (req, res) => {
    const { nums } = req.query;
    if(!nums) {
        return res.status(400).json({ error: 'nums are required' });
    }
    const numbers = nums.split(',').map(Number);
    if(numbers.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid number in nums' });
    }
    const median = calculateMedian(numbers);
    res.json({ operation: 'median', value: median });
});

app.get('/mode', (req, res) => {
    const { nums } = req.query;
    if(!nums) {
        return res.status(400).json({ error: 'nums are required' });
    }
    const numbers = nums.split(',').map(Number);
    if(numbers.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid number in nums' });
    }
    const mode = calculateMode(numbers);
    res.json({ operation: 'mode', value: mode });
});

module.exports = app;