
//===============create Game==================
myGame.init(1280,960,5);

//===============add Sound==================
myGame.soundManager.load('correct_3', './Resources/Assets/correct.mp3');
myGame.soundManager.load('wrong_4', './Resources/Assets/wrong.wav');
myGame.soundManager.load('lock_5', './Resources/Assets/lock.wav');
myGame.soundManager.load('unlock_6', './Resources/Assets/unlock.wav');
myGame.soundManager.load('put_7', './Resources/Assets/put.wav');
myGame.soundManager.load('win_8', './Resources/Assets/win.wav');
myGame.soundManager.load('door_9', './Resources/Assets/door.wav');
myGame.soundManager.load('meow_1_10', './Resources/Assets/meow_happy.wav');
myGame.soundManager.load('meow_2_11', './Resources/Assets/meow_unhappy.wav');

//===============create Scene================
myGame.sceneManager.createScenes(8);

//===============create States================
myGame.initStateManager({inFront_22 : true, inSide1_23 : false, inSide2_24 : false, inBack_25 : false, haveEnteredClassroom_94 : false, walletCollected_101 : false, notebookEmpty_113 : true});
var reaction = myGame.reactionSystem;

//===============create Objects==================

var _backdrop_2= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_backdrop_2.name = '_backdrop_2';
_backdrop_2.anchor.set(0.5, 0.5);
_backdrop_2.x = 640;
_backdrop_2.y = 480;
_backdrop_2.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeUnClickable( _backdrop_2 );
reaction.makeUnDraggable( _backdrop_2 );
_backdrop_2.visible = true;
myGame.scene(0).addChild(_backdrop_2);

var _Blackboard_39= Alice.Object.fromImage('./Resources/Assets/blackboard.png');
_Blackboard_39.name = '_Blackboard_39';
_Blackboard_39.anchor.set(0.5, 0.5);
_Blackboard_39.x = 634.6666666666666;
_Blackboard_39.y = 312;
_Blackboard_39.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeUnClickable( _Blackboard_39 );
reaction.makeUnDraggable( _Blackboard_39 );
_Blackboard_39.visible = true;
myGame.scene(0).addChild(_Blackboard_39);

var _Room_14= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_Room_14.name = '_Room_14';
_Room_14.anchor.set(0.5, 0.5);
_Room_14.x = 853.3333333333333;
_Room_14.y = 480;
_Room_14.scale.set(1.8666666666666665, 1.3333333333333333);
reaction.makeUnClickable( _Room_14 );
reaction.makeUnDraggable( _Room_14 );
_Room_14.visible = true;
myGame.scene(1).addChild(_Room_14);

var _Room_16= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_Room_16.name = '_Room_16';
_Room_16.anchor.set(0.5, 0.5);
_Room_16.x = 426.66666666666663;
_Room_16.y = 480;
_Room_16.scale.set(1.8666666666666665, 1.3333333333333333);
reaction.makeUnClickable( _Room_16 );
reaction.makeUnDraggable( _Room_16 );
_Room_16.visible = true;
myGame.scene(2).addChild(_Room_16);

var _Library_18= Alice.Object.fromImage('./Resources/Assets/library.png');
_Library_18.name = '_Library_18';
_Library_18.anchor.set(0.5, 0.5);
_Library_18.x = 640;
_Library_18.y = 480;
_Library_18.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeUnClickable( _Library_18 );
reaction.makeUnDraggable( _Library_18 );
_Library_18.visible = true;
myGame.scene(3).addChild(_Library_18);

var _teacher_12= Alice.Object.fromImage('./Resources/Assets/alice_standing.png');
_teacher_12.name = '_teacher_12';
_teacher_12.anchor.set(0.5, 0.5);
_teacher_12.x = 906.6666666666666;
_teacher_12.y = 466.66666666666663;
_teacher_12.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _teacher_12 );
reaction.makeUnDraggable( _teacher_12 );
_teacher_12.visible = true;
myGame.scene(0).addChild(_teacher_12);

var _right_19= Alice.Object.fromImage('./Resources/Assets/arrow_plain.png');
_right_19.name = '_right_19';
_right_19.anchor.set(0.5, 0.5);
_right_19.x = 1226.6666666666665;
_right_19.y = 533.3333333333333;
_right_19.scale.set(0.26666666666666666, 0.7999999999999999);
reaction.makeClickable( _right_19 );
reaction.makeUnDraggable( _right_19 );
_right_19.visible = true;
myGame.scene(0).addChild(_right_19);

var _left_20= Alice.Object.fromImage('./Resources/Assets/arrow_plain.png');
_left_20.name = '_left_20';
_left_20.anchor.set(0.5, 0.5);
_left_20.x = 53.33333333333333;
_left_20.y = 533.3333333333333;
_left_20.scale.set(-0.26666666666666666, 0.7999999999999999);
reaction.makeClickable( _left_20 );
reaction.makeUnDraggable( _left_20 );
_left_20.visible = true;
myGame.scene(0).addChild(_left_20);

var _Window1_40= Alice.Object.fromImage('./Resources/Assets/window_day.png');
_Window1_40.name = '_Window1_40';
_Window1_40.anchor.set(0.5, 0.5);
_Window1_40.x = 840;
_Window1_40.y = 354.66666666666663;
_Window1_40.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Window1_40 );
reaction.makeUnDraggable( _Window1_40 );
_Window1_40.visible = true;
myGame.scene(2).addChild(_Window1_40);

var _Door_41= Alice.Object.fromImage('./Resources/Assets/door.png');
_Door_41.name = '_Door_41';
_Door_41.anchor.set(0.5, 0.5);
_Door_41.x = 410.66666666666663;
_Door_41.y = 482.66666666666663;
_Door_41.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Door_41 );
reaction.makeUnDraggable( _Door_41 );
_Door_41.visible = true;
myGame.scene(1).addChild(_Door_41);

var _Table_43= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_43.name = '_Table_43';
_Table_43.anchor.set(0.5, 0.5);
_Table_43.x = 346.66666666666663;
_Table_43.y = 709.3333333333333;
_Table_43.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeUnClickable( _Table_43 );
reaction.makeUnDraggable( _Table_43 );
_Table_43.visible = true;
myGame.scene(1).addChild(_Table_43);

var _Table_44= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_44.name = '_Table_44';
_Table_44.anchor.set(0.5, 0.5);
_Table_44.x = 685.3333333333333;
_Table_44.y = 712;
_Table_44.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeUnClickable( _Table_44 );
reaction.makeUnDraggable( _Table_44 );
_Table_44.visible = true;
myGame.scene(1).addChild(_Table_44);

var _Table_45= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_45.name = '_Table_45';
_Table_45.anchor.set(0.5, 0.5);
_Table_45.x = 1008;
_Table_45.y = 712;
_Table_45.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeUnClickable( _Table_45 );
reaction.makeUnDraggable( _Table_45 );
_Table_45.visible = true;
myGame.scene(1).addChild(_Table_45);

var _Table_46= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_46.name = '_Table_46';
_Table_46.anchor.set(0.5, 0.5);
_Table_46.x = 976;
_Table_46.y = 712;
_Table_46.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeClickable( _Table_46 );
reaction.makeUnDraggable( _Table_46 );
_Table_46.visible = true;
myGame.scene(2).addChild(_Table_46);

var _Table_47= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_47.name = '_Table_47';
_Table_47.anchor.set(0.5, 0.5);
_Table_47.x = 634.6666666666666;
_Table_47.y = 712;
_Table_47.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeClickable( _Table_47 );
reaction.makeUnDraggable( _Table_47 );
_Table_47.visible = true;
myGame.scene(2).addChild(_Table_47);

var _Table_48= Alice.Object.fromImage('./Resources/Assets/table.png');
_Table_48.name = '_Table_48';
_Table_48.anchor.set(0.5, 0.5);
_Table_48.x = 288;
_Table_48.y = 712;
_Table_48.scale.set(0.5333333333333333, 0.7999999999999999);
reaction.makeClickable( _Table_48 );
reaction.makeUnDraggable( _Table_48 );
_Table_48.visible = true;
myGame.scene(2).addChild(_Table_48);

var _Day_49= Alice.Object.fromImage('./Resources/Assets/backdrop.png');
_Day_49.name = '_Day_49';
_Day_49.anchor.set(0.5, 0.5);
_Day_49.x = 640;
_Day_49.y = 480;
_Day_49.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeUnClickable( _Day_49 );
reaction.makeUnDraggable( _Day_49 );
_Day_49.visible = true;
myGame.scene(5).addChild(_Day_49);

var _Wizard2_50= Alice.Object.fromImage('./Resources/Assets/wizard_student.png');
_Wizard2_50.name = '_Wizard2_50';
_Wizard2_50.anchor.set(0.5, 0.5);
_Wizard2_50.x = 269.3333333333333;
_Wizard2_50.y = 440;
_Wizard2_50.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Wizard2_50 );
reaction.makeUnDraggable( _Wizard2_50 );
_Wizard2_50.visible = true;
myGame.scene(5).addChild(_Wizard2_50);

var _Doghappy_51= Alice.Object.fromImage('./Resources/Assets/dog_happy.png');
_Doghappy_51.name = '_Doghappy_51';
_Doghappy_51.anchor.set(0.5, 0.5);
_Doghappy_51.x = 1162.6666666666665;
_Doghappy_51.y = 634.6666666666666;
_Doghappy_51.scale.set(-0.26666666666666666, 0.26666666666666666);
reaction.makeClickable( _Doghappy_51 );
reaction.makeUnDraggable( _Doghappy_51 );
_Doghappy_51.visible = true;
myGame.scene(5).addChild(_Doghappy_51);

var _Cat_52= Alice.Object.fromImage('./Resources/Assets/cat.png');
_Cat_52.name = '_Cat_52';
_Cat_52.anchor.set(0.5, 0.5);
_Cat_52.x = 1034.6666666666665;
_Cat_52.y = 618.6666666666666;
_Cat_52.scale.set(0.26666666666666666, 0.26666666666666666);
reaction.makeClickable( _Cat_52 );
reaction.makeUnDraggable( _Cat_52 );
_Cat_52.visible = true;
myGame.scene(5).addChild(_Cat_52);

var _Boy_54= Alice.Object.fromImage('./Resources/Assets/boy.png');
_Boy_54.name = '_Boy_54';
_Boy_54.anchor.set(0.5, 0.5);
_Boy_54.x = 1125.3333333333333;
_Boy_54.y = 368;
_Boy_54.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Boy_54 );
reaction.makeUnDraggable( _Boy_54 );
_Boy_54.visible = true;
myGame.scene(5).addChild(_Boy_54);

var _BusinessMan_55= Alice.Object.fromImage('./Resources/Assets/businessman.png');
_BusinessMan_55.name = '_BusinessMan_55';
_BusinessMan_55.anchor.set(0.5, 0.5);
_BusinessMan_55.x = 130.66666666666666;
_BusinessMan_55.y = 546.6666666666666;
_BusinessMan_55.scale.set(0.6666666666666666, 0.6666666666666666);
reaction.makeClickable( _BusinessMan_55 );
reaction.makeUnDraggable( _BusinessMan_55 );
_BusinessMan_55.visible = true;
myGame.scene(5).addChild(_BusinessMan_55);

var _Carblue_56= Alice.Object.fromImage('./Resources/Assets/car_blue.png');
_Carblue_56.name = '_Carblue_56';
_Carblue_56.anchor.set(0.5, 0.5);
_Carblue_56.x = 626.6666666666666;
_Carblue_56.y = 693.3333333333333;
_Carblue_56.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Carblue_56 );
reaction.makeUnDraggable( _Carblue_56 );
_Carblue_56.visible = true;
myGame.scene(5).addChild(_Carblue_56);

var _Room_59= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_Room_59.name = '_Room_59';
_Room_59.anchor.set(0.5, 0.5);
_Room_59.x = 392;
_Room_59.y = 480;
_Room_59.scale.set(1.8666666666666665, 1.8666666666666665);
reaction.makeUnClickable( _Room_59 );
reaction.makeUnDraggable( _Room_59 );
_Room_59.visible = true;
myGame.scene(4).addChild(_Room_59);

var _Door_hall_60= Alice.Object.fromImage('./Resources/Assets/door.png');
_Door_hall_60.name = '_Door_hall_60';
_Door_hall_60.anchor.set(0.5, 0.5);
_Door_hall_60.x = 786.6666666666666;
_Door_hall_60.y = 597.3333333333333;
_Door_hall_60.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Door_hall_60 );
reaction.makeUnDraggable( _Door_hall_60 );
_Door_hall_60.visible = true;
myGame.scene(4).addChild(_Door_hall_60);

var _Room_63= Alice.Object.fromImage('./Resources/Assets/kitchen.png');
_Room_63.name = '_Room_63';
_Room_63.anchor.set(0.5, 0.5);
_Room_63.x = 640;
_Room_63.y = 480;
_Room_63.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeUnClickable( _Room_63 );
reaction.makeUnDraggable( _Room_63 );
_Room_63.visible = true;
myGame.scene(6).addChild(_Room_63);

var _Door_house_66= Alice.Object.fromImage('./Resources/Assets/door.png');
_Door_house_66.name = '_Door_house_66';
_Door_house_66.anchor.set(0.5, 0.5);
_Door_house_66.x = 229.33333333333331;
_Door_house_66.y = 538.6666666666666;
_Door_house_66.scale.set(1.0666666666666667, 1.0666666666666667);
reaction.makeClickable( _Door_house_66 );
reaction.makeUnDraggable( _Door_house_66 );
_Door_house_66.visible = true;
myGame.scene(6).addChild(_Door_house_66);

var _Clock_67= Alice.Object.fromImage('./Resources/Assets/clock.png');
_Clock_67.name = '_Clock_67';
_Clock_67.anchor.set(0.5, 0.5);
_Clock_67.x = 672;
_Clock_67.y = 357.3333333333333;
_Clock_67.scale.set(0.6666666666666666, 0.6666666666666666);
reaction.makeClickable( _Clock_67 );
reaction.makeUnDraggable( _Clock_67 );
_Clock_67.visible = true;
myGame.scene(6).addChild(_Clock_67);

var _Bread_68= Alice.Object.fromImage('./Resources/Assets/bread.png');
_Bread_68.name = '_Bread_68';
_Bread_68.anchor.set(0.5, 0.5);
_Bread_68.x = 928;
_Bread_68.y = 570.6666666666666;
_Bread_68.scale.set(0.6666666666666666, 0.6666666666666666);
reaction.makeClickable( _Bread_68 );
reaction.makeUnDraggable( _Bread_68 );
_Bread_68.visible = true;
myGame.scene(6).addChild(_Bread_68);

var _BoxOpen_79= Alice.Object.fromImage('./Resources/Assets/box2.png');
_BoxOpen_79.name = '_BoxOpen_79';
_BoxOpen_79.anchor.set(0.5, 0.5);
_BoxOpen_79.x = 293.3333333333333;
_BoxOpen_79.y = 728;
_BoxOpen_79.scale.set(0.7999999999999999, 0.7999999999999999);
reaction.makeClickable( _BoxOpen_79 );
reaction.makeUnDraggable( _BoxOpen_79 );
_BoxOpen_79.visible = false;
myGame.scene(4).addChild(_BoxOpen_79);

var _Box_78= Alice.Object.fromImage('./Resources/Assets/box1.png');
_Box_78.name = '_Box_78';
_Box_78.anchor.set(0.5, 0.5);
_Box_78.x = 293.3333333333333;
_Box_78.y = 728;
_Box_78.scale.set(0.7999999999999999, 0.7999999999999999);
reaction.makeClickable( _Box_78 );
reaction.makeUnDraggable( _Box_78 );
_Box_78.visible = true;
myGame.scene(4).addChild(_Box_78);

var _Magicwand_80= Alice.Object.fromImage('./Resources/Assets/magicwand.png');
_Magicwand_80.name = '_Magicwand_80';
_Magicwand_80.anchor.set(0.5, 0.5);
_Magicwand_80.x = 293.3333333333333;
_Magicwand_80.y = 720;
_Magicwand_80.scale.set(1.0666666666666667, 1.0666666666666667);
reaction.makeClickable( _Magicwand_80 );
reaction.makeUnDraggable( _Magicwand_80 );
_Magicwand_80.visible = false;
myGame.scene(4).addChild(_Magicwand_80);

var _Wallet_95= Alice.Object.fromImage('./Resources/Assets/wallet.png');
_Wallet_95.name = '_Wallet_95';
_Wallet_95.anchor.set(0.5, 0.5);
_Wallet_95.x = 1045.3333333333333;
_Wallet_95.y = 570.6666666666666;
_Wallet_95.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Wallet_95 );
reaction.makeUnDraggable( _Wallet_95 );
_Wallet_95.visible = true;
myGame.scene(1).addChild(_Wallet_95);

var _Cup_96= Alice.Object.fromImage('./Resources/Assets/cup.png');
_Cup_96.name = '_Cup_96';
_Cup_96.anchor.set(0.5, 0.5);
_Cup_96.x = 373.3333333333333;
_Cup_96.y = 546.6666666666666;
_Cup_96.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Cup_96 );
reaction.makeUnDraggable( _Cup_96 );
_Cup_96.visible = true;
myGame.scene(2).addChild(_Cup_96);

var _Money_103= Alice.Object.fromImage('./Resources/Assets/money.png');
_Money_103.name = '_Money_103';
_Money_103.anchor.set(0.5, 0.5);
_Money_103.x = 968;
_Money_103.y = 546.6666666666666;
_Money_103.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Money_103 );
reaction.makeUnDraggable( _Money_103 );
_Money_103.visible = false;
myGame.scene(1).addChild(_Money_103);

var _Book_109= Alice.Object.fromImage('./Resources/Assets/book.png');
_Book_109.name = '_Book_109';
_Book_109.anchor.set(0.5, 0.5);
_Book_109.x = 813.3333333333333;
_Book_109.y = 378.66666666666663;
_Book_109.scale.set(0.5333333333333333, 0.5333333333333333);
reaction.makeClickable( _Book_109 );
reaction.makeUnDraggable( _Book_109 );
_Book_109.visible = true;
myGame.scene(3).addChild(_Book_109);

var _Win_117= Alice.Object.fromImage('./Resources/Assets/win.png');
_Win_117.name = '_Win_117';
_Win_117.anchor.set(0.5, 0.5);
_Win_117.x = 640;
_Win_117.y = 480;
_Win_117.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Win_117 );
reaction.makeUnDraggable( _Win_117 );
_Win_117.visible = true;
myGame.scene(7).addChild(_Win_117);


//================interaction=====================

//--------------Click--------------
_right_19.DIY_CLICK = function(){
	if ((myGame.stateManager.states.inFront_22==true)){
		reaction.transitToScene(1);
		reaction.setState('inFront_22', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inSide1_23==true)){
		reaction.transitToScene(3);
		reaction.setState('inSide1_23', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inSide2_24==true)){
		reaction.transitToScene(0);
		reaction.setState('inSide2_24', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inBack_25==true)){
		reaction.transitToScene(2);
		reaction.setState('inBack_25', false);
		return;
	}//if statement end
}//interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Bread_68, _teacher_12, function(){
	myGame.messageBox.startConversation(['Teacher: Thanks but I"m not hungry.'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Magicwand_80, _teacher_12, function(){
	myGame.messageBox.startConversation(['Teacher: What is that?'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Cup_96, _Window1_40, function(){
	reaction.removeObject(_Cup_96);
	myGame.messageBox.startConversation(['Oh I just threw it away.'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Cup_96, _teacher_12, function(){
	myGame.messageBox.startConversation(['Teacher: That is not homwork!'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Wallet_95, _teacher_12, function(){
	myGame.messageBox.startConversation(['Teacher: I don"t need that'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Wallet_95, _Window1_40, function(){
	reaction.removeObject(_Wallet_95);
	myGame.messageBox.startConversation(['It"s a nice wallet but... not useful'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Money_103, _teacher_12, function(){
	myGame.messageBox.startConversation(['Teacher: Why do you give me money? I am your teacher!'], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Money_103, _Window1_40, function(){
	reaction.removeObject(_Money_103);
	myGame.messageBox.startConversation(['I don"t know why I threw the money out of the window but I did it... '], function(){
		});//messageBox end
}); //interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Book_109, _teacher_12, function(){
	if ((myGame.stateManager.states.notebookEmpty_113==true)){
		myGame.messageBox.startConversation(['Teacher: Let me see.... Are you kidding me? It"s empty!'], function(){
			});//messageBox end
		return;
	}//if statement end

	if ((myGame.stateManager.states.notebookEmpty_113==false)){
		myGame.messageBox.startConversation(['Teacher: Oh...it"s your homework? Seems good! You can go back to your seat!'], function(){
			reaction.transitToScene(7);
			reaction.hideInventory();
			});//messageBox end
		return;
	}//if statement end
}); //interaction end

//-------------COMBINE--------------
myGame.eventSystem.addCombineEvent(_Book_109, _Magicwand_80, function(){
	if ((myGame.stateManager.states.notebookEmpty_113==true)){
		reaction.setState('notebookEmpty_113', false);
		myGame.messageBox.startConversation(['Magic please help me with my homework! ....Oh wait? the notebook just became my homework?'], function(){
			});//messageBox end
		return;
	}//if statement end
}); //interaction end

//--------------Click--------------
_left_20.DIY_CLICK = function(){
	if ((myGame.stateManager.states.inFront_22==true)){
		reaction.transitToScene(2);
		reaction.setState('inFront_22', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inSide1_23==true)){
		reaction.transitToScene(0);
		reaction.setState('inSide1_23', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inSide2_24==true)){
		reaction.transitToScene(3);
		reaction.setState('inSide2_24', false);
		return;
	}//if statement end

	if ((myGame.stateManager.states.inBack_25==true)){
		reaction.transitToScene(1);
		reaction.setState('inBack_25', false);
		return;
	}//if statement end
}//interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 0, function(){
	reaction.moveObjectToScene(_right_19, 0);
	reaction.moveObjectToScene(_left_20, 0);
	reaction.setState('inFront_22', true);

	if ((myGame.stateManager.states.haveEnteredClassroom_94==false)){
		reaction.setState('haveEnteredClassroom_94', true);
		myGame.messageBox.startConversation(['Teacher: A "parallelogram" is..... Hey! Why are you late?'], function(){
			});//messageBox end
		return;
	}//if statement end
}); //interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 1, function(){
	reaction.moveObjectToScene(_right_19, 1);
	reaction.moveObjectToScene(_left_20, 1);
	reaction.setState('inSide1_23', true);
}); //interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 2, function(){
	reaction.moveObjectToScene(_right_19, 2);
	reaction.moveObjectToScene(_left_20, 2);
	reaction.setState('inSide2_24', true);
}); //interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 3, function(){
	reaction.moveObjectToScene(_right_19, 3);
	reaction.moveObjectToScene(_left_20, 3);
	reaction.setState('inBack_25', true);
}); //interaction end

//--------------Click--------------
_Clock_67.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['It"s 9:00! Hurry up!'], function(){
		});//messageBox end
}//interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 6, function(){
	myGame.messageBox.startConversation(['Oh it"s 9:00! I must leave soon or I will be late for my class.'], function(){
		});//messageBox end
}); //interaction end

//--------------Click--------------
_Bread_68.DIY_CLICK = function(){
	reaction.addToInventory(_Bread_68);
	myGame.messageBox.startConversation(['Just take that bread in case I am hungry'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Door_house_66.DIY_CLICK = function(){
	reaction.transitToScene(5);
}//interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 5, function(){
	myGame.messageBox.startConversation(['Not enough time! I need to take a taxi.'], function(){
		});//messageBox end
}); //interaction end

//--------------Click--------------
_BusinessMan_55.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Joseph: Hi kid! Good morning.'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Wizard2_50.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Mary: Wish you a good luck today!'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Boy_54.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Bob: What makes you look so hurry?'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Cat_52.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Meow~'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Doghappy_51.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Woof!'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Carblue_56.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['That is it! Take me to school please!'], function(){
		reaction.transitToScene(4);
		myGame.messageBox.startConversation(['Oh no! The class has already begun for 5 minutes... Hope the teacher won"t be mad at me...'], function(){
			});//messageBox end
		});//messageBox end
}//interaction end

//-----------------When Scene transit to A------------------
myGame.eventSystem.addSceneTransitEvent( 4, function(){
}); //interaction end

//--------------Click--------------
_Box_78.DIY_CLICK = function(){
	reaction.makeObjVisible(_BoxOpen_79);
	reaction.makeObjInvisible(_Box_78);
	myGame.messageBox.startConversation(['Why is there a box? I am going to see what is it inside.'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_BoxOpen_79.DIY_CLICK = function(){
	reaction.makeObjVisible(_Magicwand_80);
	myGame.messageBox.startConversation(['Whoa! There is a magic wand! Why is this here?'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Magicwand_80.DIY_CLICK = function(){
	reaction.addToInventory(_Magicwand_80);
}//interaction end

//--------------Click--------------
_Door_hall_60.DIY_CLICK = function(){
	reaction.transitToScene(0);
}//interaction end

//--------------Click--------------
_teacher_12.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Teacher: Did you bring your homework?'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Cup_96.DIY_CLICK = function(){
	reaction.addToInventory(_Cup_96);
}//interaction end

//--------------Click--------------
_Wallet_95.DIY_CLICK = function(){
	if ((myGame.stateManager.states.walletCollected_101==false)){
		reaction.setState('walletCollected_101', true);
		reaction.addToInventory(_Wallet_95);
		myGame.messageBox.startConversation(['A wallet?'], function(){
			});//messageBox end
		return;
	}//if statement end

	if ((myGame.stateManager.states.walletCollected_101==true)){
		reaction.makeObjVisible(_Money_103);
		reaction.addToInventory(_Money_103);
		myGame.messageBox.startConversation(['Oh... money!'], function(){
			});//messageBox end
		return;
	}//if statement end
}//interaction end

//--------------Click--------------
_Window1_40.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['What a view...'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Door_41.DIY_CLICK = function(){
	reaction.transitToScene(4);
}//interaction end

//--------------Click--------------
_Book_109.DIY_CLICK = function(){
	reaction.addToInventory(_Book_109);
	myGame.messageBox.startConversation(['An empty notebook..'], function(){
		});//messageBox end
}//interaction end

myGame.start(6);