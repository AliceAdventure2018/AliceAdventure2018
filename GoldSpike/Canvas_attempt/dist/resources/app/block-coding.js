Blockly.Blocks['test_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move")
        .appendField(new Blockly.FieldDropdown([["up","UP"], ["down","DOWN"], ["left","LEFT"], ["right","RIGHT"]]), "DIR")
        .appendField("for")
        .appendField(new Blockly.FieldNumber(50, -999, 999, 1), "LEN")
        .appendField("pixels");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['loop_test'] = {
  init: function() {
    this.appendStatementInput("STM")
        .setCheck(null)
        .appendField("Repeat");
    this.appendValueInput("NUM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("for");
    this.appendDummyInput()
        .appendField("times");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['test_block'] = function(block) {
  var dropdown_dir = block.getFieldValue('DIR');
  var number_len = block.getFieldValue('LEN');
  // TODO: Assemble JavaScript into code variable.
  var code = 'MoveFor("'+dropdown_dir+'", '+number_len+');\n';
  return code;
};

Blockly.JavaScript['loop_test'] = function(block) {
  var statements_stm = Blockly.JavaScript.statementToCode(block, 'STM');
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'for (var loop_i = 0; loop_i < '+value_num+'; loop_i++){\n'+statements_stm+'}\n';
  return code;
};

var workspace = Blockly.inject('blocklyDiv',
        {media: '../res/blockly/media/',
         toolbox: document.getElementById('toolbox')});

var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspace, workspaceBlocks);

function RunCode(){
	Blockly.JavaScript.addReservedWords('code');
	var code = Blockly.JavaScript.workspaceToCode(workspace);
	try {
	  eval(code);
	} catch (e) {
	  alert(code);
	}
}