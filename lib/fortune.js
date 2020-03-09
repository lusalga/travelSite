// Create my own module
// define an array of fortune cookies message to be displayed on the About page
const fortunes = [
    "Love is all that matters in the end.",
    "Be a hero today!",
    "A fresh start will put you on your way.",
    "A friend asks only for your time not your money",
    "The fortune you seek is in another cookie.",
    "You will live long enough to open many fortune cookies.",
    "You can always find happiness at work on Friday.",
    "Fortune not found? Abort, Retry, Ignore.",
];


// Add global variable exports, to make getFortune function visible outside this module.
exports.getFortune = () => {
    const randomNumber = Math.floor(Math.random()*fortunes.length);
    return fortunes[randomNumber];
};