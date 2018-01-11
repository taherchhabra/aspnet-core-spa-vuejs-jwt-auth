import RestUtilities from './RestUtilities';
import AuthStore from '../stores/Auth';
import axios from 'axios';

interface IAuthResponse {
    access_token: string;
}

export default class Auth {
    static isSignedInIn(): boolean {
        return !!AuthStore.getToken();
    }

    signInOrRegister(email: string, password: string, isRegister: boolean = false) {

         

        return RestUtilities.post<IAuthResponse>(`/api/auth/${isRegister ? 'register' : 'login'}`,
            `username=${email}&password=${password}${!isRegister ? '&grant_type=password' : ''}`)
            .then((response) => {
                if (!response.is_error) {
                  //  AuthStore.setToken(response.content.access_token);
                }
                return response;
            });
    }

    signIn(email: string, password: string) {
        //not using RestUtilities here
        return axios.post('/api/SampleData/RequestToken', {
            username: 'Jon',
            password: 'Again, not for production use, DEMO ONLY!'
          })
          .then(function (response) {
              debugger;
            AuthStore.setToken(response.data.token);
          })
          .catch(function (error) {
            console.log(error);
          });     
    }

    register(email: string, password: string) {
        return this.signInOrRegister(email, password, true);
    }

    confirm(token: string): Promise<boolean> {
        return RestUtilities.post('/api/auth/confirm', { token: token })
            .then((response) => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    }

    signOut(): void {
        AuthStore.removeToken();
    }
}
