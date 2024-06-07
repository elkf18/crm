import { IRoute, TStackProps } from "libs/routes";
import AppConfig from "app/config/app";
import SessionStore from "app/model/session";
import assests from "app/assets/images/icon/assets";

// Navigation Tab
export const TabInitialStack: TStackProps = {
  initialRouteName: "Dashboard",
  headerMode: "none",
};

export const Routes: IRoute[] =
  //AppConfig.mode!="dev"?
  AppConfig.mode == "Show All Menu"
    ? // !!AppConfig.mode?
      //VV Hide Product and SO
      [
        {
          title: "Beranda",
          name: "Dashboard",
          icon: { name: "ios-home" },
          component: require("app/pages/Dashboard").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pos_admin",
            "pos_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
        {
          title: "Pelanggan",
          name: "Customer",
          icon: { name: "md-people" },
          component: require("app/pages/Customer").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pos_admin",
            "pos_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
        {
          title: "Aktivitas",
          name: "Activity",
          icon: { name: "calendar" },
          component: require("app/pages/Activity").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
        {
          title: "Opportunity",
          name: "Opportunity",
          icon: { name: "signal", source: "FontAwesome" },
          component: require("app/pages/Opportunity").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
      ]
    : //DEV

      [
        {
          title: "Pesanan",
          name: "Order",
          imageIcon: {
            active: require("../assets/images/icon/order_active.png"),
            inActive: require("../assets/images/icon/order_in_active.png"),
          },
          component: require("app/pages/Order").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pos_admin",
            "pos_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
        {
          name: "Dashboard",
          imageIcon: require("app/assets/images/icon/mitra_diagnostic_1.png"),
          component: require("app/pages/Dashboard").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pos_admin",
            "pos_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },
        {
          title: "Akun",
          name: "Account",
          imageIcon: {
            active: require("../assets/images/icon/account_active.png"),
            inActive: require("../assets/images/icon/account_in_active.png"),
          },
          component: require("app/pages/Setting").default,
          roles: [
            "corp_admin",
            "corp_sales",
            "corp_corp_supervisor",
            "pro_admin",
            "pro_sales",
            "team_admin",
            "team_sales",
            "pro_supervisor",
            "corp_supervisor",
          ],
        },

        // {
        //   title: "Prospek",
        //   name: "Opportunity",
        //   icon: { name: "signal", source: "FontAwesome" },
        //   component: require("app/pages/Opportunity").default,
        //   roles: [
        //     "corp_admin",
        //     "corp_sales",
        //     "corp_corp_supervisor",
        //     "pro_admin",
        //     "pro_sales",
        //     "team_admin",
        //     "team_sales",
        //     "pro_supervisor",
        //     "corp_supervisor"
        //   ],
        // },

        // {
        //   title: "Penjualan",
        //   name: "AnalystDayWork",
        //   icon: { name: "ios-cart" },
        //   component: require("app/pages/AnalystDayWork").default,
        //   roles: [
        //     "corp_admin",
        //     "corp_sales",
        //     "corp_corp_supervisor",
        //     "pro_admin",
        //     "pro_sales",
        //     "team_admin",
        //     "team_sales",
        //     "pos_admin",
        //     "pos_sales",
        //     "pro_supervisor",
        //     "corp_supervisor"
        //   ],
        // },

        // {
        //   title: "Produk",
        //   name: "Product",
        //   icon: { name: "pricetags", size: 24 },
        //   component: require("app/pages/Product").default,
        //   roles: [
        //     "corp_admin",
        //     "corp_sales",
        //     "pro_admin",
        //     "pro_sales",
        //     "team_admin",
        //     "team_sales",
        //     "pos_admin",
        //     "pos_sales",
        //     "pro_supervisor",
        //     "corp_supervisor"
        //   ],
        // },
        // {
        //   title: "Cabang",
        //   name: "Cabang",
        //   icon: { name: "store-alt", source: "FontAwesome5", size: 24 },
        //   component: require("app/pages/Outlet").default,
        //   roles: ["corp_admin", "pro_admin", "pro_sales", "team_admin"],
        // },
        // {
        //   title: "Laporan",
        //   name: "Laporan",
        //   icon: { name: "newspaper", source: "Ionicons", size: 24 },
        //   component: require("app/pages/Report").default,
        //   roles: [
        //     "corp_admin",
        //     "corp_sales",
        //     "corp_corp_supervisor",
        //     "pro_admin",
        //     "pro_sales",
        //     "team_admin",
        //     "team_sales",
        //     "pos_admin",
        //     "pos_admin",
        //     "pro_supervisor",
        //     "corp_supervisor"
        //   ],
        // },
        // {
        //   title: "Pengguna",
        //   name: "Pengguna",
        //   icon: { name: "phone-portrait", source: "Ionicons", size: 24 },
        //   component: require("app/pages/UserAll").default,
        //   roles: [
        //     "corp_admin",
        //     "pro_admin",
        //     "team_admin",
        //   ],
        // },
        // {
        //   title: "Setting",
        //   name: "Pengaturan",
        //   icon: { name: "gear", source: "FontAwesome" },
        //   component: require("app/pages/Setting").default,
        //   roles: [
        //     "corp_admin",
        //     "corp_sales",
        //     "corp_corp_supervisor",
        //     "pro_admin",
        //     "pro_sales",
        //     "team_admin",
        //     "team_sales",
        //     "pro_supervisor",
        //     "corp_supervisor"
        //   ],
        // },
      ];

// if(SessionStore.package.id==1){
//   if(AppConfig.mode=="dev"){
//     TabRoutes.filter()
//   }
// }

export function TabRoutes(): IRoute[] {
  let filtered = Routes;

  // if(SessionStore.package.id==1){
  if (AppConfig.mode == "dev") {
    filtered = Routes.filter((item) => {
      let match = true;

      //  let f1 = item.name != "Cabang"

      //    match = !!f1;

      return match;
    });
    return filtered;
  }
  // }

  return filtered;
}
