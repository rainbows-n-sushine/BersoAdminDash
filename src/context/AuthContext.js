import React,{createContext,useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../util/Util';




export const AuthContext=createContext();

const AuthProvider=({children})=>{

 
const [isLoading, setIsLoading]=useState(false);
const [adminToken,setAdminToken]=useState(null)
const [adminId,setAdminId]=useState('')



useEffect(()=>{
    isLoggedIn();
},[AdminLogin,AdminLogout]);




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
    AsyncStorage.setItem('adminToken',token)
    AsyncStorage.setItem('adminId',_adminId)
    setAdminId(_adminId)
    setAdminToken(token);
    console.log("this is the token in login: "+token )

    }else{
        Alert.alert(res.data.message)
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
    const _adminToken=await AsyncStorage.getItem('adminToken')
    const _adminId=await AsyncStorage.getItem('adminId')
   

    console.log('adminToken : ',_adminToken)
    console.log('_adminId: ',_adminId)


    if(_adminToken){
        setAdminToken(_adminToken)
        setAdminId(_adminId) 
   
    }


    setIsLoading(false)
        
    } catch (error) {
        if(error){
            console.log('the error in is logged in auth conttxet:',error.message)
        }
        
    }
    


}

return(

    <AuthContext.Provider value={{AdminLogin,AdminLogout,isLoading,adminToken,adminId,isLoggedIn}}>
        {children}
    </AuthContext.Provider>
    
    // </ScrollView>
    // </View>
)
}

export default AuthProvider; 