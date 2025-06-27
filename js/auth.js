// rai/js/auth.js

// Load Google Identity Services library
(function() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
})();

let currentUser = null;
let currentIdToken = null;

function renderGoogleSignIn() {
    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
        setTimeout(renderGoogleSignIn, 100); // Wait for library to load
        return;
    }
    window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // TODO: Replace with your actual client ID
        callback: handleCredentialResponse
    });
    window.google.accounts.id.renderButton(
        document.getElementById('google-signin-container'),
        { theme: 'outline', size: 'large' }
    );
    window.google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
    const idToken = response.credential;
    currentIdToken = idToken;
    // Decode JWT to get user info (for display only, not for auth)
    const payload = JSON.parse(atob(idToken.split('.')[1]));
    currentUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    };
    localStorage.setItem('google_id_token', idToken);
    localStorage.setItem('google_user', JSON.stringify(currentUser));
    updateHeaderWithUser();
}

function updateHeaderWithUser() {
    const container = document.getElementById('google-signin-container');
    if (currentUser) {
        container.innerHTML = `<div class="user-info"><img src="${currentUser.picture}" alt="User" style="width:32px;height:32px;border-radius:50%;vertical-align:middle;margin-right:8px;">${currentUser.name} <span style="font-size:0.9em;color:#888;">(${currentUser.email})</span></div>`;
    }
}

function getGoogleIdToken() {
    return currentIdToken || localStorage.getItem('google_id_token');
}

// On load, try to restore user from localStorage
(function() {
    const savedUser = localStorage.getItem('google_user');
    const savedToken = localStorage.getItem('google_id_token');
    if (savedUser && savedToken) {
        currentUser = JSON.parse(savedUser);
        currentIdToken = savedToken;
        updateHeaderWithUser();
    }
    renderGoogleSignIn();
})();

// Export for use in other modules
window.getGoogleIdToken = getGoogleIdToken; 