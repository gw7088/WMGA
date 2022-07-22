var scentenceToFind = 'Greg is the best!!!';
var charOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[];,.<>? ";

var populationSize = 200;
var genomeSize = scentenceToFind.length;
var mutationRate = 0.005;
var generation = 1;

var population = [];
var maxIndiv;
var maxfitness = 0;

var fontSize = 24;
var canvasH = 800;
var canvasW = (scentenceToFind.length*fontSize)*2 + 150;


function setup() {
  // Create Canvas to work on.
  createCanvas(canvasH, canvasW);
  
  // Creating population with random strings of N length.
  for(var i = 0; i < populationSize; i++)
  {
    var charArray = [];
    for(var j = 0; j < genomeSize; j++){
      charArray.push(selectAChar(charOptions));
    }
    
    var scentence = {
      scentence:charArray,
      fitness:1,
      count:i+1
    };
    
    population.push(scentence);
  }
  var ch = ['i', ' ', '<', '3', ' ', 'D', '1', 'c', 'k', '!', '!', '!', '!', '!', '!'];
  maxIndiv = {
     fitness:0,
     scentence:ch
  };
}



function draw() {
  // Setup Canvas
  background(255);
  
  
  // Calculate Fitness.
  calculateFitness();
  
  
  // Draw best Scentence that matches
  for(var i in population){ 
    if(population[i].fitness > maxfitness){
       maxfitness = population[i].fitness;
       maxIndiv = population[i];
    }
  }
  // Draw Scentence to match.
  textSize(fontSize);
  text(scentenceToFind, 0.6*canvasH, 0.375*canvasW);
  fill(0);
  // Max Fitness
  var count = 0;
  var percent = (count/scentenceToFind.length)*100;
  for(var i in maxIndiv.scentence){
     if(scentenceToFind[i] == maxIndiv.scentence[i]){
        count++; 
     }
     percent = floor((count/scentenceToFind.length)*100);
  }
  textSize(fontSize);
  text(`${percent}%`, 0.6*canvasH, 0.5625*canvasW);
  fill(0);
  // Best Scentence
  textSize(fontSize);
  text(maxIndiv.scentence.join('')+'', 0.6*canvasH, 0.62*canvasW);
  fill(0);
  // Generations
  textSize(fontSize);
  text(`Generations: ${generation}`, 0.6*canvasH, 0.6875*canvasW);
  fill(0);

  if(maxIndiv.scentence.join('') == scentenceToFind){
    noLoop();
  }

  
  // Next Generation.
  nextGeneration();
  generation++;
    
  
  // Draw Scentences.
  for(var i in population){
    textSize(fontSize);
    text(population[i].scentence.join('')+'', 10, population[i].count*(fontSize+5));
    fill(0);
  }
}



function selectAChar(string){
   var index = floor(random(0,string.length));
   return string.charAt(index);
}



function replaceAt(str,index,chr) {
    if(index > str.length-1){
      return str;
    }
    return str.substring(0,index) + chr + str.substring(index+1);
}
