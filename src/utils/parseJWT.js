const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    
    return { token, ...JSON.parse(window.atob(base64)) }
}

export default parseJwt;