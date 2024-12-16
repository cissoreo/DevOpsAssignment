import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image, FlatList, ImageBackground, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const categories = [
   { name: 'Fast Food', image: require( '../assets/images/fastFood.jpg' ) },
   { name: 'Japanese', image: require( '../assets/images/japanese.jpg' ) },
   { name: 'Chicken', image: require( '../assets/images/chicken.jpg' ) },
   { name: 'Rice', image: require( '../assets/images/rice.jpg' ) },
   { name: 'Snacks', image: require( '../assets/images/snacks.jpg' ) },
];

const banners = [
   require( '../assets/images/cookingBanner.jpg' ),
   require( '../assets/images/cookingBanner2.jpg' ),
   require( '../assets/images/cookingBanner3.jpg' ),
];

const dupbanners = [
   ...banners.slice( -1 ),
   ...banners,
   ...banners.slice( 0, 1 ),
];

const foodRecipes = [
   { id: 1, name: 'Burger', status: 'Not Started', duration: '30 minutes', category: 'Italian', rating: 4.5, image: 'https://cdn0-production-images-kly.akamaized.net/GN-bl-db32TIEH92Ohu_xkRpBYk=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1578689/original/006940600_1493291455-Burger3.jpg' },
   { id: 2, name: 'Chicken Teriyaki', status: 'Started', duration: '25 minutes', category: 'Japanese', rating: 4.7, image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-chicken-teriyaki-190%2Fchicken-teriyaki-190-171-horizontal' },
   { id: 3, name: 'Caesar Salad', status: 'Not Started', duration: '15 minutes', category: 'Salad', rating: 4.3, image: 'https://www.noracooks.com/wp-content/uploads/2022/06/vegan-caesar-salad-4.jpg' },
   { id: 4, name: 'Fried Rice', status: 'Started', duration: '20 minutes', category: 'Asian', rating: 4.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfrudnndkQGfMur6DFYYNrZ8fi1VQPq-wddA&s' },
   { id: 5, name: 'Nachos', status: 'Not Started', duration: '10 minutes', category: 'Mexican', rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-c5KR2k6aTLIRMTw8osmImHIqxbUf9ciTw&s' },
   { id: 6, name: 'Tom Yum Soup', status: 'Not Started', duration: '40 minutes', category: 'Thai', rating: 4.4, image: 'https://i2.wp.com/seonkyounglongest.com/wp-content/uploads/2021/03/Tom-Yum-07-mini.jpg?fit=1000%2C667&ssl=1' },
];



const Home = () =>
{
   const bannerRef = useRef( null );
   const windowWidth = Dimensions.get( 'window' ).width;
   const originalDataLength = banners.length;
   const [ currentBanner, setCurrentBanner ] = useState( 1 );

   useEffect( () =>
   {
      if ( bannerRef.current )
      {
         bannerRef.current.scrollToOffset( { offset: windowWidth, animated: false } );
      }
   }, [] );

   const handleScrollEnd = ( event ) =>
   {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round( offsetX / windowWidth );

      if ( index === 0 )
      {
         bannerRef.current.scrollToOffset( { offset: originalDataLength * windowWidth, animated: false } );
         setCurrentBanner( originalDataLength );
      } else if ( index === dupbanners.length - 1 )
      {
         bannerRef.current.scrollToOffset( { offset: windowWidth, animated: false } );
         setCurrentBanner( 1 );
      } else
      {
         setCurrentBanner( index );
      }
   };

   const navigation = useNavigation();

   return (
      <ScrollView style={styles.container}>
         <SafeAreaView>
            <View style={styles.headerContainer}>
               <View style={styles.header}>
                  <Image
                     source={require( '../assets/images/provider1.jpg' )}
                     style={styles.profileImage}
                  />

                  <View style={styles.greetingContainer}>
                     <Text style={styles.greetingText}>Hi! Alexis,</Text>
                     <Text style={styles.greetingSubtitle}>What do you want to cook today?</Text>
                  </View>

                  <TouchableOpacity>
                     <Icon name="notifications" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 6 }}>
                     <Icon name="bookmark" size={24} color="white" />
                  </TouchableOpacity>
               </View>

               <View style={styles.searchContainer}>
                  <Image
                     source={require( '../assets/icons/search.png' )}
                     style={styles.icon}
                  />
                  <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={'grey'} />
               </View>
            </View>
         </SafeAreaView>


         <View style={styles.bannerContainer}>
            <FlatList
               ref={bannerRef}
               data={dupbanners}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               keyExtractor={( item, index ) => index.toString()}
               renderItem={( { item } ) => (
                  <Image source={item} style={[ styles.bannerImage, { width: windowWidth } ]} />
               )}
               onMomentumScrollEnd={handleScrollEnd}
            />
            <View style={styles.dotsContainer}>
               {banners.map( ( _, i ) => (
                  <View
                     key={i}
                     style={[
                        styles.dot,
                        i + 1 === currentBanner ? styles.activeDot : null,
                     ]}
                  />
               ) )}
            </View>
         </View>

         <View style={styles.serviceSection}>
            <Text style={styles.sectionTitle}>What services do you need?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
               {categories.map( ( category, index ) => (
                  <ImageBackground key={index} source={category.image} style={styles.categoryItem} imageStyle={styles.categoryImage}>
                     <View style={styles.overlay}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                     </View>
                  </ImageBackground>
               ) )}
            </ScrollView>
         </View>

         <View style={{ width: '100%' }}>
            {/* Favorite Restaurants Section */}
            <View style={styles.restaurantSection}>
               <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Favorite Restaurants</Text>
                  <TouchableOpacity>
                     <Text style={styles.seeAll}>See all</Text>
                  </TouchableOpacity>
               </View>

               <FlatList
                  data={foodRecipes}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={( item, index ) => index.toString()}
                  renderItem={( { item } ) => (
                     <View style={styles.restaurantCard}>
                        <TouchableOpacity onPress={()=> {navigation.navigate('detail', {id:item.id})}}>
                           <Image source={{ uri: item.image }} style={styles.restaurantImage} />

                           <View
                              style={[
                                 styles.statusLabel,
                                 item.status === 'Started' && styles.startedStatus,
                              ]}
                           >
                              <Text style={styles.statusLabelText}>{item.status}</Text>
                           </View>

                           <View style={styles.restaurantInfo}>
                              <Text style={styles.restaurantName}>{item.name}</Text>
                              <Text style={styles.rating}>⭐ {item.rating}</Text>
                              <Text style={styles.category}>{item.category}</Text>
                              <Text style={styles.duration}>Duration: {item.duration}</Text>
                           </View>
                        </TouchableOpacity>
                     </View>
                  )}
                  contentContainerStyle={styles.restaurantListContainer}
               />


            </View>
         </View>
      </ScrollView>
   );
};

export default Home;

const styles = StyleSheet.create( {
   container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
   },
   headerContainer: {
      backgroundColor: '#fc9f16',
      borderBottomLeftRadius: 15,
      paddingBottom: 20,
      borderBottomRightRadius: 15,
      paddingTop: 30,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      alignItems: 'center',
   },
   profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
   },
   greetingContainer: {
      flex: 1,
   },
   greetingText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      paddingLeft: 4,
   },
   greetingSubtitle: {
      fontSize: 14,
      color: '#fff',
      paddingLeft: 4,
   },
   headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 2,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 7,
   },
   searchInput: {
      flex: 1,
      fontSize: 14,
      color: '#000',
      paddingLeft: 5,
   },
   bannerContainer: {
      height: 200,
      marginTop: 20,
      paddingBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,

   },
   bannerImage: {
      height: '100%',
      resizeMode: 'cover',
   },
   dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0.10,
      width: '100%',
   },
   dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: '#b3b3b3',
      marginHorizontal: 4,
   },
   activeDot: {
      backgroundColor: '#fc9f16',
   },
   serviceSection: {
      paddingHorizontal: 20,
      marginTop: 14,
   },
   sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
   },
   categoryList: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 0,
   },
   categoryItem: {
      width: 140,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderRadius: 30,
      overflow: 'hidden',
   },
   categoryImage: {
      borderRadius: 30,
   },
   overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   categoryText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
   },
   providersSection: {
      paddingHorizontal: 20,
      marginTop: 20,
   },
   providersHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
   },
   seeAllText: {
      color: '#00aaff',
      fontSize: 14,
   },
   icon: {
      height: 24,
      width: 24,
   },
   container: { flex: 1, backgroundColor: '#FFFFFF' },

   // Favorite Restaurants Section
   restaurantSection: { paddingVertical: 20 },
   sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
   },
   sectionTitle: { fontSize: 18, fontWeight: 'bold' },
   seeAll: { color: '#FF6D00', fontWeight: 'bold' },
   restaurantListContainer: {
      paddingHorizontal: 10,
      paddingTop: 10,
   },
   restaurantCard: {
      flex: 1,
      backgroundColor: '#FFF',
      borderRadius: 15,
      margin: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 2,
   },
   restaurantImage: { width: '100%', height: 100, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
   restaurantInfo: { padding: 10 },
   restaurantName: { fontSize: 14, fontWeight: 'bold' },
   rating: { fontSize: 12, color: '#FF6D00', marginTop: 2 },
   category: { fontSize: 12, color: 'gray', marginTop: 2 },
   statusLabel: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#FF6D00',
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: 5,
      alignItems: 'center',
   },
   startedStatus: {
      backgroundColor: 'green',
   },
   statusLabelText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
   },
   duration: {
      fontSize: 13,
      color: 'grey'
   }

} );