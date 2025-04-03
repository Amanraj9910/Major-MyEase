# Authentication System Documentation

This document explains how to use and configure the authentication system in My-Ease, including the newly added Google Sign-In.

## Overview

The authentication system provides the following functionality:

1. Email/password-based authentication (registration and login)
2. Google Sign-In integration
3. Session management using localStorage
4. User profile data storage

## Setting Up Google Authentication

To enable Google Sign-In in the application, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID" 
5. Set the application type to "Web application"
6. Add your authorized JavaScript origins (e.g., `http://localhost:8086` for development and your production URL)
7. Add your authorized redirect URIs (the same as your origins for most cases)
8. Copy the generated Client ID

Then, set the Client ID in your `.env` file:

```
VITE_GOOGLE_CLIENT_ID=your-client-id-here
```

If the environment variable is not available, the application will fall back to a default client ID, but this should be replaced with your actual Client ID.

## Using Authentication

### Authentication Context

The application uses a React context for authentication, which you can access in any component:

```jsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, signup, loginWithGoogle, logout } = useAuth();
  
  // Your component logic
}
```

### Available Methods

- `login(email, password)`: Logs in a user with email and password
- `signup(name, email, password)`: Registers a new user with name, email, and password
- `loginWithGoogle(credential)`: Logs in or registers a user with Google
- `logout()`: Logs out the current user
- `isAuthenticated`: Boolean indicating if a user is logged in
- `user`: Object containing the current user's information (id, name, email, picture)

### Google Sign-In Button

The Google Sign-In button is implemented on both the Login and Signup pages using the `@react-oauth/google` package. It handles the OAuth flow and provides the credential to your application for verification.

## Security Considerations

1. This implementation is simplified for demonstration purposes and stores user data in localStorage
2. In a production environment, consider:
   - Using secure HTTP-only cookies instead of localStorage
   - Adding proper password hashing and salting
   - Implementing token-based authentication with refresh tokens
   - Adding email verification
   - Implementing rate limiting to prevent brute force attacks
   - Adding additional security measures like CSRF protection

## User Data Structure

The user object contains:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;  // Profile picture URL (mainly from Google)
  authProvider?: 'email' | 'google';  // How the user authenticated
}
```

## Troubleshooting

1. If Google Sign-In fails, ensure your Client ID is correct and the domains are properly authorized
2. Check browser console for specific error messages
3. Verify that the Google OAuth consent screen is properly configured
4. For development, ensure you're using `localhost` and not `127.0.0.1` as they are treated differently by Google OAuth

## Next Steps for Enhancement

1. Add other OAuth providers like Facebook, Apple, GitHub, etc.
2. Implement email verification
3. Add password reset functionality
4. Implement refresh tokens for better security
5. Add two-factor authentication options 