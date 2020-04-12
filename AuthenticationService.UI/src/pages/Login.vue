<template>
    <v-container>
        <v-row align="center">
            <v-col lg="6" offset-lg="3">
                <v-form
                    ref="form"
                    v-model="valid"
                >
                    <v-text-field
                        v-model="email"
                        :rules="emailValidationRule"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        :rules="passwordValidationRule"
                        label="Password"
                        counter
                        @click:append="show = !show"
                    ></v-text-field>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn @click="login">Sign in</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    components: {}
})
export default class Login extends Vue {
    private valid: boolean = true
    private email: string = ''
    private password: string = ''
    private show: boolean = false
    private emailValidationRule = [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    private passwordValidationRule = [
        (v: any) => !!v || 'Password is required'
    ]

    private login() {
		this.$store.dispatch('auth/signIn', { username: this.email, password: this.password })
    }
}
</script>
<style lang="sass" scoped>
    button
        text-transform: none
</style>