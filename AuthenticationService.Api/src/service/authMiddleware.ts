import JwtGenerator from './jwtGenerator'

export default class AuthMiddleware {
    public async authAsync(req, res, next, role) {
        const _jwtGenerator = new JwtGenerator()
        const token = req.header('Authorization').replace('Bearer ','')
        try {
            // verify will throw an exception if the token is invalid or it expired
            const data = await _jwtGenerator.getVerifiedJwtAsync(token)
            
            // if the token contains the expecter role, continue 
            if(this.userTokenContainsRole(data, role))
                return next()
        } catch {}
        
        // return 401 when verification fails
        return res.status(401).send('Unauthorized to access the requester resource.')
    }
    
    private userTokenContainsRole(token, role) {
        try {
            // check if the token roles array contains the expected role
            const roles = token.data.roles.map(x => x.toLowerCase().trim())
            if(roles.includes(role.toLowerCase()))
                return true;
        } catch {}

        return false;
    }
}