import{defineStore}from"pinia";

export const UseAuthStore=defineStore("auth",{
    state:()=>({
        token:localStorage.getItem("token")|| ""

    }),
    getters:{
        isLogin:(state)=>{
            return !!state.token
        }
    },
    actions:{
        login(token){
            this.token=token
            localStorage.setItem("token",token)
        },
        logout(){
            this.token=""
            localStorage.removeItem("token")
        }        
    }

})