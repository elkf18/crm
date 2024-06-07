import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import EmptyList from "app/ui/utils/EmptyList";
import Fab from "app/ui/utils/Fab";
import Filter from "app/ui/utils/Filter";
import SalesStore, { Sales } from "app/model/sales";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, RefreshControl } from "react-native";
import RenderItem from "../ui/order/renderitem";
import MainTopBar from "app/ui/utils/MainTopBar";
import { Button, Checkbox, FlatList, Text, View } from "libs/ui";
import SessionStore from "app/model/session";
import { useLocalObservable } from "mobx-react";
import { runInAction } from "mobx";
import CustomDetailItem from "../ui/utils/DetailItemHorizontal";
import Activity from "./Activity";
import ActivityStore from "app/model/activity";
import TopBar from "app/ui/utils/TopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const NavigationTab = createMaterialTopTabNavigator()
import { SvgCss } from "react-native-svg";
import assets from "app/assets/images/icon/assets";
import { lte } from "lodash";
import fonts from "app/assets/fonts";
import Fonts from "libs/assets/fonts";
import TabList from "app/ui/order/TabList";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const Progress = observer(() => {
    const isFocused = useIsFocused()

    useEffect(() => {
      onRefresh()
    }, [SalesStore.filter.search,SalesStore.filter.date, isFocused])

    const onRefresh = async () => {
      runInAction(()=>{
        metaProgress.offset=0
        SalesStore.loadMore(metaProgress.offset);
      })
    };

    const metaProgress = useLocalObservable(() => ({
      offset:0,
      isLoading:false,
      lastPage:false,
    }));
  
    
    const loadMore = () => {
      SalesStore.loadMore(metaProgress.offset);
    };

    const refreshControl = (
    <RefreshControl refreshing={SalesStore.loading} onRefresh={onRefresh} />
    );

    return(
      <View style={{
        flex: 1,
        backgroundColor: '#F4F4F5',
        paddingHorizontal: 8,
        paddingVertical: 9
      }}>
        <FlatList
          refreshControl={refreshControl}
          data={SalesStore.list.filter(data => data.status != 'complete')}
          renderItem={({item}: any) => <RenderItem data={item}/>}
          keyExtractor={(item) => String(item.id)}
          style={{
            marginBottom: 15,
          }}
          onEndReached={()=> {
            if(!SalesStore.loading){
              metaProgress.offset = SalesStore.list.length
              loadMore()
            }
          }}
        />
      </View>
    )
  })

  const Done = () => {
    const isFocused = useIsFocused()

    useEffect(() => {
      onRefresh()
    }, [SalesStore.filter.search,SalesStore.filter.date, isFocused])

    const onRefresh = async () => {
      runInAction(()=>{
        meta.offset=0
        SalesStore.loadMore(meta.offset);
      })
    };

    const meta = useLocalObservable(() => ({
      offset:0,
      isLoading:false,
      lastPage:false,
    }));
  
    
    const loadMore = () => {
      SalesStore.loadMore(meta.offset);
    };

    const refreshControl = (
    <RefreshControl refreshing={SalesStore.loading} onRefresh={onRefresh} />
    );

    return(
        <View style={{
            flex: 1,
            backgroundColor: '#F4F4F5',
            paddingHorizontal: 8,
            paddingVertical: 9
          }}>
            <FlatList
              refreshControl={refreshControl}
              data={SalesStore.list}
              renderItem={({item}: any) => <RenderItem data={item}/>}
              keyExtractor={(item) => String(item.id)}
              style={{
                marginBottom: 15,
              }}
              onEndReached={()=> {
                if(!SalesStore.loading){
                  meta.offset = SalesStore.list.length
                  loadMore()
                }
              }}
            />
          </View>
    )
  }

  const Tab = [
    {
      label: "Progress",
      component: Progress,
      totalData: 4
    },
    {
      label: "Selesai",
      component: Done,
      totalData: 4
    },
  ];

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

  

  // const refreshControl = (
  //   <RefreshControl refreshing={SalesStore.loading} onRefresh={onRefresh} />
  // );

  return (
    <View style={{
      flex: 1
    }}>
      {/* <MainTopBar /> */}
      <NavigationTab.Navigator
        initialRouteName={Tab[0].label}
        tabBar={(props) => <TabList tabs={Tab} {...props} />}
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
