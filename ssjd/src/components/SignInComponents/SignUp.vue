<template>
	<v-card class="px-4">
		<v-card-text>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
				@submit.prevent="signUp"
			>
				<v-text-field
					autofocus
					v-model="id"
					:counter="20"
					:rules="idRules"
					label="ID"
					required
				></v-text-field>
				<v-text-field
					type="password"
					v-model="password"
					:rules="pwdRules"
					label="Password"
					required
				></v-text-field>
				<v-text-field
					type="password"
					v-model="vrfPassword"
					:rules="pwdVrfRules"
					label="Verify Password"
					required
				></v-text-field>
				<v-btn :disabled="!valid" class="mr-4" type="submit">Sign up</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			id: "",
			password: "",
			vrfPassword: "",
			pwdVrfRules: [
				() =>
					this.vrfPassword == this.password ||
					"Passwords should be same. check again password please."
			],
			idRules: [
				v => !!v || "ID is required",
				v => (v && v.length <= 16) || "Your ID must be less than 16 characters"
			],
			pwdRules: [
				v => !!v || "Enter the password",
				v =>
					(v && v.length <= 20) ||
					"Your password must be less than 20 characters"
			],
			valid: false,
			disabled: false
		};
	},
	methods: {
		signUp() {
			alert("signup!");
		}
	}
};
</script>
