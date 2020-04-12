<template>
	<v-app id="app">
		<NavigationBar> </NavigationBar>
		<v-container>
			<v-row>
				<router-view></router-view>
			</v-row>
		</v-container>
		<span class="version-tag">{{'v - ' + version}}</span>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { getAsync, postAsync } from './server/adaptor'
import NavigationBar from './components/NavigationBar.vue'

@Component({
	components: {
		NavigationBar,
  	},
})
export default class App extends Vue {
	@State(s => s.version) private version: string

	beforeCreate() {
		this.$store.commit('auth/loadUser')
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.version-tag {
	position: absolute;
	left: 10px;
	bottom: 5px;
	color: rgb(167, 167, 167);
	font-size: 8px
}
</style>
