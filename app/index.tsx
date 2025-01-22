import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, Text, Button } from "react-native";
import {Link} from "expo-router";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const usewarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    
        usewarmUpBrowser();
      
        const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
      
        const onPress = React.useCallback(async () => {
          try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
              redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
            });
      
            // If sign in was successful, set the active session
            if (createdSessionId) {
              setActive!({ session: createdSessionId });
            } else {
              // Use signIn or signUp returned from startOAuthFlow
              // for next steps, such as MFA
            }
          } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error("OAuth error",err);
          }
        }, []);

        
    return (
        <View style={{ flex:1, justifyContent: "center",alignItems: "center"}}>
            
            <Button title="sign in with google" onPress={onPress} />
        </View>
    );
};

export default SignInWithOAuth;
