import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabsRoot = () => 
{
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarStyle: {
               paddingTop:9,
               backgroundColor: '#FF6D00',
               borderTopLeftRadius: 14,
               borderTopRightRadius: 14,
               height: 60
            },
         }}
         initialRouteName="index"
      >
         <Tabs.Screen
            name="index"
            options={{
               title: '',
               tabBarIcon: ( { color } ) => <FontAwesome size={32} name="home" color={color} />,
               headerShown: false
            }}
         />
         <Tabs.Screen
            name="saved"
            options={{
               title: '',
               tabBarIcon: ( { color } ) => <FontAwesome size={28} name="list" color={color} />,
               headerShown: false
            }}
         />
      </Tabs>
   );
};

export default TabsRoot;