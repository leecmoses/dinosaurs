// Import dino.json
import data from './dino.json';

// Create Dino Constructor
class Dino {
    constructor(species, height, weight, diet, where, when, fact) {
        this.species = species;
        this.img = `img/${species.toLowerCase()}.png`;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    compareHeight(humanHeight) {
        switch(true) {
            case this.height > humanHeight:
                return `${this.species} is ${this.height - humanHeight} inches taller than you.`;
            case this.height < humanHeight:
                return `You are ${humanHeight - this.height} inches taller than ${this.species}.`;
            case this.height === humanHeight:
                return `You and ${this.species} are the same height!`;
            default:
                return `Did you enter your height?`;
        }
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    compareWeight(humanWeight) {
        switch(true) {
            case this.weight > humanWeight:
                return `${this.species} is ${this.weight - humanWeight} pounds heavier than you.`;
            case this.weight < humanWeight:
                return `You are ${humanWeight - this.weight} pounds heavier than ${this.species}.`;
            case this.weight === humanWeight:
                return `You and ${this.species} are the same weight!`;
            default:
                return `Did you enter your weight?`;
        }
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    compareDiet(humanDiet) {
        switch(true) {
            case this.diet === humanDiet:
                return `You share the same diet as the ${this.species}!`;
            case this.diet !== humanDiet:
                return `You do not share the same diet as the ${this.species}!`;
            default:
                return `Did you enter your diet?`;
        }
    }

}

class Human {
    constructor(name, weight, feet, inches, diet, where, when, fact) {
        this.species = 'Human';
        this.img = `img/${this.species.toLowerCase()}.png`;
        this.name = name;
        this.weight = parseInt(weight);
        this.height = parseInt(feet) * 12 + parseInt(inches);
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
}

function init() {
    // Create Dino Objects
    let dinos = data.Dinos;

    const dinoObjects = dinos.map(d => new Dino(d.species, d.height, d.weight, d.diet, d.where, d.when, d.fact));   

    // Create Human Object
    let human = new Human("Human", 145, 5, 7, "omnivore", "World Wide", "Now", "Homo sapiens is Latin for 'wise man'.");

    // Use IIFE to get human data from form
    (function getHumanData() {
        let name = document.getElementById('name').value;
        let feet = document.getElementById('feet').value;
        let inches = document.getElementById('inches').value;
        let weight = document.getElementById('weight').value;
        let diet = document.getElementById('diet').value.toLowerCase();

        human = new Human(name, weight, feet, inches, diet, 'World Wide', 'Now', 'Homo sapiens is Latin for "wise man".');
    })();

    dinoObjects.splice(4,0,human);

    // Generate Tiles for each Dino in Array
    const tiles = dinoObjects.map(dino => {
        const docFrag = document.createDocumentFragment();
        const containerDiv = document.createElement('div');
        containerDiv.className = 'grid-item';

        const img = document.createElement('img');
        img.src = dino.img;

        const title = document.createElement('h3');

        const fact = document.createElement('p');

        if (dino.species === 'Pigeon') {
            title.innerHTML = dino.species;
            fact.innerHTML = dino.fact;
        } else if (dino.species === 'Human') {
            title.innerHTML = dino.name;
        } else {
            title.innerHTML = dino.species;
            fact.innerHTML = (() => {
                let fact;

                const randomInt = getRandomInt(6);

                switch (randomInt) {
                    case 1:
                        fact = dino.compareHeight(human.height);
                        break;
                    case 2:
                        fact = dino.compareWeight(human.weight);
                        break;
                    case 3:
                        fact = dino.compareDiet(human.diet);
                        break;
                    case 4:
                        fact = `The ${dino.species} lived in what is now known as ${dino.where}.`;
                        break;
                    case 5:
                        fact = `The ${dino.species} lived during the ${dino.when} period.`;
                        break;
                    default:
                        fact = dino.fact;
                        break;
                }
                return fact;
            })();
        }
        containerDiv.appendChild(title);
        containerDiv.appendChild(img);
        containerDiv.appendChild(fact);
        docFrag.appendChild(containerDiv);

        return docFrag;
    });

    // Add tiles to DOM
    const grid = document.getElementById('grid');
    tiles.forEach(tile => grid.appendChild(tile))

    // Remove fact from Human Tile
    let facts = document.querySelectorAll("div.grid-item > p");
    let factsArr = Array.prototype.slice.call(facts);
    let humanFact = factsArr[4];
    humanFact.remove();

    

    // Remove form from screen
    document.getElementById('dino-compare').innerHTML = '';
}

function getRandomInt(max) {
    return 1 + Math.floor(Math.random() * Math.floor(max));
}

// On button click, prepare and display infographic
const submitBtn = document.getElementById('btn');

submitBtn.addEventListener("click", init);

