import { useNavigation } from "@react-navigation/native";
import GlobalStore from "app/model/global";
import SessionStore from "app/model/session";
import PinInput from "app/ui/utils/PinInput";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Text, View, Image,Form,Field, } from "libs/ui";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useState } from "react";
import NumPad from "../utils/NumPad";
import { TextInput } from "react-native";

export default observer((props: any) => {
  const Theme: ITheme = useTheme() as any;
  const length = 4;
  const nav = useNavigation();
  const { setTimer, interval } = props;
  const [number, onChangeNumber] = React.useState<string>();

  useEffect(() => {
    setTimer();

    return () => {
      if (!!interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const change = (value: string) => {
    runInAction(() => (SessionStore.formRegist.otp = value.slice(0, 6)));
    checkUser();
  };
  const checkUser = async () => {
    if (SessionStore.formRegist.otp.length === length) {
      let valid = await SessionStore.validationOTP();
      // let valid = await SessionStore.validationMailOTP();
      if (!!valid) {
        // if (!!SessionStore.form.isRegister) {
        runInAction(() => (GlobalStore.timer = 0));
        if (!!interval) clearInterval(interval);
        nav.navigate("guest/Register");
        // } else {
        //   runInAction(() => (GlobalStore.timer = 0));
        //   if (!!interval) clearInterval(interval);
        //   nav.navigate("guest/Pin");
        // }
      }
    }
  };
  const onSubmit = async () => {
    let res = await SessionStore.formRegist.otp;
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flexDirection: 'column', 
        flexGrow: 1,           
        justifyContent: 'space-between' 
      }}
    >
      <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight:'bold',
          fontFamily: "Arial",
          textAlign: "center",
          marginTop: 45,
          marginBottom: 20,
          color: "#3B82F6",
        }}
      >
        OTP Verifikasi
      </Text>
      <Text
          style={{
            fontSize: 16,
            fontFamily: "Arial",
            color: "#1F2937",
            width: 270,
            height: 72,
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center',
            alignContent: 'center',
            position:'relative',
            marginBottom:20
          }}
        >
          Kami mengirimkan 6 digit kode ke nomer  {SessionStore.formRegist.phone}. Masukkan kode dikolom bawah
      </Text>
        <Timer setTimer={setTimer} />
        <View
          style={{
            backgroundColor: "#fff0",
            marginBottom:30
          }}
        >
          {/* <PinInput value={SessionStore.formRegist.otp} length={length} /> */}
          <TextInput 
          keyboardType="number-pad"
          style={{
            borderColor: 'red',
            borderWidth: 2,
            backgroundColor: '#F3F4F6',
            marginHorizontal: 140,
            paddingHorizontal: 11
          }}
          onChangeText={onChangeNumber}
          maxLength={4}
          value={number}
          />
        </View>
        <ResendButton setTimer={setTimer} />
      </View>
      {/* <View>
        <KeyBoard change={change} />
      </View> */}
      <Button style={{
        backgroundColor: '#3B82F6',
        borderRadius: 99,
        marginBottom: 10
      }}
      onPress={() => {
        runInAction(()=> {
          if(number != null) {
            SessionStore.formRegist.otp = number
            checkUser()
          }
        })
      }}
      >
        <Text style={{
          color: '#FFFFFF'
        }}>
          Verifikasi
        </Text>
      </Button>
      </View>
  );
});

const ResendButton = observer((props: any) => {
  const { setTimer } = props;
  const Theme: ITheme = useTheme() as any;
  const resendOTP = async () => {
    const r = await SessionStore.requestOTP();
    // const r = await SessionStore.requesMailtOTP();
    if (r) {
      setTimer();
    }
  };
  const getTime = () => {
    let m = ("0" + Math.floor(GlobalStore.timer / 60)).slice(-2);
    let s = ("0" + (GlobalStore.timer % 60)).slice(-2);
    return `${m}:${s}`;
  };
  

  return (
    <Button
      style={{
        paddingVertical: 0,
        paddingHorizontal: 20,
        alignSelf: "center",
        backgroundColor: "#fff0",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom:30
      }}
      onPress={resendOTP}
      disabled={GlobalStore.timer > 0}
    >
      <Icon
        name="settings-backup-restore"
        size={14}
        source="MaterialIcons"
        color={"#EF4444"}
      ></Icon>
      <Text
        style={{
          marginStart: 4,
          color: "#EF4444",
          fontFamily: "Arial",
          fontSize: 14,
          justifyContent: "center",
          textAlignVertical: "center",
        }}
      >
        Kirim Ulang kode OTP
      </Text>
    </Button>
  );
});

const Timer = observer((props: any) => {
  const { setTimer } = props;
  const Theme: ITheme = useTheme() as any;
  const resendOTP = async () => {
    const r = await SessionStore.requestOTP();
    // const r = await SessionStore.requesMailtOTP();
    if (r) {
      setTimer();
    }
  };
  const getTime = () => {
    let m = ("0" + Math.floor(GlobalStore.timer / 60)).slice(-2);
    let s = ("0" + (GlobalStore.timer % 60)).slice(-2);
    return `${m}:${s}`;
  };
  

  return (
      <View style={{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: "center", 
        marginBottom:20
        }}>
        <Text
          style={{
            marginStart: 4,
            color: "#000000",
            fontSize: 14,
            fontFamily: "Arial",
          }}
        >
          Waktu Menunggu :
        </Text>
        <Text
          style={{
            marginStart: 4,
            color: "#1E3A8A",
            fontSize: 14,
            justifyContent: "center",
            textAlignVertical: "center",
          }}
        >
        {getTime()}
        </Text>
      </View>
    
  );
});

const KeyBoard = observer(({ change }: any) => {
  return (
    <View
      style={{
        backgroundColor: "#fff0",
      }}
    >
      <NumPad value={SessionStore.formRegist.otp} setValue={change} />
    </View>
  );
});

