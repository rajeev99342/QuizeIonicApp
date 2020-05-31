
import { UserQuestionModel } from './QuestModel';
import { Time } from '@angular/common';
import { userModel } from 'src/app/home/user/userModel';
import { GroupModel } from 'src/app/models/GroupModel';

export class QuizModel
{
	quiz_id : number;
	quiz_name : string;
	grp_name : string;
	quiz_created_date : Date;
	quiz_time : Time;
	quiz_duration  : number;
	quiz_marks  : number;
	quiz_num_of_ques : number;
	quiz_status : number;
	quiz_published_date : Date;
	userModel : userModel;
	quiz_created_date_string : string;
	quiz_publish_date_string : string;
	quiz_status_string :string;
	status : string;
	grpModel: GroupModel
	
}
