import { QuestImageModel } from './QuestImageModel';
import { QuestTxtModel } from './QuestTxtModel';

export class QuestModel
{

	 user_questsubject : string;
	 user_questtopic : string;
	 user_questcreator : string;
	 user_questoptionA : string;
	 user_questoptionB : string;
	 user_questoptionC : string;
	 user_questoptionD : string;
	 user_questans  : string;
     user_questmarks : number;
     
     user_quest_img_model : QuestImageModel;
     user_questdgrm_model : QuestImageModel;
     user_questtxt_model : QuestTxtModel;

}