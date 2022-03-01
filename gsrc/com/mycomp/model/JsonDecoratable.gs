package com.mycomp.util.model

uses org.json.JSONWriter

interface JsonDecoratable {
  function toJson(jsw: JSONWriter)
}
