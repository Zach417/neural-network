var NeuralNetworkJS = require("../index.js");
var NeuralNetwork = NeuralNetworkJS.NeuralNetwork;
var Trainer = NeuralNetworkJS.Trainer;

// setup trainer and gather data
var trainer = new Trainer();
var trainX = trainer.data.getTrainingX();
var trainY = trainer.data.getTrainingY();
var testX = trainX;
var testY = trainY;

// architect neural network
var neuralNetwork = new NeuralNetwork();
neuralNetwork.input.size = trainX[0].length;
neuralNetwork.input.setActivation("linear");
neuralNetwork.addHiddenLayer(3, "hyperbolic-tangent");
neuralNetwork.addHiddenLayer(3, "hyperbolic-tangent");
neuralNetwork.output.size = trainY[0].length;
neuralNetwork.output.setActivation("hyperbolic-tangent");
neuralNetwork.generate();

// train
trainer.neuralNetwork = neuralNetwork;
trainer.generateFromFile("cosine.json");
console.log(trainer.neuralNetwork.forward([[Math.PI], [Math.PI / 2]]));
trainer.scalar = 0.000001;
trainer.lambda = 0.00001;
trainer.goal = 0.0001;
trainer.train(100000);
trainer.writeToFile();

// print results
console.log("\nTraining data set results");
trainer.printResults(trainX.splice(0,10), trainY.splice(0,10));

//console.log("\nTesting data set results");
//trainer.printResults(testX, testY);
