<template>
	<v-card class="px-4">
		<v-card-text>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
				@submit.prevent="logIn"
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
				<v-btn :disabled="!valid" class="mr-4" type="submit">Sign in</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
import axios from "axios";
import crypto from "crypto";

export default {
	data() {
		return {
			id: "",
			password: "",
			idRules: [
				v => !!v || "ID is required",
				v => (v && v.length <= 20) || "Your ID must be less than 20 characters"
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
		logIn() {
			alert("로그인 버튼!");
			const pwd = crypto
				.createHash("sha256")
				.update(this.password)
				.digest("base64");
			const credential = { id: this.id, password: pwd };

			axios.post("http://localhost:3000/api/login", credential).then(res => {
				if (res.data.code === "complete") {
					this.$router.push("/");
				} else if (res.data.code === "not allowed") {
					alert("비밀번호가 틀렸습니다.");
					this.$router.push(res.data.url);
				} else {
					alert("존재하지 않는 정보입니다.");
					this.$router.push(res.data.url);
				}
			});
		}
	}
};
</script>
