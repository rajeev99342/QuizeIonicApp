export class ImageInfoModel {


	img_id: number;
	img_name: string
	img_path: string
	img_base64: string;
	img_desc : string;
	uniqueCode: string;
	toBeDeleted: boolean = false;
	isEdit: boolean = false;
	isDelete: boolean = false;
}