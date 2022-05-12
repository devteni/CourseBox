const useAuth = () => {
    if(typeof window !== undefined) {
        const loggedInUser = localStorage.getItem('user');
        return loggedInUser ? { isAuthenticated: true } : { isAuthenticated: false }
    }
}

export default useAuth;