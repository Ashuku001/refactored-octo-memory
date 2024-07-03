const authenticate = async () => {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${process.env.auth_token}`);
    const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers })
    .then(response => console.log(response.text()))
    .then(result => console.log(result))
    .catch(error => console.log(error));

    console.log(await response)
}

authenticate()


