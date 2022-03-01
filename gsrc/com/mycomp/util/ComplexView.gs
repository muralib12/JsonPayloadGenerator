package com.mycomp.util
uses gw.util.Pair
uses java.util.ArrayList
uses com.mycomp.util.model.ComplexTagModel
uses com.mycomp.util.model.ModelHelper

class ComplexView<P,C> {
    var _name : String
    var _expr : block(obj : P) : C 
  
    construct( __name : String, __expr : block(obj : P) : C ){
        _name = __name
        _expr = __expr
    }
    
    var simpleTagsList = new ArrayList<Pair<String, block(obj : C) : Object >>()
    var otherTagsList = new ArrayList<Object>()

    function addField(__name: String, __tagExpr: (obj: C): Object) : ComplexView<P,C> {
        simpleTagsList.add(Pair.make(__name, __tagExpr))
        return this
    }

    function addCollectionTag<S>( colTag: CollectionView<C,S>)  : ComplexView<P,C> {
        otherTagsList.add(colTag as Object)
        return this
    }

    function addComplexTag<S>( compxTag: ComplexView<C,S>)  : ComplexView<P,C> {
        otherTagsList.add(compxTag as Object)
        return this
    }

    function processTag(parentTag: ComplexTagModel, obj: Object){
        var childComplexTag = ModelHelper.getComplexTagModel(_name)
        parentTag.ComplexTagModels.add(childComplexTag)

        var childObj = _expr(obj as P)
        var helper = new TagHelper<C>()
        helper.processSimpleTags(this.simpleTagsList,childComplexTag, childObj)
        helper.processOtherTags(this.otherTagsList, childComplexTag, childObj)
    }
}