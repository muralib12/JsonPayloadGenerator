package com.mycomp.util.model
uses org.json.JSONWriter

uses javax.xml.stream.XMLStreamWriter
uses java.util.ArrayList

class CollectionTagModel implements XMLDecoratable, JsonDecoratable  {

  var _name : String  
  var _collectionEntries : ArrayList<ComplexTagModel> as CollectionEntries
  
  
  construct(__name:String = "NoName") {
    _name = __name
    _collectionEntries = new ArrayList<ComplexTagModel>()
  }
  
  function toXml(xtw: XMLStreamWriter) {
    xtw.writeStartElement(ModelHelper.toTagName(_name))
    ModelHelper.buildXmlOfCollection(_collectionEntries, xtw)
    xtw.writeEndElement()
  }

  override function toJson(jsw: JSONWriter) {
    jsw.key(_name)
    jsw.array()

    ModelHelper.buildJsonOfCollection(_collectionEntries, jsw)

    jsw.endArray()
  }
}
