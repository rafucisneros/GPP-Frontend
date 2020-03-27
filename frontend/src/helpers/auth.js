exports.addToken = (token) => {
    return localStorage.setItem('TOKEN_KEY', token);
}

exports.getToken = () => {
    return localStorage.getItem('TOKEN_KEY');
}

exports.deleteToken = () => {
    return localStorage.removeItem('TOKEN_KEY');
}

exports.logout = () => {
    this.deleteToken();
    window.location = '/login';

}