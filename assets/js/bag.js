/**
 * Created by zmark_000 on 05/10/2016.
 */

function Bag()
{
    this.letters = 
    {
        A: 9,
        B: 2,
        C: 2,
        D: 4,
        E: 12,
        F: 2,
        G: 3,
        H: 2,
        I: 9,
        J: 1,
        K: 1,
        L: 4,
        M: 2,
        N: 6,
        O: 8,
        P: 2,
        Q: 1,
        R: 6,
        S: 4,
        T: 6,
        U: 4,
        V: 2,
        W: 2,
        X: 1,
        Y: 2,
        Z: 1
    }
}

Bag.prototype.getLetters = function(numLetters)
{
    let _letters = [];

    for (var i = 0; i < numLetters; i++)
    {
        let string = Object.keys(this.letters).reduce((p, c) => p + Array(this.letters[c]).fill(c).join(""), "");
        if (string === "") break;
        let char = string[Math.floor(Math.random() * string.length)];

        this.letters[char]--;
        _letters.push(char)
    }

    return _letters;
};