package com.xcomp.entity

uses com.xcomp.entity.AddressType

class Address {
  var addressLine1  : String as AddressLine1
  var addressLine2  : String as AddressLine2
  var city          : String as City
  var state         : String as State
  var zipCode       : String as ZipCode
  var addressType   : AddressType as AddressType
}
