

export const initFacebookSdk = () => {
    return new Promise((resolve, reject) => {
        // Load the Facebook SDK asynchronously
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '1321994925377004',
                cookie: true,
                xfbml: true,
                version: 'v16.0'
            });
            // Resolve the promise when the SDK is loaded
            resolve();
        }
    }
    )
}