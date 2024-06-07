// import { CommonActions, useNavigation, useTheme } from "@react-navigation/native";
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
//     if(SessionStore.firstOpened===false){
//         nav.navigate("Login")
//     }
//   },[])

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
//                 fontFamily: Fonts.poppins,
//                 color: "#808080",
//               }}
//             >
//               Bisnis Menjadi Lebih Mudah
//             </Text>
//           </View>
          
//           <View
//             style={{
//               borderRadius: 14,
//               justifyContent: "flex-end",
//               marginBottom: 10,
//             }}
//           >
            
//              </View>
//         </View>
      

        
//         <View
//        style={{
//         flexDirection: "column",
//         alignSelf:"center",
//         alignItems:"center",
//         alignContent:"center",
//         justifyContent: 'center',
//         flex:1,
//         flexGrow:1,
//         width:"100%",
//         paddingHorizontal:15,
//         position: 'absolute' ,
//         bottom:0,
//         marginBottom:20,
//         marginHorizontal:15
//        }}
       
//       >
//           <Button
//         style={{
//           margin: 0,
//           marginTop: 20,
//           paddingVertical: 12,
//           borderRadius:8,
//           flexGrow:1,
//           width:"100%",
//           marginBottom:15
//         }}
//         onPress={()=>{
//             nav.navigate("Onboarding")
//         }}
//       >
//         <Text
//           style={{
//             color: Theme.colors.textLight,
//             fontSize: 16,
//             fontFamily: Fonts.poppinsbold
//           }}
//         >
//           Get Started
//         </Text>
//       </Button>

//         <Text
//         style={{
//           textAlignVertical: 'center'

//          }}>
//         Sudah punya akun?{" "}
        
//         <Text
//           style={{
//             color: Theme.colors.primary,
//             textAlignVertical: 'bottom',
//             fontFamily:Fonts.poppinsbold

//           }}
//           onPress={() => {
//             nav.navigate("Login")
//           }}
//         >
//           Login Disini
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
//           borderRadius:100
//         }}
//         onPress={handleSubmit}
//       >
//         <Text
//           style={{
//             color: Theme.colors.textLight,
//             fontSize: 16,
//             fontFamily: Fonts.poppinsbold
//           }}
//         >
//           Get Started
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
              values={SessionStore.formRegist}
              onSubmit={onSubmit}
              validationSchema={{
                phone: Yup.string().required("Harus diisi").min(8, "Minimal 8 angka."),
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
                    path={"phone"}
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

