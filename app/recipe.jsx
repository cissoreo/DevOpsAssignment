import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Checkbox, Modal, Portal, Button, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get( 'window' );
const { height } = Dimensions.get( 'window' );

const Recipe = ( { route, navigation } ) =>
{
   const foodRecipes = [
      {
         id: 1,
         name: 'Burger',
         status: 'Not Started',
         duration: '30 minutes',
         category: 'Italian',
         rating: 4.5,
         image: 'https://cdn0-production-images-kly.akamaized.net/GN-bl-db32TIEH92Ohu_xkRpBYk=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1578689/original/006940600_1493291455-Burger3.jpg',
         mealType: [ "Lunch", "Snack", "Savory" ],
         nutrition: {
            protein: 15.0,
            fats: 20.0,
            carbs: 30.0,
            calories: 450,
         },
         ingredients: [
            "Buns",
            "Burger patty",
            "Lettuce",
            "Tomato",
            "Cheese",
            "Condiments (ketchup, mustard)",
         ],
         steps: [
            'Toast the buns until golden brown.',
            'Cook the burger patty to desired doneness.',
            'Assemble the burger with lettuce, tomato, and cheese.',
            'Add condiments of choice and close with top bun.',
            'Serve immediately.'
         ],
         pictures: [
            'https://www.wikihow.com/images_en/thumb/2/22/Make-a-Hamburger-Step-7-Version-4.jpg/v4-460px-Make-a-Hamburger-Step-7-Version-4.jpg.webp',
            'https://www.wikihow.com/images_en/thumb/a/a6/Make-a-Hamburger-Step-8-Version-4.jpg/v4-460px-Make-a-Hamburger-Step-8-Version-4.jpg.webp',
            'https://www.wikihow.com/images_en/thumb/6/65/Make-a-Hamburger-Step-11-Version-3.jpg/v4-460px-Make-a-Hamburger-Step-11-Version-3.jpg.webp',
            'https://www.wikihow.com/images_en/thumb/4/45/Make-a-Hamburger-Step-9-Version-3.jpg/v4-460px-Make-a-Hamburger-Step-9-Version-3.jpg.webp',
            'https://www.wikihow.com/images/thumb/9/9a/Make-a-Hamburger-Step-12-Version-3.jpg/v4-728px-Make-a-Hamburger-Step-12-Version-3.jpg',
         ]
      },
      {
         id: 2,
         name: 'Chicken Teriyaki',
         status: 'Started',
         duration: '25 minutes',
         category: 'Japanese',
         rating: 4.7,
         image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-chicken-teriyaki-190%2Fchicken-teriyaki-190-171-horizontal',
         mealType: [ "Dinner", "Savory" ],
         nutrition: {
            protein: 25.0,
            fats: 10.0,
            carbs: 15.0,
            calories: 300,
         },
         ingredients: [
            "Chicken breast",
            "Teriyaki sauce",
            "Oil",
            "Sesame seeds",
            "Green onions",
            "Rice (optional)",
         ],
         steps: [
            'Marinate chicken in teriyaki sauce for 10 minutes.',
            'Heat oil in a pan and cook chicken until golden brown.',
            'Add more teriyaki sauce and simmer until thickened.',
            'Serve over rice and garnish with sesame seeds and green onions.'
         ],
         pictures: []
      },
      {
         id: 3,
         name: 'Caesar Salad',
         status: 'Not Started',
         duration: '15 minutes',
         category: 'Salad',
         rating: 4.3,
         image: 'https://www.noracooks.com/wp-content/uploads/2022/06/vegan-caesar-salad-4.jpg',
         mealType: [ "Lunch", "Appetizer", "Vegetarian" ],
         nutrition: {
            protein: 5.0,
            fats: 10.0,
            carbs: 5.0,
            calories: 120,
         },
         ingredients: [
            "Lettuce",
            "Caesar dressing",
            "Croutons",
            "Parmesan cheese",
         ],
         steps: [
            'Toss lettuce with Caesar dressing in a large bowl.',
            'Add croutons and sprinkle with Parmesan cheese.',
            'Serve immediately as a side or main dish.'
         ],
         pictures: []
      },
      {
         id: 4,
         name: 'Fried Rice',
         status: 'Started',
         duration: '20 minutes',
         category: 'Asian',
         rating: 4.2,
         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfrudnndkQGfMur6DFYYNrZ8fi1VQPq-wddA&s',
         mealType: [ "Lunch", "Dinner", "Savory" ],
         nutrition: {
            protein: 8.0,
            fats: 5.0,
            carbs: 40.0,
            calories: 350,
         },
         ingredients: [
            "Cooked rice",
            "Vegetable oil",
            "Garlic",
            "Onion",
            "Mixed vegetables",
            "Soy sauce",
            "Eggs",
            "Green onions",
         ],
         steps: [
            'Heat oil in a pan and sauté garlic and onions until fragrant.',
            'Add vegetables and stir-fry for 2-3 minutes.',
            'Add rice, soy sauce, and stir well.',
            'Push rice to the side, scramble eggs in the pan, then mix.',
            'Serve hot with green onions as garnish.'
         ],
         pictures: []
      },
      {
         id: 5,
         name: 'Nachos',
         status: 'Not Started',
         duration: '10 minutes',
         category: 'Mexican',
         rating: 4.6,
         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-c5KR2k6aTLIRMTw8osmImHIqxbUf9ciTw&s',
         mealType: [ "Snack", "Appetizer", "Savory" ],
         nutrition: {
            protein: 6.0,
            fats: 15.0,
            carbs: 30.0,
            calories: 270,
         },
         ingredients: [
            "Tortilla chips",
            "Cheese",
            "Beans",
            "Jalapeños",
            "Salsa",
            "Sour cream",
            "Guacamole",
         ],
         steps: [
            'Arrange tortilla chips on a plate or baking sheet.',
            'Sprinkle cheese and add toppings of choice (e.g., beans, jalapeños).',
            'Bake or microwave until cheese is melted.',
            'Add salsa, sour cream, and guacamole on top before serving.'
         ]
      },
      {
         id: 6,
         name: 'Tom Yum Soup',
         status: 'Not Started',
         duration: '40 minutes',
         category: 'Thai',
         rating: 4.4,
         image: 'https://i2.wp.com/seonkyounglongest.com/wp-content/uploads/2021/03/Tom-Yum-07-mini.jpg?fit=1000%2C667&ssl=1',
         mealType: [ "Lunch", "Dinner", "Spicy" ],
         nutrition: {
            protein: 4.0,
            fats: 2.0,
            carbs: 8.0,
            calories: 90,
         },
         ingredients: [
            "Water",
            "Lemongrass",
            "Galangal",
            "Kaffir lime leaves",
            "Mushrooms",
            "Tomatoes",
            "Chili paste",
            "Shrimp",
            "Fish sauce",
            "Lime juice",
            "Cilantro",
         ],
         steps: [
            'Bring water to a boil and add lemongrass, galangal, and kaffir lime leaves.',
            'Add mushrooms, tomatoes, and chili paste.',
            'Add shrimp and cook until they turn pink.',
            'Season with fish sauce and lime juice to taste.',
            'Serve hot and garnish with fresh cilantro.'
         ],
         pictures: []
      },
   ];


   const { id } = route.params;

   const recipe = foodRecipes.find( recipe => recipe.id === id );

   if ( !recipe )
   {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>Recipe not found</Text>
         </View>
      );
   }

   const [ currentStep, setCurrentStep ] = useState( 0 );
   const [ status, setStatus ] = useState( "None" );

   const progress = ( ( currentStep + 1 ) / recipe.steps.length ) * 100;

   const [ checkedIngredients, setCheckedIngredients ] = useState(
      recipe.ingredients.map( () => false )
   );

   const toggleCheckbox = ( index ) =>
   {
      const updatedChecked = [ ...checkedIngredients ];
      updatedChecked[ index ] = !updatedChecked[ index ];
      setCheckedIngredients( updatedChecked );
   };

   const handleStepChange = ( newIndex ) =>
   {
      setCurrentStep( newIndex );

      if ( newIndex === 0 )
      {
         setStatus( "None" );
      } else if ( newIndex < recipe.steps.length - 1 )
      {
         setStatus( "In Progress" );
      } else if ( newIndex === recipe.steps.length - 1 )
      {
         setStatus( "Done" );
      }
   };

   const handleShare = () =>
   {
      console.log( "Share button pressed" );
   };

   const [ visible, setVisible ] = useState( false );

   const showModal = () => setVisible( true );
   const hideModal = () => setVisible( false );

   return (
      <Provider>
         <ScrollView style={styles.container}>
            <View style={{}}>
               <Image source={{ uri: recipe.image }} style={styles.image} />
               <TouchableOpacity style={{
                  position: 'absolute',
                  top: 30,
                  left: 10,
                  padding: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 50,
               }} onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={28} color="#fff" />
               </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>

               <Text style={styles.title}>{recipe.name}</Text>
               <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                     <Text style={styles.statusLabel}>Status: </Text>
                     <Text style={styles.statusValue}>{currentStep === 0 ? "Not Started" : currentStep < recipe.steps.length - 1 ? "In Progress" : "Done"}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', columnGap: 1 }}>
                     <TouchableOpacity onPress={showModal} style={styles.iconButton}>
                        <Icon name="share" size={24} color="#28a745" />
                     </TouchableOpacity>
                     <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                           <Text style={styles.modalTitle}>Share</Text>
                           <View style={styles.shareOptions}>
                              <TouchableOpacity style={styles.shareButton}>
                                 <Icon name="link" size={40} color="#000" />
                                 <Text>Link</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.shareButton}>
                                 <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABWVBMVEVyHVFHcEx0Fvp8Fv1yFP1/FfyLCOyfBOmtAeS7AuDHAd3UANjZAs7rD6xyFvzjANTqAMHoA7l2F/yPFfx8GPmfD/zFF/XVWujoZuLyZt3pRt/yGdHyA8j1AKTViPj/9Pr////8g9f9A7r3DZz5vO794Pf+ruj9B6uzFPv7JLv+AJr+BI/+YMP/1vD+AIThG+n9GZn/vd3/YZz+AXP+GoT/r8r+AmT/b5z+HHH+I3f+G2P/ur7+FFD+Klb+fYv/wcr+LUf+LWX+AFn+Nzr+Ohz+RT7+inP+Si7/ztD+TxL/zbv+Wy//9fH+WgL+c1X+ZyX+PUv+Bzv+VXD+cxr/6eL+aQT+eAX+nDj+gwD+gxH+fSL+rYn+jwD+iwL+XhX/3rn/1bH9ZR/+lwP+nwH+xHH8ZC3+qAH+sAD+wAP+x1P+zGb+pl79mQn+uAD9J3T+ygD9O1n8pRL9twuaEkMNAAAAc3RSTlMBAF3G///////////GW9j//9nY/1r///////////7//////8b/////////////////////////////////////////////////////////////////////////////////xf///1v////////Y/9j/2VzGSus+GgAAAeNJREFUeAFFjEWiU0EQRc/tqu74V9wZ4TBiB6wG3wpzVoQ7zHCXeELypHH+KVchJAESaEs0IUv0Zv+7fwLgSAOk9ZFghcnfDw4AAg18cyhWCKNVob9NCZjQLWVrEGhJbJGDoCBpMwCrJTETAKBWgdeRGb4dmJW56PdI/KU1K4X15N+AFsW0+3/WVm7Pa0Pmu4Fh7HcbRIjMIhr3FItUGAH4SNZKjK32YjKpK3Iv0yUY0b8g0Vs0oK+8wbeyMBAQwVeo44R1z7XWq6rqpn5jiTmAeQO3iceg9zkYzKvc71iEmMFbqCJJ4tDcKFrLjX5D/MEdq8GpIUUgd/tgGboTgiUDPDZ44SXNpr0gWRcAgqEmEPJRNVPOxYaOth0oAHdCxWoOzslH+RCvlafYMgFUHvAIHoCjz16io80BrH/j0AAcJ9KWKkhn5sRyGjsDtr/sqyrsWNO1cW9/cDNLZgHLSzVvn+wMq9qbKKwy7TiIaKTW56pzW6Oa+N1OKEQdvvl2RyOE4DEOZurd1cHNeab27tyjOPfhFlucXP04ovF97B6jTOzdJwFLaNAff7N6c8incH1VpiSR67q2VgjzUU7JgbMTiQtFKmgAsCAuczlflmVZn7iGBFc1awB/p4tqUS3LDb8OPwBrSrZIO/KHZwAAAABJRU5ErkJggg=='}} style={{width: 40, height: 40, borderRadius: 50}}/>
                                 <Text>Instagram</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.shareButton}>
                                 <Image source={{ uri: 'https://c.pxhere.com/images/09/16/6a6365d0bdb9fbe20a752cb34a5f-1666078.jpg!d' }} style={styles.contactImage} />
                                 <Text>Contact 1</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.shareButton}>
                                 <Image source={{ uri: 'https://cdn0-production-images-kly.akamaized.net/P8l3PY4xehm3Bcc4KFgTnDmeyzQ=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4384931/original/046343700_1680736223-viavallen-06-04-2023-0001.jpg' }} style={styles.contactImage} />
                                 <Text>Contact 2</Text>
                              </TouchableOpacity>
                           </View>
                           <Button onPress={hideModal} style={styles.closeButton}>Close</Button>
                        </Modal>
                     </Portal>
                     <View style={[ styles.iconButton, { flexDirection: 'row', alignItems: 'center', columnGap: 3 } ]}>
                        <Icon name="star" size={24} color="#FFC107" />
                        <Text>5</Text>
                     </View>
                  </View>
               </View>

               <View style={styles.badgesWrapper}>
                  {recipe.mealType.map( ( type, index ) => (
                     <View key={index} style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{type}</Text>
                     </View>
                  ) )}
               </View>

               <View style={styles.nutritionContainer}>
                  {Object.entries( recipe.nutrition ).map( ( [ key, value ] ) => (
                     <View key={key} style={styles.nutritionBlock}>
                        <Text style={styles.nutritionValue}>{value}</Text>
                        <Text style={styles.nutritionLabel}>{key.charAt( 0 ).toUpperCase() + key.slice( 1 )}</Text>
                     </View>
                  ) )}
               </View>

               <Text style={styles.ingredientsTitle}>Ingredients</Text>
               <View style={styles.ingredientsContainer}>
                  {recipe.ingredients.map( ( ingredient, index ) => (
                     <View key={index} style={styles.ingredientRow}>
                        <Checkbox
                           status={checkedIngredients[ index ] ? 'checked' : 'unchecked'}
                           onPress={() => toggleCheckbox( index )}
                           color='#FFC107'
                        />
                        <Text style={styles.ingredientName}>{ingredient}</Text>
                     </View>
                  ) )}
               </View>

               <View style={styles.preparationContainer}>
                  <Text style={styles.preparationLabel}>Preparation time</Text>
                  <Text style={styles.preparationTime}>{recipe.duration}</Text>
               </View>

               <Text style={styles.stepsTitle}>Cooking Steps</Text>
               <View style={styles.progressContainer}>
                  <View style={[ styles.progressBar, { width: `${ progress }%` } ]} />
               </View>

               <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={( e ) =>
                  {
                     const xOffset = e.nativeEvent.contentOffset.x;
                     const newIndex = Math.round( xOffset / width );
                     handleStepChange( newIndex );
                  }}
               >
                  {recipe.steps.map( ( step, index ) => (
                     <View key={index} style={[ styles.step, { width: width - 40 } ]}>
                        <Text style={styles.stepNumber}>Step {index + 1}</Text>
                        <Text style={styles.stepDescription}>{step}</Text>
                        {recipe.pictures[ index ] && (
                           <Image
                              source={{ uri: recipe.pictures[ index ] }}
                              style={{ width: width - 40, height: height * 0.2, marginTop: 10 }}
                           />
                        )}
                     </View>
                  ) )}
               </ScrollView>
            </View>
         </ScrollView>
      </Provider>

   );
};

export default Recipe;

const styles = StyleSheet.create( {
   container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
   },
   image: {
      width: '100%',
      height: 400,
      resizeMode: 'cover',
   },
   detailsContainer: {
      padding: 20,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
   },
   statusLabel: {
      fontSize: 18,
      fontWeight: '600',
   },
   statusValue: {
      fontSize: 18,
      color: '#28a745',
   },
   iconButton: {
      marginLeft: 10,
   },
   badgesWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
   },
   badgeContainer: {
      backgroundColor: '#FFC107',
      borderRadius: 25,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 5,
      marginBottom: 5,
   },
   badgeText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
   },
   nutritionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
   },
   nutritionBlock: {
      alignItems: 'center',
      flex: 1,
   },
   nutritionValue: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   nutritionLabel: {
      fontSize: 14,
      color: '#888',
   },
   ingredientsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   ingredientsContainer: {
      flexDirection: 'column',
   },
   ingredientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
   },
   ingredientName: {
      marginLeft: 8,
      fontSize: 16,
   },
   ingredientItem: {
      alignItems: 'center',
   },
   ingredientImage: {
      width: 50,
      height: 50,
      marginBottom: 5,
   },
   preparationContainer: {
      alignItems: 'center',
      marginTop: 10,
   },
   preparationLabel: {
      fontSize: 16,
      fontWeight: '600',
   },
   preparationTime: {
      fontSize: 16,
      fontStyle: 'italic',
   },
   stepsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
   },
   progressContainer: {
      height: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
      marginVertical: 10,
   },
   progressBar: {
      height: '100%',
      backgroundColor: '#FFC107',
      borderRadius: 5,
   },
   step: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFF5CC',
      borderRadius: 15,
      marginHorizontal: 0,
      marginVertical: 15,
   },
   stepNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFCC00',
      textAlign: 'center',
   },
   stepDescription: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 5,
   },
   modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 10,
   },
   modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
   },
   shareOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      backgroundColor: 'white',
   },
   shareButton: {
      alignItems: 'center',
      marginHorizontal: 10,
   },
   contactImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 5,
   },
   closeButton: {
      alignSelf: 'center',
   },
} );