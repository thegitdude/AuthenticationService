<template>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>
                Users
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    :search="search"
                >
                    <template class="narrow" v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="action-icon mr-2"
                            @click="selectUser(item.id)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            class="action-icon"
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import {  Component } from 'vue-property-decorator'
import { State, Getter } from 'vuex-class'

@Component({
    components: {}
})
export default class Users extends Vue {
    @State(state => state.users.users) private users: any[]
    private search: string = ''
    private headers: any[] = [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
    ]

    private selectUser(userId: any) {
        this.$router.push({ path: `/users/${userId}` })
    }

	private async created() {
		await this.$store.dispatch('users/getUsers')
	}
}
</script>
<style lang="sass" scoped>
    .action-icon
        float: right
        margin-left: 20px
</style>