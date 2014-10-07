morse = require 'morse'
input = document.getElementById 'input'
output = document.getElementById 'output'

input.onchange = ->
  encoded = morse.encode input.value
  output.value = encoded