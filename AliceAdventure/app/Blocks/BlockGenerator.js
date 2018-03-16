
Blockly.JavaScript['use_object_on_another_object'] = function(block) {
  var value_object_a = Blockly.JavaScript.valueToCode(block, 'object_A', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['create_object'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['move_object_into_inventory'] = function(block) {
  var dropdown_in_or_out = block.getFieldValue('in_or_out');
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['change_variable'] = function(block) {
  var dropdown_variable_list = block.getFieldValue('variable list');
  var text_color_name = block.getFieldValue('COLOR_NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['change_sprite'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['show_variable_sprite'] = function(block) {
  var dropdown_option = block.getFieldValue('OPTION');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['show_variable_custom_color'] = function(block) {
  var text_color = block.getFieldValue('COLOR');
  var text_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['placeholder'] = function(block) {
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