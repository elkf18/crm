import api from "libs/utils/api"
import AppConfig from "libs/config/app";
import SessionStore, { User } from "app/model/session";


const getAnalystWorkDay = async(user: User, offset: number = 0) => {
    const res = await api({
        url: `${AppConfig.serverUrl}index.php?r=apiService/getHariKerjaAnalis`,
        method: "post",
        data: {
            appName: AppConfig.appName,
            appToken: AppConfig.appToken,
            client: user.id_client,
            userToken: user.user_token,
            status: "Inactive",
            offset: offset
        }
    })

    console.log(JSON.stringify({
        url: `${AppConfig.serverUrl}index.php?r=apiService/getHariKerjaAnalis`,
        method: "post",
        data: {
            appName: AppConfig.appName,
            appToken: AppConfig.appToken,
            client: user.id_client,
            userToken: user.user_token,
            status: "Inactive",
            offset: offset
        }
    }))

    if (Array.isArray(res)) {
        return res;
      }
      return [];
}

const getAnalystWorkDayApproved = async(user: User, offset: number = 0) => {
    const res = await api({
        url: `${AppConfig.serverUrl}index.php?r=apiService/getHariKerjaAnalis`,
        method: "post",
        data: {
            appName: AppConfig.appName,
            appToken: AppConfig.appToken,
            client: user.id_client,
            userToken: user.user_token,
            status: "Active",
            offset: offset
        }
    })

    console.log(JSON.stringify({
        url: `${AppConfig.serverUrl}index.php?r=apiService/getHariKerjaAnalis`,
        method: "post",
        data: {
            appName: AppConfig.appName,
            appToken: AppConfig.appToken,
            client: user.id_client,
            userToken: user.user_token,
            status: "Active",
            offset: offset
        }
    }))

    if (Array.isArray(res)) {
        return res;
      }
      return [];
}

const analystAPI = {
    getAnalystWorkDay,
    getAnalystWorkDayApproved
}

export default analystAPI;