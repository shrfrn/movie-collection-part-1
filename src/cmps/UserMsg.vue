<template>
	<Transition>
		<div v-if="msg" class="user-msg" :class="msgType">
			<p>{{ msg.txt }}</p>
		</div>
	</Transition>
</template>

<script>
import { eventBus } from '@/services/event-bus.service'
export default {
	data() {
		return {
			msg: null,
		}
	},
	created() {
		eventBus.on('user-msg', this.showMsg)
	},
	methods: {
		showMsg(msg) {
			this.msg = msg
			setTimeout(() => (this.msg = null), 2000)
		},
	},
	computed: {
		msgType() {
			return this.msg.type
		},
	},
}
</script>

<style lang="scss">
.user-msg {
	position: absolute;
	top: 50px;
	right: 0.5rem;

	min-width: 25vw;

	padding: 10px;
	background-color: gray;

	&.success {
		background-color: darkseagreen;
	}

	&.error {
		background-color: orangered;
	}

	border-radius: 0.5rem;

	font-size: 0.8em;
	font-weight: bold;
	color: white;
} /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: 1s ease;
}

.v-enter-from,
.v-leave-to {
	// opacity: 0;
    translate: 150%;
}
</style>
