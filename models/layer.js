var nj = require('../utils/numjs');
var math = require('../utils/math');

function Layer() {
  this.size = 0;
  this.bias = false;
  this.activation;
  this.activationName;

  this.z; //
  this.a; // activation function of z

  this.activate = function (z) {
    if (!this.activation) {
      throw "Activation function has not been set for this layer";
    }

    var a = z.tolist();
    var zlist = z.tolist();
    for (var i = 0; i < zlist.length; i++) {
      for (var j = 0; j < zlist[i].length; j++) {
        a[i][j] = this.activation(zlist[i][j]);
      }
    }

    return nj.array(a);
  }

  this.activatePrime = function (z) {
    if (!this.activationPrime) {
      throw "Activation function prime has not been set for this layer";
    }

    var a = z.tolist();
    var zlist = z.tolist();
    for (var i = 0; i < zlist.length; i++) {
      for (var j = 0; j < zlist[i].length; j++) {
        a[i][j] = this.activationPrime(zlist[i][j]);
      }
    }

    return nj.array(a);
  }

  this.setActivation = function (af, afp) {
    if (typeof af === "function") {
      this.activation = af;
      this.activationPrime = afp;
    } else if (typeof af === "string") {
      this.activationName = af;
      this.activation = this.deriveActivation(af);
      this.activationPrime = this.deriveActivationPrime(af);
    } else {
      throw "Activation must be of type function or string";
    }
  }

  this.deriveActivation = function (af) {
    switch (af) {
      case "sigmoid":
        return function (x) {
          return 1 / (1 + Math.exp(-x));
        }
      case "hyperbolic-tangent":
        return function (x) {
          return Math.tanh(x);
        }
      case "linear":
        return function (x) {
          return x;
        }
    }
  }

  this.deriveActivationPrime = function (af) {
    switch (af) {
      case "sigmoid":
        return function (x) {
          return Math.exp(-x) / Math.pow((1 + Math.exp(-x)), 2)
        }
      case "hyperbolic-tangent":
        return function (x) {
          return 1 - Math.pow(Math.tanh(x), 2);
        }
      case "linear":
        return function (x) {
          return x;
        }
    }
  }
}

module.exports = Layer;
