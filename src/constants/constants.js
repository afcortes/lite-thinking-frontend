const constants = {
    endpoints: {
        auth: {
            base: '/auth',
            register: '/register',
            login: '/login',
        },
        company: {
            base: '/company'
        },
        product: {
            base: '/product',
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