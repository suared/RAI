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
    
    console.log('Initializing Google Sign-In with client ID:', '333682720257-hmucqsepe6skbdlr856fvsccf95mp7pk.apps.googleusercontent.com');
    
    try {
        window.google.accounts.id.initialize({
            client_id: '333682720257-hmucqsepe6skbdlr856fvsccf95mp7pk.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });
        
        window.google.accounts.id.renderButton(
            document.getElementById('google-signin-container'),
            { 
                theme: 'outline', 
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular'
            }
        );
        
        // Don't auto-prompt, let user click the button
        // window.google.accounts.id.prompt();
        
        console.log('Google Sign-In initialized successfully');
    } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        document.getElementById('google-signin-container').innerHTML = 
            '<p style="color: red;">Error initializing Google Sign-In. Check console for details.</p>';
    }
}

function handleCredentialResponse(response) {
    console.log('OAuth response received:', response);
    
    if (response.error) {
        console.error('OAuth error:', response.error);
        alert('OAuth Error: ' + response.error);
        return;
    }
    
    const idToken = response.credential;
    currentIdToken = idToken;
    
    try {
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
        
        console.log('User signed in successfully:', currentUser);
    } catch (error) {
        console.error('Error processing OAuth response:', error);
        alert('Error processing sign-in response');
    }
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