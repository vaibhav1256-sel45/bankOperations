 export interface userData{
    id:string,name:string
  }
  export interface userState {
    data:userData[],
    status:string,
    error:null | string
  }