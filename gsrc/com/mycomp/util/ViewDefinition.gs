package com.mycomp.util
uses java.io.OutputStreamWriter
uses java.io.PrintWriter
uses java.lang.System

uses gw.util.Pair
uses java.util.ArrayList
uses com.mycomp.util.model.ComplexTagModel
uses com.mycomp.util.model.ModelHelper
uses javax.xml.stream.XMLOutputFactory
uses java.io.StringWriter
uses java.io.BufferedWriter
uses com.sun.xml.internal.txw2.output.IndentingXMLStreamWriter
uses org.json.JSONWriter

class ViewDefinition<P> {
  
  private var rootTagName : String
  private var _rootTagModel : ComplexTagModel
  
  construct(_rootTagName : String = "Root") {
    rootTagName = _rootTagName
    _rootTagModel = ModelHelper.getComplexTagModel(rootTagName, true)
  }

  private var _out: PrintWriter = new PrintWriter(System.out, true)

  // Defination holders
  private var simpleTagsList = new ArrayList<Pair<String, block( p : P ) : Object>>()
  private var otherTagsList = new ArrayList<Object>()

  function addField(name: String, tagExpr: block(p: P): Object) : ViewDefinition<P> {
      simpleTagsList.add(Pair.make(name, tagExpr))
      return this
  }

  function addArray<C>(colTag: CollectionView<P, C>) : ViewDefinition<P> {
      otherTagsList.add(colTag as Object)
      return this
  }

  function addObject<C>(compxTag: ComplexView<P, C>) : ViewDefinition<P> {
      otherTagsList.add(compxTag as Object)
      return this
  }
  
  function setWriter(pw: PrintWriter){
    _out = pw
  }

  /**
   *   the output would be flushed to the stream. 
   */
  function showXML(obj: P) {

      processTag(obj)
      var sw = new StringWriter()
      var xtw = new IndentingXMLStreamWriter( XMLOutputFactory.newInstance().createXMLStreamWriter( new BufferedWriter(sw) ) )
      xtw.setIndentStep("\t")
      xtw.writeStartDocument("utf-8","1.0")

      _rootTagModel.toXml(xtw)

      xtw.writeEndDocument()
      xtw.flush()

      _out.print(sw.toString())
      _out.flush()
  }

  function generateJson(obj : P) {

    processTag(obj)
    //var sw = new StringWriter()
    var writer = new OutputStreamWriter(System.out)

    var jsw = new JSONWriter(writer)

    _rootTagModel.toJson(jsw)

    writer.flush()
  }
  
  function processTag(obj: P) {
        var helper = new TagHelper<P>()
        helper.processSimpleTags(this.simpleTagsList, this._rootTagModel, obj)
        helper.processOtherTags(this.otherTagsList, this._rootTagModel, obj)
    }
  
}