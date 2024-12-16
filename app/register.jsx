import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';

const loginSchema = yup.object( {
   email: yup.string().email( 'Email tidak valid' ).required( 'Email wajib diisi' ),
   password: yup.string().min( 6, 'Password minimal 6 karakter' ).required( 'Password wajib diisi' )
} ).required();

export default function RegisterScreen ()
{
   const { control, handleSubmit, formState: { errors } } = useForm( {
      resolver: yupResolver( loginSchema )
   } );

   const onSubmit = data =>
   {
      console.warn( data );
   };

   return (
      <View style={styles.container}>
         <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/76/19/ef/7619ef4dfcf7382aab410d57e796ffbf.jpg' }} style={styles.containerPhoto}>
            <View style={styles.overlay} /> 
         </ImageBackground>
         <View style={styles.containerBody}>
            <Controller
               control={control}
               name="email"
               render={( { field: { onChange, onBlur, value } } ) => (
                  <View>
                     <Text style={styles.email}>Email</Text>
                     <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                     />
                     {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                  </View>
               )}
            />
            <Controller
               control={control}
               name="username"
               render={( { field: { onChange, onBlur, value } } ) => (
                  <View>
                     <Text style={styles.email}>Username</Text>
                     <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                     />
                  </View>
               )}
            />
            <Controller
               control={control}
               name="password"
               render={( { field: { onChange, onBlur, value } } ) => (
                  <View>
                     <Text style={styles.password}>Password</Text>
                     <TextInput
                        style={styles.input}
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                     />
                     {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
                  </View>
               )}
            />
            <TouchableOpacity
               onPress={()=>router.replace( '(tabs)' )}
               style={styles.buttonSignIn}>
               <Text style={styles.textSignIn}>
                  Sign Up
               </Text>
            </TouchableOpacity>
            <Text style={styles.or}>
               Or
            </Text>
            <View style={styles.logoGoogleAppleFacebookContainer}>
               <TouchableOpacity style={styles.googleContainer}>
                  <Image
                     source={require( '../assets/googleLogo.png' )}
                     style={styles.logoGoogle} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.googleContainer}>
                  <Image
                     source={require( '../assets/appleLogo.png' )}
                     style={styles.logoGoogle} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.googleContainer}>
                  <Image
                     source={require( '../assets/facebookLogo.png' )}
                     style={styles.logoGoogle} />
               </TouchableOpacity>
            </View>

            <View style={styles.donthaveSignUpContainer}>
               <Text style={styles.donthave}>
                  Already have an account?
               </Text>
               <TouchableOpacity
                  style={styles.buttonSignUp}
                  onPress={() => router.back()}
               >
                  <Text style={styles.textsignUp}> Sign In</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create( {
   container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
   },
   containerPhoto: {
      flex: 2,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
   },
   overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
   },
   loginPhoto: {
      width: '60%',
      height: '60%'
   },
   containerBody: {
      backgroundColor: 'white',
      flex: 3,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 22,
      paddingTop: 32,
   },
   input: {
      color: 'black',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 8,
      borderRadius: 12,
   },
   buttonSignIn: {
      backgroundColor: '#FF6D00',
      paddingVertical: 16,
      borderRadius: 12,
      marginVertical: 18,
   },
   textSignIn: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
   },
   error: {
      color: 'red',
   },
   email: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
   },
   password: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16
   },
   forgotPass: {
      color: 'black',
      fontSize: 12,
      textAlign: 'right'
   },
   or: {
      color: 'black',
      fontWeight: '500',
      fontSize: 16,
      textAlign: 'center'
   },
   logoGoogleAppleFacebookContainer: {
      flexDirection: 'row',
      columnGap: 10
   },
   googleContainer: {
      paddingVertical: 14,
      backgroundColor: '#ececec',
      marginVertical: 18,
      borderRadius: 12,
      flex: 1,

   },
   logoGoogle: {
      width: 24,
      height: 24,
      alignSelf: 'center'
   },
   donthaveSignUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
   },
   donthave: {
      color: 'black',
      fontWeight: '500',
      fontSize: 14
   },
   textsignUp: {
      color: '#FF6D00',
      fontWeight: '500',
      fontSize: 14
   },
} );
