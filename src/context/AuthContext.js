import React,{createContext,useState, useEffect} from 'react';

import api from '../util/Util';




export const AuthContext=createContext();

const AuthProvider=({children})=>{

 
const [isLoading, setIsLoading]=useState(false);
const [adminToken,setAdminToken]=useState(null)
const [adminId,setAdminId]=useState('')
const [adminLoggedIn,setAdminLoggedIn]=useState(false)



const AdminLogin=async(credential,password)=>{


    await api.post('admin/signin',{credential,password})
.then((res)=>{
    
    setIsLoading(true)
    console.log(res.data)
    if(res.data.success===true){
const token=res.data.adminToken
    const _adminId=res.data.adminId

    console.log('im in auth context of the admin panel and this is the value ofadmnin._id',_adminId)
    console.log("this is the adminId "+ _adminId)
    localStorage.setItem('adminToken',token)
    localStorage.setItem('adminId',_adminId)
    setAdminId(_adminId)
    setAdminToken(token);
    setAdminLoggedIn(true)
    console.log("this is the token in login: "+token )
    

    }else{
        alert(res.data.message)
    }
    setIsLoading(false);
}).catch((error)=>{

    if(error){
        console.log('error in login authContext: of the amin panel ',error.message)
    }
})
}


const isLoggedIn=async function(){
    try {
    setIsLoading(true)  
    const _adminToken= localStorage.getItem('adminToken')
    const _adminId= localStorage.getItem('adminId')
   

    console.log('adminToken : ',_adminToken)
    console.log('_adminId: ',_adminId)


    if(_adminToken){
        setAdminToken(_adminToken)
        setAdminId(_adminId) 
        setAdminLoggedIn(true)
   
    }


    setIsLoading(false)
        
    } catch (error) {
        if(error){
            console.log('the error in is logged in auth conttxet:',error.message)
        }       
    }
}



const AdminLogout=async()=>{
    // setRefreshing(true)
    setIsLoading(true);
     localStorage.removeItem('adminToken')
     localStorage.removeItem('adminId')
     setAdminLoggedIn(false)
    setIsLoading(false);
    
    // setRefreshing(false)

}

useEffect(()=>{
    isLoggedIn();
},[AdminLogin,AdminLogout]);


return(

    <AuthContext.Provider value={{AdminLogin,AdminLogout,isLoading,adminToken,adminId,isLoggedIn,adminLoggedIn}}>
        {children}
    </AuthContext.Provider>
    
    // </ScrollView>
    // </View>
)
}

export default AuthProvider; 