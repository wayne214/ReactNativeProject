/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Linking
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  NavigationContainer
} from '@react-navigation/native'
import {
  createStackNavigator
} from '@react-navigation/stack'
import { from } from 'rxjs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import HomeIconActive from './images/icon_home_active.png'
import HomeIconNormal from './images/icon_home_normal.png'
import WorkIconActive from './images/icon_work_active.png'
import WorkIconNormal from './images/icon_work_normal.png'


const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SettingScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail', {itemId: 88, otherParam: 'anything you want here'})}
      />
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail', {itemId: 66, otherParam: 'anything you want here'})}
      />
    </View>
  )
}

const DetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>DetailScreen: {itemId} {otherParam}</Text>
      <Button
        title="Go to Detail Again"
        // onPress={() => navigation.navigate('Detail')}
        onPress={() => navigation.push('Detail', {itemId: 99, otherParam: 'anything you want here'})}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
}

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  )
}

// 首页的路由栈
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: '首页'
      }} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  )
}
// 设置的路由栈
const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={SettingsScreen} options={{
        title: '设置'
      }} />
      <SettingStack.Screen name="Detail" component={DetailScreen} />
    </SettingStack.Navigator>
  )
}

function IconWithBadge({ icon, badgeCount, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Image source={icon} style={{
        width: size,
        height: size
      }} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
}

const TabScreen = () => {
  return (
    <Tab.Navigator 
    headerMode='none' 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return (
            <HomeIconWithBadge
              icon={
                focused
                  ? HomeIconActive
                  : HomeIconNormal
              }
              size={size}
              color={color}
            />
          );
        } else if (route.name === 'Settings') {
          return (
            <Image
              source={focused ? WorkIconActive : WorkIconNormal}
              style={{width: size, height: size}}
            />
          );
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

let islogin = true

const rootRouteScreen = () => {
  return (<RootStack.Navigator initialRouteName={'TabNav'}>
          <RootStack.Screen name='TabNav' component={TabScreen} />
          <RootStack.Screen name="Detail" component={DetailScreen} />
         </RootStack.Navigator>
  )
}

// const App = () => {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator initialRouteName={'TabNav'}>
//         <RootStack.Screen name='TabNav' component={TabScreen} />
//         <RootStack.Screen name="Detail" component={DetailScreen} />
//         <RootStack.Screen name='Drawer' component={DrawerStack}/>
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

const CustomDrawerContent = (props) => {
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Detail',{
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />
    </DrawerContentScrollView>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
        drawerType='slide'
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name='root' component={rootRouteScreen} />
        <Drawer.Screen name='Setting' component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//        {/* <ScrollView>
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView> */}
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
