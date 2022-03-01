package com.xcomp.entity

class Employee {
  var empID : String as EmpId
  var dob   : Date   as DOB
  var fName : String as FirstName
  var lName : String as LastName

  var addresses : com.xcomp.entity.Address[] as Addresses
  var employer  : Employer as Employer
}