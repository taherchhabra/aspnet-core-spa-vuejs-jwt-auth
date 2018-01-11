import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import axios from 'axios';
import AuthStore from '../../stores/Auth';

interface WeatherForecast {
    dateFormatted : string;
    temperatureC : number;
    temperatureF : number;
    summary : string;
}

@Component
export default class FetchDataComponent extends Vue {
    forecasts : WeatherForecast[] = [];

    mounted() {
        debugger;
        return axios
            .get('/api/SampleData/WeatherForecasts', {
                headers: {
                    'Authorization':'Bearer '+ AuthStore.getToken(),
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                this.forecasts = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
           
    }
}
