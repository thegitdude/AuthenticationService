<template>
	<v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

    <v-btn text @click="isSignedIn ? signOut() : signIn()">{{ isSignedIn ? 'Sign out' : 'Sign in'}}</v-btn>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Getter } from 'vuex-class'

@Component({
    components: {}
})
export default class NavigationBar extends Vue {
    @Getter('auth/isSignedIn') private isSignedIn: boolean
    @State(s => s.appName) private appName: string

    private signIn(): any {
        this.$router.push('/login')
    }

    private signOut(): any {
        this.$store.dispatch('auth/signOut')
    }
}
</script>

<style lang="sass" scoped>
button
    text-transform: none
</style>
