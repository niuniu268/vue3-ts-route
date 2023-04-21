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

interface activeInt{
    id:number,
    userName:string,
    nickName:string,
    role:number[]
}

export class initData{
    selectData:selectDataInt={
        userName:"",
        role: 0
    }
    list:listUserInt[]=[]
    rolelist:roleListInt[]=[]
    isShow=false
    active:activeInt={
        id:0,
        userName:"",
        nickName:"",
        role:[]
    }
}