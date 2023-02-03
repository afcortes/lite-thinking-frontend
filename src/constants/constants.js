const constants = {
    endpoints: {
        auth: {
            base: '/auth',
            register: '/register',
            login: '/login',
        }
    },
    localStorage: {
        user: 'user',
    },
    redux: {
        actions: {
            auth: {
                base: '/auth',
                register: '/register',
                login: '/login',
                logout: '/logout',
                
            }
        }
    },
    roles: {
        ADMIN: 'admin',
        EXTERNAL: 'external'
    }
}

export default constants;