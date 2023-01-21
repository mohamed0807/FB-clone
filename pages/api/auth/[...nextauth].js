import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
    providers:[
        FacebookProvider({
            clientId:process.env.FACEBOOK_CLIENT_ID,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
        })
    ]
})