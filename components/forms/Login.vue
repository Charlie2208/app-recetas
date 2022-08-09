<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-account-key</v-icon>
      Inciar sesión
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onsubmit">
        <v-text-field
          dense
          outlined
          label="Nombre de usuario"
          v-model="userInfo.identifier"
        ></v-text-field>
        <v-text-field
          dense
          outlined
          label="Contraseña"
          v-model="userInfo.password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
        ></v-text-field>
        <div class="d-flex justify-space-between">
          <v-btn color="primary" small type="submit">Entrar</v-btn>
          <v-btn color="primary" small outlined @click="close">Cerrar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      userInfo: {
        identifier: "",
        password: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    async onsubmit() {
      await this.$auth
        .loginWith("local", { data: this.userInfo })
        .then(() => {
          console.log(this.$auth);
          this.$emit("close", false);
          this.userInfo.identifier = ""
          this.userInfo.password = ""
          const msg = `Bienvenido ${this.$auth.user.username}`
          this.$store.dispatch("snackbars/setSnack", {
            text: msg,
            color: "success",
          })
        })
        .catch((e) => {
          this.$store.dispatch("snackbars/setSnack", {
            text: "Verificar nombre de usuario o contraseña ",
            color: "error",
          });
        });
    },
  },
};
</script>