var recipes = require('../recipes.json');
var router = require('express').Router();


router.get('/', (req, res) => {
    let { page, limit } = req.query
    if (!page && !limit) return res.json({ data: recipes })

    function splitIntoThrees(arr) {
        // Initialize an empty array to hold the separate arrays
        let splitArr = [];

        // Calculate the number of separate arrays needed
        const numArrays = Math.floor(arr.length / 3);

        // Loop through the range of the number of separate arrays
        for (let i = 0; i < numArrays; i++) {
            // Calculate the start and end indices of the current separate array
            const startIdx = i * 3;
            const endIdx = (i + 1) * 3;

            // Slice the current separate array from the original array
            const separateArr = arr.slice(startIdx, endIdx);

            // Add the current separate array to the split array
            splitArr.push(separateArr);
        }

        // Return the split array
        return splitArr;
    }

    if (!limit) { limit = 3}

    const splittedArray = splitIntoThrees(recipes)
    const newArr = []
    for (let i = 0; i < limit; i++) {
        newArr.push(splittedArray[page-1][i])
    }
    console.log(splittedArray)

    res.json({ data: newArr })

});



module.exports = router;
