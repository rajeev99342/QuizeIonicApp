
import { QuestModel } from './QuestModel';
import { Time } from '@angular/common';

export class QuizModel
{
	quiz_name : string;
	grp_name : string;
	quiz_created_date : Date;
	quiz_time : Time;
	quiz_duration  : number;
	quiz_marks  : number;
	quiz_num_of_ques : number;
	quiz_creator : string;
	quiz_published_date : Date;
	quiz_exam : Array<string> = [];
	quiz_topic : Array<string> = [];
	quiz_sub : Array<string> =[];
	user_questlist : Array<QuestModel> = [];
}
