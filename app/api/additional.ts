import AppConfig from "app/config/app";
import api, { IAPI } from "libs/utils/api";
import SessionStore from "app/model/session";
import { toJS } from "mobx";

const session = SessionStore;

const getList = async (limit: string = "") => {  
  
    const res = await api({
      url: `${AppConfig.serverUrl}index.php?r=apiService/getListField`,
      method: "post",
      data: {
        appName: AppConfig.appName,
        appToken: AppConfig.appToken,
        client: session.user.id_client,
        userToken: session.user.user_token,
        limit: limit,
      },
    });
  
    if ((!!res)) {
      return res;
    }
    return [];
  };


  const AdditionalAPI = {
    getList
  };
  
  export default AdditionalAPI;
  