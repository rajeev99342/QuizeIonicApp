import { QuestImageModel } from './QuestImageModel';
import { QuestDgrmModel } from './QuestDgrmModel';
import { QuestTxtModel } from './QuestTxtModel';

export class QuestModel
{

	 quest_subject : string;
	 quest_topic : string;
	 quest_creator : string;
	 quest_optionA : string;
	 quest_optionB : string;
	 quest_optionC : string;
	 quest_optionD : string;
	 quest_ans  : string;
     quest_marks : number;
     
     quest_img_model : QuestImageModel;
     quest_dgrm_model : QuestDgrmModel;
     quest_txt_model : QuestTxtModel;

}