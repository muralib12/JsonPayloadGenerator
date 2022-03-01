package com.mycomp.util.model
uses org.json.JSONWriter

uses javax.xml.namespace.QName
uses javax.xml.stream.XMLStreamWriter

class TagModel implements XMLDecoratable, JsonDecoratable {
    var _name : String as Name
    var _value: String as Value
    var _type : QName as Type

  construct(__name:String, __value: String, __type : QName )  {
    _name = __name == null ? "NoName" : __name
    _value = __value == null ? "" : __value
    _type = __type == null ? QName.valueOf("anyType") : __type
  }
  
  function toXml(xtw: XMLStreamWriter) {
    xtw.writeStartElement(ModelHelper.toTagName(_name))
    xtw.writeCharacters( _value )
    xtw.writeEndElement()
  }

  function toJson(xtw: JSONWriter) {
        xtw.key(_name)
            xtw.value(_value)
  }

  override function toString(): String{
        return "TagModel(name='$Name', value='$Value', type=$Type)"
    }

}
