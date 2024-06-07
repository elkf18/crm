// import { useNavigation, useTheme } from "@react-navigation/native";
// import AppConfig from "app/config/app";
// import SessionStore from "app/model/session";
// import Fonts from "libs/assets/fonts";
// import { ITheme } from "libs/config/theme";
// import {
//   Button,
//   Field,
//   Form,
//   Image,
//   ImageBackground,
//   Screen,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
// } from "libs/ui";
// import { shadeColor } from "libs/utils/color";
// import { observer } from "mobx-react";
// import React from "react";
// import { Dimensions, useWindowDimensions } from "react-native";
// import { BorderlessButton, RawButton, RectButton } from "react-native-gesture-handler";
// import * as Yup from "yup";
// import { useState, useEffect } from 'react';
// import useNotification from "libs/hooks/useNotification";
// import * as Notifications from "expo-notifications";
// import { ToastAndroid } from "react-native";
// import GlobalStore from "app/model/global";
// import { runInAction } from "mobx";

// export default observer(() => {
//   const dim = Dimensions.get("window");
//   const nav = useNavigation();
//   const Theme: ITheme = useTheme() as ITheme;
//   SessionStore.loading=false;

//   function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//       width,
//       height
//     };
//   }
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
//   const { height, width } = useWindowDimensions();

//   let heightx = (735*width)/1440;


//   useEffect(()=>{
//     GlobalStore.deviceToken="";
//   },[])

//   useNotification(
//     async ({ token }) => {
//       runInAction(() => (GlobalStore.deviceToken = token));

//     },
//     (token) => {
//       if (!!token) {
//         runInAction(() => (GlobalStore.deviceToken = token));
//         SessionStore.updateDeviceToken();
//       }
//     },
//     (appState, message) => {
//       if (SessionStore.AuthContext.isLoggedIn) {
//         if (appState === "active") {
//           console.log("-")
//           console.log(JSON.stringify(message))
//           let n = message.notification;
//           Notifications.addNotificationResponseReceivedListener(response => {
//             //console.log(JSON.stringify(message?.data?.type))
            
//           })
//           Notifications.addNotificationReceivedListener(response => {
//             //console.log(JSON.stringify(message?.data?.type))
//             if(message?.data?.type=="News"){
//               ToastAndroid.show("Berita baru tersedia.",ToastAndroid.SHORT)
              
//             }else{

//             }
            
            
//           })
//           Notifications.scheduleNotificationAsync({
//             content: { title: n?.title, body: n?.body },
//             trigger: null,
//           });
          
          
          
//         }
        
        
//       //   //NotificationStore.receiveNotif(message);
//       }
//     },
//     []
//   );

//   return (
    
//     <Screen
//       style={{
//         backgroundColor: "#fff",
//       }}
//       statusBar={{
//         barStyle: "dark-content",
//         backgroundColor: "transparent",
//       }}
//     >
//       <ScrollView>
//         <ImageBackground
//         source={require("app/assets/images/bg_1.png")}
//         resizeMode={"contain"}
//         imageStyle={{
//           top:0,
//           left:0,
//           width:width,
//           height:heightx,
          
//         }}
//         >
//            <View
//           style={{
//             margin: 15,
//             justifyContent: 'center',
//             height:"100%",
//             flex: 1,
//             marginTop:75
//           }}
//         >
//           <View
//             style={{
//               alignItems: "center",
//             }}
//           >
//             <Image
//               source={require("app/assets/images/logo.png")}
//               style={{
//                 height: 60,
//                 width: 180,
//                 alignContent:"center",
//                 alignItems:"center",
//                 alignSelf:"center"
//               }}
//             />
//             <View
//             style={{
              
//               marginVertical: 10,
//               justifyContent: "center",
//             }}
//           >
            
//           </View>
//             <Text
//               style={{
//                 lineHeight: 32,
//                 fontSize: 14,
//                 fontFamily: Fonts.poppinsbold,
//                 color: "#0B555B",
//                 marginTop:25
//               }}
//             >
//               Penjualan jadi lebih mudah
//             </Text>
//           </View>
          
//           <View
//             style={{
//               borderRadius: 14,
//               justifyContent: "flex-end",
//               marginBottom: 10,
//             }}
//           >
//             {AppConfig.mode !== "production" && (
//               <Text
//                 style={{
//                   lineHeight: 26,
//                   fontSize: 18,
//                   marginTop: 0,
//                   textAlign: "center",
//                 }}
//               >
//                 Development
//               </Text>
//             )}
//             <Form
//               values={SessionStore}
//               validationSchema={{
//                 username: Yup.string().required("Harus diisi"),
//                 password: Yup.string().required("Harus diisi"),
//               }}
//               onSubmit={() => SessionStore.login()}
//               Submit={(handleSubmit, canSubmit) => (
//                 <RenderSubmit
//                   handleSubmit={handleSubmit}
//                   canSubmit={canSubmit}
//                 />
//               )}
//             >
//               {(props) => (
//                 <>
//                   <Field
//                     initializeField={props}
//                     label={""}
//                     path={"username"}
//                     styles={{
//                       input: {
//                         borderWidth: 1,
//                         height: 41,
//                         borderRadius: 4,
//                         borderColor: "#E6E6E6",
//                       }
//                     }}
                    
//                   >
//                     <TextInput type={"text"}
//                     placeholder="Username"
//                     style={{
//                       textAlign: "left",
//                       fontSize: 14,
//                       padding: 10,
//                       height: 41,
//                       borderRadius: 4,
//                       borderColor: "#E6E6E6",
//                     }}
//                     ></TextInput>
//                   </Field>
//                   <Field
//                     initializeField={props}
//                     label={""}
//                     path={"password"}
//                     hiddenLabel={true}
//                     styles={{
//                       input: {
//                         borderWidth: 1,
//                         height: 41,
//                         borderRadius: 4,
//                         borderColor: "#E6E6E6",
//                       }
//                     }}
//                   >
//                     <TextInput type={"password"}
//                     placeholder="Kata Sandi"
//                     style={{
//                       textAlign: "left",
//                       fontSize: 14,
//                       padding: 10,
//                       height: 41,
//                       borderRadius: 4,
//                       borderColor: "#E6E6E6",
//                     }}
//                     ></TextInput>
//                   </Field>
//                 </>
//               )}
//             </Form>
//              </View>
//         </View>
      
//         <View
//        style={{
//         flexDirection: "row",
//         flex:1,
//         alignSelf:"center",
//         alignItems:"center",
//         alignContent:"center",
//         justifyContent: 'center',
//         position: 'absolute' ,
//         bottom:0,
//         marginBottom:20
//        }}
       
//       >

//         <Text
//         style={{
//           textAlignVertical: 'center'

//          }}>
//         {'\u00A9'} 2020 Kelava{'\u0020'}
        
//         <Text
//           style={{
//             color: Theme.colors.primary,
//             textAlignVertical: 'bottom'

//           }}
//           onPress={() => {
//             nav.navigate("MediaWebView", {
//               data: {
//                 title: "Terms",
//                 source: {
//                   uri: "https://kelava.id/?c=terms&s=#home",
//                 },
//                 style: {
//                   padding: 15,
//                 },
//               },
//             });
//           }}
//         >
//           Terms
//         </Text>
//         {'\u0020'}&{'\u0020'}
      
//         <Text
//           style={{
//             color: Theme.colors.primary
//           }}
//           onPress={() => {
//             nav.navigate("MediaWebView", {
//               data: {
//                 title: "Privacy Policy",
//                 source: {
//                   uri: "https://kelava.id/?c=privacy-policy&s=#home",
//                 },
//                 style: {
//                   padding: 15,
//                 },
//               },
//             });
//           }}
//         >
//            Privacy Policy
//         </Text>
      
      
//         </Text>
      
//       </View>
         
//           </ImageBackground>
//        </ScrollView>
//     </Screen>
//   );
// });

// const RenderSubmit = observer((props: any) => {
//   const { handleSubmit, canSubmit } = props;
//   const nav = useNavigation();
//   const Theme: ITheme = useTheme() as any;

//   return (
//     <>
      
//       <Button
//         style={{
//           margin: 0,
//           marginTop: 20,
//           paddingVertical: 12,
//           borderRadius:8
//         }}
//         onPress={handleSubmit}
//         disabled={!canSubmit || SessionStore.loading}
//       >
//         <Text
//           style={{
//             color: Theme.colors.textLight,
//             fontSize: 16,
//             fontFamily: Fonts.poppinsbold
//           }}
//         >
//           {SessionStore.loading ? "Loading..." : "Masuk"}
//         </Text>
//       </Button>

//       <View
//        style={{
//         flexDirection: "row",
//         alignSelf:"center",
//         alignItems:"center",
//         alignContent:"center",
//         marginTop:11,
//         marginBottom:10
//        }}
//       >

//       <Button
//         style={{
//           flex:1,
//           paddingHorizontal: 10,
//           minHeight: 30,
//           height: 30,
//           backgroundColor: "transparent",
//         }}
//         onPress={() => {
//           nav.navigate("MediaWebView", {
//             data: {
//               title: "Lupa kata sandi",
//               source: {
//                 uri: AppConfig.serverUrl + "index.php?r=site/reqPass",
//               },
//               style: {
//                 padding: 15,
//               },
//             },
//           });
//         }}
//       >
//         <Text
//           style={{
//             color: Theme.colors.primary,
//             width: "100%",
//             textAlign:"center"
//           }}
//         >
//           Lupa kata sandi?
//         </Text>
//       </Button>

//           <View style={{
//           backgroundColor:"#E6E6E6",
//           width:1,
//           height:30

//        }}/>
//       <Button
//         style={{
//           flex:1,
//           paddingHorizontal: 10,
//           minHeight: 30,
//           height: 30,
//           backgroundColor: "transparent",
//           flexDirection: "column",
//         }}
//         onPress={() => {
//           SessionStore.initFormRegist();
//           nav.navigate("Register", {
           
//           });
//         }}
//       >
//         <Text
//           style={{
//             color: Theme.colors.primary,
//             width: "100%",
//             textAlign:"center"
//           }}
//         >
//           Buat Akun
//         </Text>
//       </Button>
//       </View>

      
//     </>
//   );
// });

import Fonts from "libs/assets/fonts";
import {
  Button,
  Field,
  Form,
  ImageBackground,
  TextInput,
  Screen,
  Spinner,
  Text,
  View,
  TopBar,
  Image,
  LinierGradient,
  Icon
} from "libs/ui";
import ScrollView from "libs/ui/ScrollView";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";

import { observer, useLocalObservable } from "mobx-react-lite";
import React from "react";
import { Dimensions, useWindowDimensions, StatusBar } from "react-native";
import * as Yup from "yup";
import { action } from "mobx";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  const requestOTP = async () => {
    dismiss();
    SessionStore.requestOTP();
    nav.navigate("guest/OTP");
  };
  const meta = useLocalObservable(() => ({
    visibleKeyboard: false,
    showAlert: false,
  }));

  const dismiss = action(() => (meta.showAlert = false));

  const onSubmit = async () => {
    // let res = await SessionStore.requestOTP();
    // if (!!res) {
    //   nav.navigate("guest/OTP");
    // }

    let exist = await SessionStore.isRegistered();
    if (exist) {
      nav.navigate("guest/Pin");
    } else {
      if(SessionStore.form.phoneOTP==SessionStore.form.phone){
        if (SessionStore.isOTPExpired()) {
          let res = await SessionStore.requestOTP();
          if (!!res) {
            nav.navigate("guest/OTP");
          }
        } else {
          nav.navigate("guest/OTP");
        }

      }else{
        let res = await SessionStore.requestOTP();
        if (!!res) {
          nav.navigate("guest/OTP");
        }

      }
    }
  };

  const { height, width } = useWindowDimensions();

  let heightx = (364 * (width / 2)) / 734;

  return (
  
  <LinierGradient
    colors={['#3B82F6',"#67E8F9"]}
    style={{flex:1}}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <StatusBar hidden />
      <TopBar
        style={{
          backgroundColor: "#ffff",
          borderBottomRightRadius: 50,
          height:76,
        }}
      >
      <Text style={{fontFamily:"Arial", marginLeft:20,marginTop:15.5,marginBottom:15.5,fontSize:30, height:45,fontWeight:"bold",color:"#3B82F6"}}>MASUK / DAFTAR</Text>
      </TopBar>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#FFF0",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 15,
          }}
        >
          <View style={{flex: 1, flexDirection: 'row',marginBottom:80}}>
            {<Icon name="error" source="MaterialIcons" style={{flex:0,marginRight:13,color:"#F9FAFB"}}/>} 
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Arial",
                lineHeight:24,
                flex:1,
                color:"#F9FAFB"
              }}
            >
             Masukkan nomer telepon anda untuk masuk / daftar
            </Text>
          </View>

          <View style={{height:"100%"}}>
          <Form
              values={SessionStore}
              onSubmit={onSubmit}
              validationSchema={{
                username: Yup.string().required("Harus diisi").min(8, "Minimal 8 angka."),
              }}
              Submit={(submit, canSubmit) => (
                <Button
                  style={{
                    // padding: 10,
                    bottom:-height/2.1-60,
                    borderRadius: 99,
                    margin: 0,
                    height:40,
                    backgroundColor: "#3B82F6",
                  }}
                  onPress={submit}
                  disabled={!canSubmit || SessionStore.loading}
                >
                  {SessionStore.loading ? (
                    <Spinner color="#ffff"></Spinner>
                  ) : (
                    <Text
                      style={{
                        color: "#ffff",
                        fontSize: 14,
                        fontFamily:"Arial",
                      }}
                    >
                      Login / Daftar
                    </Text>
                  )}
                </Button>
              )}
            >
              {(props) => (
                <>
                  <Text style={{fontFamily:"Arial",fontSize:14,fontWeight:"bold",color:"#F9FAFB",marginBottom: 10}}>Nomer Telepon</Text>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{
                    backgroundColor: '#3B82F6',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    height: 45,
                    marginTop: 3.7
                  }}>
                    <Text style={{
                      color: '#FFFFFF',
                    }}>
                      +62
                    </Text>
                  </View>
                  <Field
                    initializeField={props}
                    label={"Nomor Telepon"}
                    path={"username"}
                    styles={{
                      label: {
                        color: "#333",
                        textAlign: "left",
                        fontStyle: "italic",
                        fontSize: 0,
                        width: width,
                      },
                      input:{
                        borderRadius:0,
                      }
                    }}
                  >
                    <TextInput
                      type={"number"}
                      keyboardType={"number-pad"}
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        borderWidth: 1,
                        padding: 10,
                        height: 41,
                        borderColor: "#F4F4F5",
                        fontFamily: Fonts.poppins,
                      }}
                      placeholder="Masukkan No. Telepon"
                    />
                  </Field>
                  </View>
                  
                </>
              )}
            </Form>
          </View>
        </View>
      </ScrollView>
  </LinierGradient>
  );
});