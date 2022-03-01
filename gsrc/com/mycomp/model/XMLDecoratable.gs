package com.mycomp.util.model
uses javax.xml.stream.XMLStreamWriter

interface XMLDecoratable {
    function toXml(xtw: XMLStreamWriter)    
}
