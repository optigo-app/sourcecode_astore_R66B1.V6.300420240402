import { CommonAPI } from "./CommonAPI";


export const GetCount = async() => {



        let CountObj = {};
       
            const storeInit = JSON.parse(localStorage.getItem("storeInit"))
            const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));
            const UserEmail = localStorage.getItem("registerEmail")
    
    
    
        let EncodeData = {FrontEnd_RegNo:`${storeInit?.FrontEnd_RegNo}`,Customerid:`${Customer_id?.id}`}
    
        const encodedCombinedValue = btoa(JSON.stringify(EncodeData));
    
        let body = {
            "con":`{\"id\":\"\",\"mode\":\"Getcount\",\"appuserid\":\"${UserEmail}\"}`,
            "f":"onAddToCart-AddToWishList-Reload (cartcount)",
            "p":encodedCombinedValue
            }
    
    
         await CommonAPI(body).then((res)=>{
          if(res){
            if(res && res.Data && res.Data.rd && res.Data.rd.length > 0) {
              const statMsg = res.Data.rd[0].stat_msg;
              if(statMsg === "success") {
                  const CountCart = res.Data.rd[0].cartcount ?? 0;
                  const WishCount = res.Data.rd[0].wishcount ?? 0;
                  CountObj = { CountCart, WishCount };
              }
          }
          }
        });
    
        return CountObj


}

