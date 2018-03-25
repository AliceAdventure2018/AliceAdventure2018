Blockly.JavaScript['use_object_on_another_object'] = function(block) {
  var value_object_a = Blockly.JavaScript.valueToCode(block, 'object_A', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  // TODO: Assemble JavaScript into code variable.
  var code = '' + '\n';
  return code;
};

Blockly.JavaScript['move_object_into_inventory'] = function(block) {
  var dropdown_in_or_out = block.getFieldValue('in_or_out');
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['move_object_to_xy'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var number_x = block.getFieldValue('x');
  var number_y = block.getFieldValue('y');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['move_object_by_xy'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_direction = block.getFieldValue('direction');
  var number_pixels = block.getFieldValue('pixels');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};