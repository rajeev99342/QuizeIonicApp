import { GroupModel } from 'src/app/models/GroupModel';
import { userModel } from '../../user/userModel';

export class GroupParticipantModel{
    grp_part_id : number
    groupModel:GroupModel
    userModel : userModel
    isAdmin : number
}