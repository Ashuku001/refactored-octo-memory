'use client'
import Script from 'next/script';
import { Button } from './ui/button';

function FacebookEmbeddedSignup() {
  return (
    <>
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
        onReady={() => {
          //@ts-ignore
          window.fbAsyncInit = function () {
            //@ts-ignore
            FB.init({
              appId: '1321994925377004',
              xfbml: true,
              version: 'v17.0'
            });
          };

          //@ts-ignore

          // Load the JavaScript SDK asynchronously
          (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            //@ts-ignore
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode?.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));

          // Facebook Login with JavaScript SDK
          function launchWhatsAppSignup() {
            // Conversion tracking code
            // @ts-ignore
            fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', { appId: '1321994925377004', feature: 'whatsapp_embedded_signup' });

            // Launch Facebook login
            //@ts-ignore
            FB.login(function (response) {
              if (response.authResponse) {
                const accessToken = response.authResponse.accessToken;
                //Use this token to call the debug_token API and get the shared WABA's ID
              } else {
                console.log('User cancelled login or did not fully authorize.');
              }
            }, {
              scope: 'whatsapp_business_management, whatsapp_business_messaging',
              extras: {
                feature: 'whatsapp_embedded_signup',
                setup: {
                  // Prefilled data can go here
                }
              }
            });
          }
        }}
      />
      <Button variant={"default"} 
      // onClick={function launchWhatsAppSignup() {
      //   console.log("clicked")
      //   // Conversion tracking code
      //   //@ts-ignore
      //   // fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', { appId: '1321994925377004', feature: 'whatsapp_embedded_signup' });

      //   // Launch Facebook login
      //   //@ts-ignore
      //   window.FB.login(function (response) {
      //     if (response.authResponse) {
      //       const accessToken = response.authResponse.accessToken;
      //       //Use this token to call the debug_token API and get the shared WABA's ID
      //     } else {
      //       console.log('User cancelled login or did not fully authorize.');
      //     }
      //   }, {
      //     scope: 'whatsapp_business_management, whatsapp_business_messaging',
      //     extras: {
      //       feature: 'whatsapp_embedded_signup',
      //       setup: {
      //         // Prefilled data can go here
      //       }
      //     }
      //   });
      // }} 
      className="p-2  rounded-md" >
        {/* Login with Facebook */}
        Login
      </Button>
    </>
    </>
  )
}

export default FacebookEmbeddedSignup