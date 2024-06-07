import {
  useIsFocused,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import colors from "app/config/colors";
import DashboardStore from "app/model/dashboard";
import GlobalStore from "app/model/global";
import SessionStore from "app/model/session";
import ContentItem from "app/ui/dashboard/ContentItem";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import { ITheme } from "libs/config/theme";
import { BarCodeScanner, Button, FlatList, Icon, Image, ImageBackground, ScrollView, Text, View } from "libs/ui";
import { capitalizeFLetter } from "libs/utils/string-format";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, RefreshControl, TouchableOpacity, useWindowDimensions } from "react-native";
import FunnelSales from "../ui/dashboard/FunnelSales";
import OpportunityCustomer from "../ui/dashboard/OpportunityCustomer";
import OpportunitySales from "../ui/dashboard/OpportunitySales";
import { StatusBar } from "react-native";
import fonts from "app/assets/fonts";
import { SvgCss } from "react-native-svg";
import assests from "app/assets/images/icon/assets";
import assets from "app/assets/images/icon/assets";
import { LinearGradient } from "expo-linear-gradient";

export default observer(() => {
  const Theme: ITheme = useTheme() as any;
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const refresh = () => {
    DashboardStore.load();
  };

  const data: Array<Object> = [
    {
      tanggal: 'Senin, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
    {
      tanggal: 'Senin, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
    {
      tanggal: 'Senin, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
    {
      tanggal: 'Senin, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
    {
      tanggal: 'Senin, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
    {
      tanggal: 'Seni, 10 Mei 2021',
      jam: '10:00',
      nama: 'Devina Clarissa',
      alamat: 'Jl. Jawa gang lebar No. 20'
    },
  ]

  const dataKerja: Array<Object> = [
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    },
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    },
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    },
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    },
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    },
    {
      hari: 'Selasa, 12 Mei 2021',
      jam: '08:00 - 17:00'
    }
  ]

  const dataOngoing = {
    id: '#123456',
    nama: 'James',
    alamat: 'Jl. Seminyak No 10 Denpasar',
    tanggal: '2 Feb 2020'
  }

  const refreshControl = (
    <RefreshControl refreshing={DashboardStore.loading} onRefresh={refresh} />
  );

  const PemeriksaanRender = (props: any) => {
    return(
      <View style={{
        backgroundColor: 'white',
        borderColor: 'rgba(229, 231, 235, 1)',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 4,
          color: '#4B5563',
        }}>
          {props.data.tanggal}
        </Text>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 4,
          color: '#4B5563',
        }}>
          {props.data.jam}
        </Text>
        <Text style={{
          marginBottom: 4,
          color: '#4B5563',
          fontSize: 16
        }}>
          {props.data.nama}
        </Text>
        <Text style={{
          color: '#4B5563',
          fontSize: 16
        }}>
          {props.data.alamat}
        </Text>
        </View>
        <TouchableOpacity style={{
          justifyContent: 'center'
        }}>
        <SvgCss 
          xml={assets.buttonOpenDetailFL}
        />
        </TouchableOpacity>  
      </View>
    )
  }

  const KofirmKerjaRender = (props: any) => {
    const { data } = props;

    return(
      <View style={{
          backgroundColor: 'white',
          borderColor: 'rgba(229, 231, 235, 1)',
          borderRadius: 10,
          borderWidth: 1,
          marginBottom: 5,
          padding: 7,
          flexDirection: 'row',
          justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{
            fontSize: 14,
            fontWeight: '400',
            marginBottom: 4,
            color: '#4B5563'
          }}>
            {data.hari}
          </Text>
          <Text style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#4B5563'
          }}>
            {data.jam}
          </Text>
        </View>
        <TouchableOpacity style={{
          justifyContent: 'center'
        }}>
          <SvgCss 
            xml={assets.buttonOpenDetailFL}
          />
          </TouchableOpacity>
      </View>
    )
  }

  const AlertItem = () => {
    return(
      <View style={{
        backgroundColor: '#FEFCE8',
        borderWidth: 1,
        borderColor: '#EAB308',
        marginHorizontal: 14,
        borderRadius: 15,
        padding: 7,
        marginTop : 25,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5
        }}>
          <Text style={{
            color: '#374151',
            fontWeight: '700',
            fontSize: 16
          }}>
            {dataOngoing.id}
          </Text>
          <Text style={{
            color: '#52525B',
            fontSize: 14
          }}>
            {dataOngoing.tanggal}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginBottom: 5
        }}>
          <SvgCss
            xml={assets.onGoingAccount}
            color={'#EAB308'}
          />
          <Text style={{
            marginLeft: 10
          }}>
            {dataOngoing.nama}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
        <SvgCss
            xml={assets.onGoingHome}
            color={'#EAB308'}
          />
          <Text style={{
            marginLeft: 10
          }}>
            {dataOngoing.tanggal}
          </Text>
        </View>
      </View>
    )
  }

  const EmptyPage = (props: any) => {
    const {text} = props;

    return(
      <View style={{
        alignItems: 'center'
      }}>
        <Image 
          source={require('../assets/images/emptydashboard.png')}
          style={{
            width: width / 2,
            height: width / 2 / 1.02180685358,
            marginVertical: 11
          }}
        />
        <Text style={{
          fontSize: 14,
          color: '#52525B'
        }}>
          tidak ada data {text}
        </Text>
      </View>
    )
  }

  useEffect(() => {
    DashboardStore.load();
  }, [isFocused]);

  const { height, width } = useWindowDimensions();

  let heightx = (735 * width) / 1440;

  return (
    <>
      {/* <ImageBackground
        source={require("app/assets/images/bg_1flip.png")}
        resizeMode={"contain"}
        imageStyle={{
          top: 0,
          left: 0,
          width: width,
          height: heightx,
        }}> */}
        <ScrollView
          refreshControl={refreshControl}
          contentContainerStyle={{
            paddingBottom: 70,
          }}
          style={{
            backgroundColor: '#F3F4F6'
          }}
        >
          
          <View style={{
            padding: 0,
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            overflow: 'hidden'
          }}>
            <LinearGradient 
              colors={['#3B82F6', '#67E8F9']}
              style={{ 
                flexDirection: "column",
                
                opacity: 2,
                paddingBottom: heightx,
                paddingTop: StatusBar.currentHeight,
                paddingHorizontal: 10,
                zIndex: 999
              }}
              start={[0.0, 0.5]}
              end={[1.0, 0.5]}
              locations={[0.0, 1.0]}
              >
                <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <View style={{
              paddingTop: 5,
              paddingLeft: 6
            }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgba(239, 246, 255, 1)",
                  fontWeight: "700",
                  // marginTop: 10
                }}
              >
                Halo,{" "}
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                    color: "rgba(239, 246, 255, 1)",
                  }}
                >
                  James
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "rgba(239, 246, 255, 1)",
                  fontWeight: '400'
                }}
              >
                Selalu jaga protokol kesehatan ya.
              </Text>
            </View>
            {/* <View style={{
              flexGrow: 1,
              backgroundColor: 'yellow'
            }} /> */}
            <TouchableOpacity
              style={{
                // minWidth: 44,
                marginTop: 7,
                paddingHorizontal: 0,
                backgroundColor: 'none'
              }}
              onPress={() => nav.navigate("Inbox")}
            >
              <Icon
                name={"notifications-outline"}
                size={24}
                source={"Ionicons"}
                color={"rgba(239, 246, 255, 1)"}
              ></Icon>
            </TouchableOpacity>
            </View>
            
            </LinearGradient>
          </View>
          <Image 
              source={require('../assets/images/image_header.png')}
              style={{
                width: width / 1.3,
                height: width / 1.3 * 0.77021276595,
                marginTop: -(heightx / 1.03157894737)
              }}
            />
            
            
            {/* <BarCodeScanner onBarCodeScanned={(e:any)=>{
              alert(e.data);

            }}/> */}
            {/* <Button
              style={{
                backgroundColor: Theme.colors.primary + "00",
                minWidth: 44,
                margin: 0,
                paddingHorizontal: 0,
              }}
              onPress={() => nav.navigate("Setting")}
            >
              <Icon
                name={"md-settings"}
                size={24}
                color={"#000"}
              ></Icon>
            </Button>  */}

          {/* </View> */}
          {dataOngoing != null && <AlertItem />}
          
          <View style={{
            marginTop : dataOngoing != null ? 21 : 30,
            paddingHorizontal: 10,
            flex: 1
          }}> 
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <View style={{
                flexDirection: 'row'
              }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16
              }}>
                Pemeriksaan Selanjutnya
              </Text>
              {data.length != 0 && 
              <View style={{
                marginLeft: 3,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 19, 19, 1)',
                borderRadius: 999,
                height: 20,
                width: 20
              }}>
                <Text style={{
                  fontSize: 8 ,
                  color: '#FAFAFA'
                }}>
                  {data.length}
                </Text>
              </View>}
              </View>
              
              <TouchableOpacity>
                <Text>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </View>
            {data.length !=0 &&
              <FlatList 
              data={data.slice(0, 5)}
              renderItem={({ item }: any) =>  <PemeriksaanRender data={item}/>}
              style={{
                marginTop: 10,
              }}
            />
            }
            {
              data.length == 0 &&
              <EmptyPage text={'Pemeriksaan Selanjutnya'}/>
            }
            {data.length != 0 && <View style={{
              backgroundColor: 'rgba(209, 213, 219, 1)',
              height: 2,
              marginTop: 10
            }}></View>}
          </View>
          <View style={{
            flex: 1,
            marginTop: 20,
            paddingHorizontal: 10
          }}>
            <View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{
                  fontWeight: 'bold',
                  fontSize: 16
                }}>
                  Konfirmasi Hari Kerja
                </Text>
                {dataKerja.length != 0 && 
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 19, 19, 1)',
                  borderRadius: 999,
                  height: 20,
                  width: 20,
                  marginLeft: 3
                }}>
                  <Text style={{
                    fontSize: 8 ,
                    color: '#FAFAFA'
                  }}>
                  {dataKerja.length}
                </Text>
                 </View>}
                </View>
                <TouchableOpacity onPress={() => {
                  nav.navigate('AnalystDayWork')
                }}>
                  <Text>
                    Lihat Semua
                  </Text>
                </TouchableOpacity>          
              </View>
            </View>
            {dataKerja.length != 0 &&
            <FlatList 
              data={dataKerja.slice(0,5)}
              renderItem={({item}:any) => <KofirmKerjaRender data={item}/>}
              style={{
                marginTop: 10,
              }}
            />}
            {
              dataKerja.length == 0 && 
              <EmptyPage text={'Konfirmasi Hari Kerja'} />
            }          
          </View>
        </ScrollView>
    </>
  );
});
