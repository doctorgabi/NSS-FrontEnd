'use strict';

$(document).ready(initialize);

var schools = [];
function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#add-school').click(clickAddSchool);
  $('#add-student').click(clickAddStudent);
  $('#add-subject').click(clickAddSubect);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickAddSchool(){
  var name = getValue('#school');
  var length = getValue('#length');
  var width = getValue('#width');
  var school = new School(name, length, width);
  schools.push(school);
  htmlAddSchoolToSelect(school);
}



function clickAddStudent(){
  var name = getValue('#student');
  var gpa = getValue('#gpa', parseFloat);
  var schoolName = $('#pick-school').val();//note you need the current value that's selected

  var school = _.find(schools, function(s){
    return s.name === schoolName;
  });

  var student = new Student(name, gpa);
  school.students.push(student);
  htmlAddStudentToSelect(student);
}

function clickAddSubect(){
  var subjectName = getValue('#subject');
  var studentName = $('#pick-student').val();
  //we want to find a student to add a subject to it, but we have to go through the schools first.
  var school = _.find(schools, function(school){ return _.find(school.students, function(s){return s.name === studentName;}); });
  var student = _.find(school.students, function(student){ return student.name === studentName;});
  student.subjects = subjectName;
  debugger;
}


// -------------------------------------------------------------------- //
//CLASSES DEFINED HERE//
function School(name, length, width){
  this.name = name;
  this.established = '1930';
  this.length = length;
  this.width = width;
  this.students = [];
  this.area = function(){
    return parseInt(this.length, 10) * parseInt(this.width, 10);
  };
  this.gpa = function(){
    var sum = _.reduce(this.students, function(memo, student){return memo + student.gpa;}, 0);
    var total = this.students.length;
    return sum / total;
  };
}
//this corresponds to the object you're about to create. you're about to create a new school
//and the this is the shcool you're about to create. We want to give it the property of name
//so it's 'this.name'

function Student(name, gpa){
  this.name = name;
  this.gpa = gpa;
  this.subjects = [];
}

// -------------------------------------------------------------------- //
function htmlAddSchoolToSelect(school){
  var $option = $('<option>');
  $option.text(school.name);
  $option.val(school.name);
  $('#pick-school').append($option);
}
//usually the text and the value are the same but sometimes they're different.


function htmlAddStudentToSelect(student){
  var $option = $('<option>');
  $option.text(student.name);
  $option.val(student.name);
  $('#pick-student').append($option);
}
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
