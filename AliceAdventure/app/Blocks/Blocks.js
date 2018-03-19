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

Blockly.Blocks['create_object'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("Object")
        .appendField("create object");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
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

Blockly.Blocks['change_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set variable")
        .appendField(new Blockly.FieldDropdown([["color","COLOR"]]), "variable list")
        .appendField("value to")
        .appendField(new Blockly.FieldTextInput("'white'"), "COLOR_NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(165);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['change_sprite'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("change sprite to")
        .appendField(new Blockly.FieldDropdown([[{"src":"http://icons.iconarchive.com/icons/jj-maxer/icon-practice/256/taper-cone-icon.png","width":15,"height":15,"alt":"*"},"OPTIONNAME"], [{"src":"http://icon-park.com/imagefiles/traffic_cone_red.png","width":15,"height":15,"alt":"*"},"OPTIONNAME"]]), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['show_variable_sprite'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sprite:")
        .appendField(new Blockly.FieldDropdown([[{"src":"http://icon-park.com/imagefiles/traffic_cone_red.png","width":15,"height":15,"alt":"pic_red_cone_hat.png"},"OPTIONNAME"], [{"src":"http://icons.iconarchive.com/icons/jj-maxer/icon-practice/256/taper-cone-icon.png","width":15,"height":15,"alt":"pic_white_cone_hat.png"},"OPTIONNAME"], ["pic_red_cone_hat.png","OPTIONNAME"], ["pic_white_cone_hat.png","OPTIONNAME"]]), "OPTION");
    this.setInputsInline(true);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['show_variable_custom_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("custom variable")
        .appendField(new Blockly.FieldTextInput("color"), "COLOR")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("'red'"), "value");
    this.setInputsInline(true);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['placeholder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Something...");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
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