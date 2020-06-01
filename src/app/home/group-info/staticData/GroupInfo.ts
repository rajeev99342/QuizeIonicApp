import { GroupModel } from "../../../models/GroupModel";
export class SetSelectedGroup{
   
  static selectedGroup : GroupModel = new GroupModel();

  setGroupModel(model : GroupModel)
  {
        SetSelectedGroup.selectedGroup = model;
  }

}