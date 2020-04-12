<template>
    <v-container>
        <v-row>
            <v-card-title>
                User details
            </v-card-title>
        </v-row>
        <v-row v-if="user !== null">
            <v-col md="6" sm="12">
                <v-form ref="form">
                    <v-text-field
                        v-model="user.name"
                        :counter="max"
                        label="Name"
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-col md="6" sm="12">
                <v-form ref="form">
                    <v-text-field
                        v-model="user.email"
                        :counter="max"
                        label="Email"
                        disabled
                    ></v-text-field>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-card-title>
                User roles
            </v-card-title>
        </v-row>
        <v-row v-if="user">
            <v-col>
                <v-select
                v-model="user.roles"
                :items="roles"
                multiple
                chips
                hint="User assigned roles"
                persistent-hint
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6">
                <v-btn @click="cancel">Cancel</v-btn>
            </v-col>
            <v-col md="6">
                <v-btn @click="update">Update</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
    components: {}
})
export default class User extends Vue {
    @State(s => s.users.user) user: any
    @State(s => s.auth.roles) roles: string[]

    private cancel() {
        this.$router.back()
    }

    private update() {
        this.$store.dispatch('users/updateUser')
    }

    private created() {
        this.$store.dispatch('users/getUser', this.$route.params.id)
    }
}
</script>