import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import EmptyList from "app/ui/utils/EmptyList";
import Fab from "app/ui/utils/Fab";
import Filter from "app/ui/utils/Filter";
import SalesStore, { Sales } from "app/model/sales";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Dimensions, RefreshControl } from "react-native";
import RenderItem from "../ui/so/RenderItem";
import MainTopBar from "app/ui/utils/MainTopBar";
import { Button, Checkbox, FlatList, Text, View } from "libs/ui";
import SessionStore from "app/model/session";
import { useLocalObservable } from "mobx-react";
import { action, runInAction, values } from "mobx";
import CustomDetailItem from "../ui/utils/DetailItemHorizontal";
import Activity from "./Activity";
import ActivityStore from "app/model/activity";
import TopBar from "app/ui/utils/TopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const NavigationTab = createMaterialTopTabNavigator()
import GroupTab from "app/ui/utils/GroupTab";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgCss } from "react-native-svg";
import assets from "app/assets/images/icon/assets";
import { lte } from "lodash";
import AnalystStore, { AnalystRepository } from "app/model/analyst";
import { dateFormat } from "libs/utils/date";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [ data, setData ]= useState([0])
  
  // useEffect(() => {
  //   onRefresh();
  // }, [SalesStore.filter.date,SalesStore.filter.search,]);

  const Confirm = observer(() => {
    const isFocus = useIsFocused(); 

    useEffect(() => {
      refresh();
    }, [isFocus])

    const refresh = async () => {
      runInAction(() => {
        metaConfirm.offset = 0
        AnalystStore.loadConfirmed(metaConfirm.offset)
        metaConfirm.dataId = []
      })
    }

    const metaConfirm = useLocalObservable(() => ({
      offset: 0,
      checkBoxStatus: false,
      dataId: [0]
    }))

    const handleStatusList = action((id: number) => {
        runInAction(() => {
          if(metaConfirm.dataId.includes(id)) {
            metaConfirm.dataId = metaConfirm.dataId.filter(item => item !== id)
          } else {
            metaConfirm.dataId.push(id)
          }
        
          if(metaConfirm.dataId.length == 0) {
            metaConfirm.checkBoxStatus = false
          } else if(metaConfirm.dataId.length == AnalystStore.listWorkDay.length) {
            metaConfirm.checkBoxStatus = true
          } else {
            metaConfirm.checkBoxStatus = false
          }
        })
    })

    const refreshControl = (
      <RefreshControl refreshing={AnalystStore.loading} onRefresh={refresh} />
    );

    const NewComponent = observer((props: any)=> {
      const { data } = props;
      const getDayName = (date: string) => {
        const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'kamis', 'Jumat', 'Sabtu'];
        const dateTime = new Date(date)
        const dayName = day[dateTime.getDay()]
  
        return dayName
      }
  
      return(
        <TouchableOpacity style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          padding: 9,
          borderRadius: 10,
          marginBottom: 7
        }}
          onPress={() => {
            handleStatusList(data.id)
          }}
        >
          <View>
            <Text style={{
              fontWeight: '700',
              fontSize: 14,
              color: '#4B5563'
            }}>
              {getDayName(data.hari_kerja)}, {dateFormat(data.hari_kerja, "dd MMM yyyy")} 
            </Text>
            <Text style={{
              fontWeight: '400',
              fontSize: 14,
              color: '#4B5563'
            }}>
              {data.jam_mulai_kerja.slice(0, 5)} - {data.jam_selesai_kerja.slice(0, 5)}
            </Text>
          </View>
          {metaConfirm.dataId.includes(data.id)  &&
          <View style={{
            justifyContent: 'center',
          }}>
              <SvgCss 
              xml={assets.selectedList}   
              />
          </View>         
          }     
        </TouchableOpacity>
      )
    })

    const handleCheckBox = (value: boolean) => {
      runInAction(() => {
        metaConfirm.checkBoxStatus = value

        if(value) {
          for(var i of AnalystStore.listWorkDay) {
            metaConfirm.dataId.push(i.id) 
          }
        } else {
          metaConfirm.dataId = []
        }
      })   
    }

    return(
      <View style={{
        flex: 1,
        backgroundColor: '#F4F4F5',
        paddingHorizontal: 8,
        paddingVertical: 9
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 9
        }}>
        <Checkbox 
        isChecked={metaConfirm.checkBoxStatus}
        onChangeValue={(value) => handleCheckBox(value)} 
        />
        <Text style={{
          marginBottom: 3,
          marginLeft : -9
        }}>
          Pilih semua 
        </Text>
        </View>
        
        <FlatList
          refreshControl={refreshControl}
          data={AnalystStore.listWorkDay}
          renderItem={({item}: any) => <NewComponent data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{
            marginBottom: 9
          }}
          onEndReached={()=>{
            if(!AnalystStore.loading) {
              runInAction(() => {
                metaConfirm.offset = AnalystStore.listWorkDay.length
              })
              AnalystStore.loadConfirmed(metaConfirm.offset)
            }
          }}
          onEndReachedThreshold={5}
        />
        <View style={{
          flexDirection: 'row'
        }}>
          <Button style={{
            flex: 1,
            borderRadius: 40,
            backgroundColor: '#DC2626',
          }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '400'
            }}>
              Tolak
            </Text>
          </Button>
          <Button style={{
            flex: 1,
            borderRadius: 40,
            backgroundColor: '#1D4ED8',
          }}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '400'
            }}>
              Setujui
            </Text>
          </Button>
        </View>
      </View>
    )
  })

  const Approve = () => {
    const isFocus = useIsFocused(); 

    useEffect(() => {
      refresh();
    }, [isFocus])

    const refresh = async () => {
      runInAction(() => {
        metaApprove.offset = 0
        AnalystStore.loadApproved(metaApprove.offset)
      })
    }

    const metaApprove = useLocalObservable(() => ({
      offset: 0,
    }))

    const refreshControl = (
      <RefreshControl refreshing={AnalystStore.loading} onRefresh={refresh} />
    );

    const NewComponent = observer((props: any)=> {
      const { data } = props;
      const getDayName = (date: string) => {
        const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'kamis', 'Jumat', 'Sabtu'];
        const dateTime = new Date(date)
        const dayName = day[dateTime.getDay()]
  
        return dayName
      }
  
      return(
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          padding: 9,
          borderRadius: 10,
          marginBottom: 7
        }}
        >
          <View>
            <Text style={{
              fontWeight: '700',
              fontSize: 14,
              color: '#4B5563'
            }}>
              {getDayName(data.hari_kerja)}, {dateFormat(data.hari_kerja, "dd MMM yyyy")} 
            </Text>
            <Text style={{
              fontWeight: '400',
              fontSize: 14,
              color: '#4B5563'
            }}>
              {data.jam_mulai_kerja.slice(0, 5)} - {data.jam_selesai_kerja.slice(0, 5)}
            </Text>
          </View>    
        </View>
      )
    })

    return(
      <View style={{
        flex: 1,
        backgroundColor: '#F4F4F5',
        paddingHorizontal: 8,
        paddingVertical: 9
      }}>
      
        <FlatList
          refreshControl={refreshControl}
          data={AnalystStore.listWorkDayApproved}
          renderItem={({item}: any) => <NewComponent data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{
            marginBottom: 9
          }}
          onEndReached={()=>{
            if(!AnalystStore.loading) {
              runInAction(() => {
                metaApprove.offset = AnalystStore.listWorkDayApproved.length
              })
              AnalystStore.loadApproved(metaApprove.offset)
            }
          }}
          onEndReachedThreshold={5}
        />
      </View>
    )
  }

  const Tab = [
    {
      label: "Konfirmasi",
      component: Confirm,
    },
    {
      label: "Disetujui",
      component: Approve,
    },
  ];

  

  const onRefresh = async () => {
    runInAction(()=>{
      // SalesStore.list = [] as Sales[];
      // meta.offset=0
      // SalesStore.loadMore(meta.offset);
    })
  };

  // const meta = useLocalObservable(() => ({
  //   offset:0,
  //   isLoading:false,
  //   lastPage:false,

  //   stausCheckBox: false
  // }));
  const loadMore = () => {
    // SalesStore.loadMore(meta.offset);
  };

  const footer = () => {
    return (
      <View 
      style={{
        padding:8,
        width:"100%"
      }}
      >
        {/* {SalesStore.lastPage && SalesStore.LoadedList.length!==0 &&
          <View
          style={{
            height:2,
            width:"100%",
            backgroundColor:"#777777"
          }}
          />
        } */}

      {SalesStore.loading &&
          <Text
          style={{
            width:"100%",
            textAlign:"center"
          }}
          >
            Sedang memuat
          </Text>
        }


      </View>
    );
  };

  

  const refreshControl = (
    <RefreshControl refreshing={SalesStore.loading} onRefresh={onRefresh} />
  );

  return (
    <View style={{
      flex: 1
    }}>
      <TopBar title={'Konfirmasi Hari Kerja'} hiddenBack={true}/>
      <NavigationTab.Navigator
        initialRouteName={Tab[0].label}
        tabBar={(props) => <GroupTab tabs={Tab} {...props} />}
        tabBarPosition={"top"}
        swipeEnabled={true}
        style={{
          backgroundColor: '#F4F4F5',
        }}
      >
        {Tab.map((tab, key) => (
          <NavigationTab.Screen
            key={key}
            name={tab.label}
            {...tab}
          />
        ))}
      </NavigationTab.Navigator>
      {/* <Filter filter={SalesStore.filter} /> */}

      {/* <View
      style={{
        marginHorizontal:8
      }}>
        <CustomDetailItem label={"Jumlah SO"} value={SalesStore.list.length} />
      </View> */}
      
      {/* <FlatList
        refreshControl={refreshControl}
        data={SalesStore.LoadedList}
        renderItem={({ item }: any) => {
          return <RenderItem item={item} />;
        }}
        keyExtractor={(item: any) => String(item.id)}
        ListEmptyComponent={
          <EmptyList text={"Maaf untuk saat ini, tidak ada data penjualan."} />
        }
        ListFooterComponent={footer}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        onEndReached={
          ()=>{
            if(!SalesStore.loading){
              meta.offset = SalesStore.list.length
              loadMore()
            }
          }
        }    
      /> */}
      
    </View>
  );
});
