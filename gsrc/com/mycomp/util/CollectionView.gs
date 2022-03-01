package com.mycomp.util
uses gw.util.Pair
uses java.util.ArrayList
uses com.mycomp.util.model.ComplexTagModel
uses com.mycomp.util.model.ModelHelper

class CollectionView<P,C> {
  var _name : String
  var _expr : block( p : P ) : List<C>
    
  construct(__name : String, __expr:block(obj : P) : List<C> ) {
    _name = __name
    _expr = __expr
  }

    var simpleTagsList = new ArrayList<Pair<String, block(obj : C) : Object >>()
    var otherTagsList = new ArrayList<Object>()

  function addField(__name: String, __tagExpr: block(obj: C): Object) : CollectionView<P,C> {
        simpleTagsList.add(Pair.make(__name, __tagExpr))
        return this
    }

  function addCollectionTag<S>( colTag: CollectionView<C,S>)  : CollectionView<P,C> {
        otherTagsList.add(colTag as Object)
        return this
    }

  function addComplexTag<S>( compxTag: ComplexView<C,S>)  : CollectionView<P,C> {
        otherTagsList.add(compxTag as Object)
        return this
    }

    function processTag(parentTag: ComplexTagModel, obj: Object) {
        var collTagModel = ModelHelper.getCollectionTagModel(_name)
        parentTag.CollectionTagModels.add(collTagModel)

        var collectionObj: List<C> = this._expr(obj as P)
        
        collectionObj.each( \ cc -> {          
          var entryTag = ModelHelper.getComplexTagModel("Entry")
          collTagModel.CollectionEntries.add(entryTag)
          var helper = new TagHelper<C>()
          helper.processSimpleTags(this.simpleTagsList, entryTag, cc)
          helper.processOtherTags(this.otherTagsList, entryTag, cc)
          
        })
    }
}
