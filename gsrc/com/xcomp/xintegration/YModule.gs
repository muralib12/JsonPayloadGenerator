package com.xcomp.xintegration

uses com.mycomp.util.CollectionView
uses com.mycomp.util.ComplexView
uses com.mycomp.util.ViewDefinition
uses com.xcomp.entity.Employee
uses com.xcomp.entity.Address
uses com.xcomp.entity.AddressType

uses com.xcomp.entity.Employer
uses gw.api.util.DateUtil

class YModule {
  function main(){

    // Schema Definition + Mapping + Filter
    var definition = new ViewDefinition<Employee>()
    .addField( "EmpID", \emp -> emp.EmpId)
    .addField( "FirstName", \ employee -> employee.FirstName)
    .addField( "LastName", \ employee -> employee.LastName)
    .addArray( new CollectionView<Employee, Address>("Addresses", \employee -> employee.Addresses.toList())
        .addField( "AddressLine1", \address -> address.AddressLine1)
        .addField( "AddressLine2", \address -> address.AddressLine2)
        .addField( "City", \address -> address.City)
        .addField( "State", \address -> address.State)
        .addField( "ZipCode", \address -> address.ZipCode)
    ).addObject( new ComplexView<Employee, Employer>( "Employer", \employee -> employee.Employer)
        .addField("Name", \employer -> employer.Name)
        .addField("IndustryType", \employer -> employer.IndustryType)
        .addField("NoOfEmployees", \employer -> employer.NoOfEmployees)
    )


    // Plug your object here.
    var employee = getEmployee()

    // Generate JSON payload
    definition.generateJson(employee)

    // Generate XML Payload
    //definition.showXML(employee)
  }

  /**
   * Generate an Employee object.
   * In real time this is going to be the actual entity object loaded with database values.
   *
   * @return real time employee object
   */
  function getEmployee() : Employee {

    var employee = new Employee(){
      :EmpId = "101",
      :DOB = DateUtil.currentDate(),
      :FirstName = "John",
      :LastName = "Wick"
    }

    var add1 = new Address(){
      :AddressLine1 = "1234, ABC st",
      :AddressLine2 = "",
        :City = "XYZ",
        :State = "MI",
        :ZipCode = "45862",
        :AddressType = AddressType.Home
    }

    var add2 = new Address(){
        :AddressLine1 = "7867, ASDF Rd",
        :AddressLine2 = "",
        :City = "City1",
        :State = "WY",
        :ZipCode = "58964",
        :AddressType = AddressType.Business
        }

    var addresses = new ArrayList<Address>()
    addresses.add(add1)
    addresses.add(add2)

    employee.Addresses = addresses.toTypedArray()

    var employer = new Employer(){
      : Name = "AtoZ Services Private Ltd",
      : Address = "22, ABC Street, XYZ City, 99988",
      : IndustryType = "Services",
      : NoOfEmployees = 100
    }

    employee.Employer = employer

    return employee
  }
}
