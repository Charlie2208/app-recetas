<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
    >
      <v-list color="primary--text">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in links"
          :key="link.id"
          :to="{ name: 'categorias', params: { categorias: link.slug } }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/user/favorites" v-if="$auth.loggedIn">
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Recetas favoritas </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-model="search" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Buscar Receta</v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="Nombre receta"
              dense
              v-model="findRecipe"
              @input="searchRecipe()"
            >
            </v-text-field>
            <v-list v-if="findRecipe.length != 0">
              <v-list-item
                v-for="recipe in filteredRecipe"
                :key="recipe.id"
                @click="seeRecipe(recipe.categoria.slug, recipe.id)"
              >
                {{ recipe.name }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>

      <div v-if="$auth.loggedIn">
        <v-menu
        v-model="loginmenu"
        :close-on-content-click="false"
        offset-y
        >
        <template v-slot:activator="{on}">
          <v-btn v-on="on" icon>
            <v-avatar class="secondary">
              <span class="white--text headline">{{$auth.user.username[0]}}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{$auth.user.username}}</v-list-item-title>
                <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn to="/user" small>Admin</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-card-actions>
              <v-btn text color="primary" @click="loginmenu = false" small>Cerrar</v-btn>
              <v-btn text color="primary" @click="logout()" small>Cerrar Sesión</v-btn>
          </v-card-actions>
        </v-card>
        </v-menu>
      </div>

      <div v-else>
        <v-btn text color="primary" @click="dialog=true; type='forms-login'">Iniciar Sesión</v-btn>
        <v-btn text color="primary" @click="dialog=true; type='forms-register'">Registro</v-btn>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <nuxt />


      <v-snackbar
      v-for="(snack, i) in snacks.filter((s) => s.showing)" 
      :key="i + Math.random()"
      v-model="snack.showing"
      :color="snack.color"
      :timeout="snack.timeout"
      :style="`bottom: ${i * 60 + 8}px`"
      right
      >
        {{snack.text}}
        <v-btn slot="action" small icon @click="snack.showing = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-main>

    <v-dialog v-model="dialog" max-width="600">
      <component :is="type" @close="dialog = $event" />
    </v-dialog>

    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-btn color="primary" small icon> <v-icon>mdi-facebook</v-icon></v-btn>
        <v-btn color="primary" small icon>
          <v-icon>mdi-instagram</v-icon></v-btn
        >
        <v-btn color="primary" small icon>
          <v-icon>mdi-pinterest</v-icon></v-btn
        >
        <v-btn color="primary" small icon> <v-icon>mdi-twitter</v-icon></v-btn>
        <v-col class="text-center primary--text" cols="12">
          &copy; {{ new Date().getFullYear() }} - LE COQ
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      title: "LEC COQ",
      search: false,
      findRecipe: "",
      dialog: false,
      type:"forms-login",
      snack: false,
      loginmenu: false
    };
  },
  computed: {
    ...mapGetters({
      links: "readCategorias",
      recipes: "readLoadRecipes",
      snacks:"snackbars/readSnacksbars"
    }),
    filteredRecipe() {
      return this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().match(this.findRecipe.toLowerCase())
      );
    },
  },
  methods: {
    seeRecipe(categorias, recipe) {
      (this.findRecipe = ""),
        (this.search = false),
        this.$router.push({
          name: "categorias-recipe",
          params: { categorias, recipe },
        });
    },
    searchRecipe() {
      this.$store.dispatch("searchRecipe", this.findRecipe);
    },
    // test() {
    //   this.$store.dispatch("snackbars/setSnack", {text: 'Hola action', color:'error'})
    // },
    logout(){
      this.$auth.logout()
      this.loginmenu = false
      this.$store.commit("user/resetFav")
    }
  },
};
</script>
