package com.mycomp.util
uses gw.util.Pair
uses java.util.ArrayList
uses com.mycomp.util.model.ComplexTagModel
uses com.mycomp.util.model.ModelHelper

public class TagHelper<T> {
  function  processSimpleTags(simpleTagsList : ArrayList<Pair<String, block(obj : T) : Object>>, 
                                  parentTagModel : ComplexTagModel, obj: T) {

    simpleTagsList.each( \ st -> {
        var tag = ModelHelper.getTagModel(st.First)
        tag.Value = st.Second(obj)?.toString()

        parentTagModel.SimpleTagModels.add(tag)
    })
  }

  function processOtherTags(otherTagsList: ArrayList<Object>, parentTag: ComplexTagModel, obj: T){

    otherTagsList.each( \ otherTag -> {
        if (otherTag typeis CollectionView) {
            otherTag.processTag(parentTag, obj as Object)
        } else if (otherTag typeis ComplexView) {
            otherTag.processTag(parentTag, obj as Object)
        }
    })
  } 
  
}


