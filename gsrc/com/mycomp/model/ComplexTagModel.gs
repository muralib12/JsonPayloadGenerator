package com.mycomp.util.model
uses javax.xml.stream.XMLStreamWriter
uses java.util.ArrayList
uses com.mycomp.util.model.ModelHelper
uses org.json.JSONWriter

class ComplexTagModel implements XMLDecoratable, JsonDecoratable {
  
  var name : String
  var _isRoot : Boolean
  var _simpleTagModels : ArrayList<TagModel> as SimpleTagModels
  var _collectionTagModels : ArrayList<CollectionTagModel> as CollectionTagModels
  var _complexTagModels : ArrayList<ComplexTagModel> as ComplexTagModels
  
  construct(_name:String = "NoName", isRoot: Boolean = false) {
    name = _name
    _isRoot = isRoot
    _simpleTagModels = new ArrayList<TagModel>()
    _collectionTagModels = new ArrayList<CollectionTagModel>() 
    _complexTagModels = new ArrayList<ComplexTagModel>()
  }
    
  override function toXml(xtw: XMLStreamWriter) {

    xtw.writeStartElement(ModelHelper.toTagName(name))

    ModelHelper.buildXmlOfCollection(_simpleTagModels, xtw)
    ModelHelper.buildXmlOfCollection(_collectionTagModels, xtw)
    ModelHelper.buildXmlOfCollection(_complexTagModels, xtw)

    xtw.writeEndElement()
  }


  function toJson(jsw: JSONWriter) {

    if (!_isRoot and !name.equalsIgnoreCase("Entry")){
      jsw.key(name)
    }

    jsw.object()

    ModelHelper.buildJsonOfCollection(_simpleTagModels, jsw)
    ModelHelper.buildJsonOfCollection(_collectionTagModels, jsw)
    ModelHelper.buildJsonOfCollection(_complexTagModels, jsw)

    jsw.endObject()
  }
  
  override function toString(): String{
    return "ComplexTagModel(" +
            "\nname='$name'"  +
            "\nsimpleTagModels=[${ModelHelper.collectionString(SimpleTagModels)}], " +
            "\ncollectionTagModels=[${ModelHelper.collectionString(CollectionTagModels)}], "+
            "\ncomplexTagModels=[${ModelHelper.collectionString(ComplexTagModels)}])"
  }

}
