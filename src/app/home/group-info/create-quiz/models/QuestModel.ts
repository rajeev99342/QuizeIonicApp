import { QuestImageModel } from './QuestImageModel';
import { QuestTxtModel } from './QuestTxtModel';

export class QuestModel
{

	 user_questsubject : string;
	 user_questtopic : string;
	 user_quest_creator : string;
	 user_quest_optionA : string;
	 user_quest_optionB : string;
	 user_quest_optionC : string;
	 user_quest_optionD : string;
	 user_quest_ans  : string;
     user_quest_marks : number;
     
     user_quest_img_model : QuestImageModel;
     user_questdgrm_model : QuestImageModel;
	 user_questtxt_model : QuestTxtModel;
	 isEdit : boolean = false;

}