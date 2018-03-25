Blockly.Blocks['use_object_on_another_object'] = {
  init: function() {
    this.appendValueInput("object_A")
        .setCheck("Object")
        .appendField("when used on");
    this.appendStatementInput("then")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("then");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_object_into_inventory'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("move object")
        .appendField(new Blockly.FieldDropdown([["into","MOVEINTO"], ["out of","OUT OF"]]), "in_or_out")
        .appendField("the Inventory");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_object_to_xy'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("Move");
    this.appendDummyInput()
        .appendField(" to")
        .appendField("X:")
        .appendField(new Blockly.FieldNumber(0), "x")
        .appendField("Y:")
        .appendField(new Blockly.FieldNumber(0), "y");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_object_by_xy'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck(null)
        .appendField("Move");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["up","UP"], ["down","DOWN"], ["left","LEFT"], ["right","RIGHT"]]), "direction")
        .appendField("by")
        .appendField(new Blockly.FieldNumber(0), "pixels")
        .appendField("unit");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};