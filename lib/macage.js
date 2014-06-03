#!/usr/bin/env node
/*
 * macage
 * https://github.com/mustafar/macage
 *
 * Copyright (c) 2014 Mustafa Rizvi
 * Licensed under the MIT license.
 */

'use strict';

var moment = require('moment');
var exec = require('child_process').exec;

function burn() {
  console.log("You should get a Mac");
}

function getAgeInDays(birthDate) {
  return moment().diff(birthDate, 'days');
}

function getAge(birthDate) {
  var age = moment.duration(moment() - birthDate);
  var years = age.years(),
      months = age.months(),
      weeks = age.weeks();
  var ageStr = years +
    " year" +
    (years === 1 ? ', ' : 's, ') +
    months +
    " month" +
    (months === 1 ? ', ' : 's, ') +
    weeks +
    " week" +
    (weeks === 1 ? '' : 's');
  return ageStr;
}

function puts(error, stdout) {
  if (error) {
    burn();
  }
  // strip newlines
  stdout = stdout.replace(/\r?\n|\r/g, '');
  
  // make dates
  var birthDate = moment(stdout);
  var ageInDays = getAgeInDays(birthDate);
  var ageStr = getAge(birthDate);

  console.log('Born On: ' + stdout);
  console.log(
    'Age: ' +
    ageStr +
    ' (' +
    ageInDays +
    ' day' +
    (ageInDays == 1 ? '' : 's') +
    ' to be exact).'
  );
}

try {
  exec('ls -lt /private/var/db/ | tail -1 | awk \'{print $6,$7,$8}\'', puts);
} catch (e) {
  burn();
}
