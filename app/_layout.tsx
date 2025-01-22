import React from "react";
import {Stack} from "expo-router/stack";
import { tokenCache } from '@/cache'
import { ClerkProvider } from '@clerk/clerk-expo';
import  * as SecureStore from 'expo-secure-store';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey){
  throw new Error(
    "missing publishable key. please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
function RootLayout(){
  return(
    <ClerkProvider publishableKey={publishableKey}>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </ClerkProvider>
  );
}

export default RootLayout;