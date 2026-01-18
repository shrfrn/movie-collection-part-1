<template>
    <div v-if="msg" class="user-msg" :class="msgType">
        <p>{{msg.txt}}</p>
    </div>
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
            setTimeout(() => this.msg = null, 2000)
        }
    },
    computed: {
        msgType() {
            return this.msg.type
        }
    }
}
</script>

<style>
.user-msg {
    position: absolute;
    top: 50px;
    right: .5rem;

    min-width: 25vw;

    padding: 10px;
    background-color: gray;

    &.success {
        background-color: darkseagreen;
    }
    
    &.error {
        background-color: orangered;
    }

    border-radius: .5rem;

    font-size: .8em;
    font-weight: bold;
    color: white;
}
</style>