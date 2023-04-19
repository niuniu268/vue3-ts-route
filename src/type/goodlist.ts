export interface listInt{
    goodname: string,
    goodid:number,
    description:string
}

export interface selectDataInt{
    goodname:string,
    description:string,
    page:number,
    count:number,
    pagesize:number
}

export class initData {
    selectData:selectDataInt={
        goodname:"",
        description:"",
        page:1,
        count:0,
        pagesize:3

    }

    list:listInt[]=[]

}