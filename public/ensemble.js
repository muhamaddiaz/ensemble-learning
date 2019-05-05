let train = [];
let jumlahModel = 15;
let jumlahTrainModel = 150;
let trainModel = [];
let totalAtribut = 2;

function getLabel(c) {
  let res = [];
  for (let i = 0; i < jumlahModel; i++) {
    y = getProcess(trainModel[i], 1);
    n = getProcess(trainModel[i], 2);
    for (let j = 0; j < totalAtribut; j++) {
      y *= (1 / (getAllData(trainModel[i], j, 1) * Math.sqrt(2 * Math.PI))) * Math.exp(-(Math.pow(c[j] - getMain(trainModel[i], j, 1), 2) / (2 * Math.pow(getAllData(trainModel[i], j, 1), 2))));
      n *= (1 / (getAllData(trainModel[i], j, 2) * Math.sqrt(2 * Math.PI))) * Math.exp(-(Math.pow(c[j] - getMain(trainModel[i], j, 2), 2) / (2 * Math.pow(getAllData(trainModel[i], j, 2), 2))));
    }
    y >= n ? res.push(1) : res.push(2);
  }
  return res.filter(function (a) {
    return a == 1
  }).length >= res.filter(function (a) {
    return a == 2
  }).length ? 1 : 2;
}

function allData(data) {
  return Math.sqrt(mean(data.map(function (c) {
    return Math.pow((c - mean(data)), 2);
  })));
}

function mean(data) {
  return data.reduce(function (a, b) {
    return a + b
  }) / data.length
}

function makeTrain() {
  x = [];
  for (let i = 0; i < jumlahTrainModel; i++) {
    x.push(train[Math.floor(Math.random() * ((train.length - 1) - 0)) + 0]);
  }
  return x;
}

function generateTrain() {
  for (let i = 0; i < jumlahModel; i++) {
    trainModel.push(makeTrain());
  }
}

function getAllData(data, i, label) {
  return allData(data.filter(function (a) {
    return a[a.length - 1] == label
  }).map(function (a) {
    return parseFloat(a[i])
  }));
}

function getMain(data, i, label) {
  return mean(data.filter(function (a) {
    return a[a.length - 1] == label
  }).map(function (a) {
    return parseFloat(a[i])
  }));
}

function getProcess(data, label) {
  return data.filter(function (a) {
    return a[a.length - 1] == label
  }).length / data.length;
}

function startProcess(c) {
  train.push(c);
}