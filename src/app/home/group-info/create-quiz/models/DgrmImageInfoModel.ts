export class DgrmImageInfoModel{
	dgrm_img_id : number;
	dgrm_img_name:string
	dgrm_img_path:string
	dgrm_img_desc:string;
	dgrm_img_base64: string;
	uniqueCode : string;
	toBeDeleted : boolean = false;
}