import { UserQuestionModel } from './QuestModel';
import { QuizModel } from './QuizModel';
import { KiKidderQuestModel } from './KiKidderQuestModel';

export class QuizDetailModel{
    questions : Array<KiKidderQuestModel>;
    quizModel : QuizModel;
    status : string ;
}