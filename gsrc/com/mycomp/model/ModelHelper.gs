package com.mycomp.util.model
uses org.json.JSONWriter

uses java.util.ArrayList
uses javax.xml.stream.XMLStreamWriter

class ModelHelper {
  
  private static var regexpr = "[\\W]"
  
  static function getTagModel(name: String) : TagModel{
    return new TagModel(name, null, null)
  }

  static function getCollectionTagModel(name: String) : CollectionTagModel {
      return new CollectionTagModel(name)
  }

  static function getComplexTagModel(name: String, isRoot: Boolean = false) : ComplexTagModel {
      return new ComplexTagModel(name, isRoot)
  }

  static function toTagName(str : String) : String {
    return str.replace(regexpr,"_")
  }
  
  static function  buildXmlOfCollection(list : ArrayList<Object>, xtw: XMLStreamWriter) {
     if (!list.isEmpty()) {
        list.each ( \ it -> {
            if (it typeis XMLDecoratable){
              it.toXml(xtw)
            }
        })
     }
  }

  static function buildJsonOfCollection(list : ArrayList<Object>, jsw: JSONWriter) {
    if (!list.isEmpty()) {
      list.each ( \ it -> {
        if (it typeis JsonDecoratable){
         it.toJson(jsw)
        }
      })
    }
  }
  
  static function collectionString<X>(list : ArrayList<X>) : String {
    return list?.isEmpty() ? "" : list.join(",\n")
  }

}
