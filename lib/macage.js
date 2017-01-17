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

function getAgeString(birthDate) {
  var age = moment.duration(moment() - birthDate);
  var years = age.years(),
      months = age.months(),
      weeks = age.weeks(),
      days = age.days(),
      ageStr = '';

  if (years > 0) {
    ageStr += years + ' year' + (years === 1 ? ', ' : 's, ');
  }
  if (months !== 0 || years !== 0) {
    ageStr += months + ' month' + (months === 1 ? ', ' : 's, ');
  }
  ageStr += weeks + ' week' + (weeks === 1 ? '' : 's');
  if (years === 0 && months === 0 && weeks === 0) {
    ageStr = days + ' day' + (days === 1 ? '' : 's');
  }

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
  var ageStr = getAgeString(birthDate);

  var ageText = 'Age: ' + ageStr;
  if (ageStr.indexOf('day') === -1) {
    ageText += ' (' + ageInDays + ' day' + (ageInDays === 1 ? '' : 's') + ')';
  }

  console.log('Born On: ' + stdout);
  console.log(ageText);
}

try {
  exec(
    'ls -lT /private/var/db/SystemKey ' +
    '| awk \'{print $6,$7,$9}\'', puts);
} catch (e) {
  burn();
}
