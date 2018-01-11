import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AuthService from '../../services/Auth';


@Component
export default class SignIn extends Vue {
  username: string = "user@test.com";
  password: string = "P2ssw0rd!";
  error: string = '' ; 
  

  get isConfirmed() {
    
    return  this.$route.query.confirmed;
  }

  get isExpired() {
    return this.$route.query.expired;
  }

  get isSignedOut() {
    return this.$route.query.signedOut;
  }

  onSubmit() {
    let authService = new AuthService();
    authService.signIn(this.username, this.password).then(response => {
      if (!response) {
        this.$router.push({ path: '/home' });
      } else {
        this.error = 'some error';
      }
    });
  }

}