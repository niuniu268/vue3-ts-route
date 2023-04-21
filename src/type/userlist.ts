interface listRoleInt{
    role:number,
    roleName:string
}
export interface listUserInt{
    id:number,
    userName:string,
    nickName:string,
    role:listRoleInt[]
}

interface selectDataInt{
    userName:string,
    role:number
}

interface roleListInt{
    authority:number[],
    roleId:number,
    roleName:string
}

export class initData{
    selectData:selectDataInt={
        userName:"",
        role: 0
    }
    list:listUserInt[]=[]
    rolelist:roleListInt[]=[]
}