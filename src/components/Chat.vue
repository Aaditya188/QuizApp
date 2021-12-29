<template>
    <section class="chat">
        <div @click="toggleChatBox" class="chat-icon">
            <span class="dot"></span>
            <IconChat />
        </div>

        <div class="chat-box">
            <div class="chat-box-header">
                <div class="online">
                    <IconUsers />
                    <span class="green-dot"></span> Chat (
                    <span class="counter"></span> )
                </div>
                <div @click="closeChat" class="chat-box-header-close">
                    <IconArrowLeft />
                </div>
            </div>

            <div class="chat-box-msg"></div>

            <form @submit.prevent>
                <input
                    v-model="msg"
                    type="text"
                    placeholder="Type your message..."
                    autofocus
                />
                <button @click="sendMsg()" type="click">
                    <IconPaperPlane />
                </button>
            </form>
        </div>
    </section>
</template>

<script>
import "jquery.nicescroll";
import IconPaperPlane from "@/components/base/IconPaperPlane.vue";
import IconArrowLeft from "@/components/base/IconArrowLeft.vue";
import IconChat from "@/components/base/IconChat.vue";
import IconUsers from "@/components/base/IconUsers.vue";
import $ from "jquery";
import io from "socket.io-client";
export default {
    name: "Chat",

    components: {
        IconUsers,
        IconChat,
        IconArrowLeft,
        IconPaperPlane
    },

    data() {
        return {
            socket: io(`localhost:${process.env.PORT || 3000}`),
            msg: ""
        };
    },

    mounted() {
        this.intializeChat();
        this.receiveMsg();

        //nicescroll setting
        $(".chat-box").niceScroll({
            zindex: 5,
            hidecursordelay: 0,
            autohidemode: "scroll",
            cursorborderradius: 0,
            cursorborder: 0,
            cursorwidth: "5px",
            cursorcolor: "#69d7e6"
        });
    },

    destroyed() {
        this.socket.disconnect();
    },

    methods: {
        toggleChatBox() {
            $(".chat-box").toggleClass("open");
            $(".chat-box form input").focus();
        },

        closeChat() {
            $(".chat-box").toggleClass("open");
            $(".chat-icon .dot").removeClass("active");
        },

        intializeChat() {
            this.socket.on("notify", msg => {
                // print msg
                $(".chat-box-msg").append(
                    `<div class="notification">
                        <p>${msg}</p>
                    </div>`
                );

                //unread msg notification
                $(".chat-icon .dot").addClass("active");

                //adjust the scroll
                const chatBox = document.querySelector(".chat-box");
                chatBox.scrollTop = chatBox.scrollHeight;
            });

            this.socket.emit("notify", this.$store.getters.name);

            this.socket.on("countUsers", users => {
                users = users < 0 ? 0 : users; //avoid negitive values when server reconnect
                $(".chat-box-header .online .counter").text(users);
            });
        },

        receiveMsg() {
            this.socket.on("newMsg", payload => {
                //unread msg notification
                $(".chat-icon .dot").addClass("active");

                //print msg
                $(".chat-box-msg").append(
                    `<div class="others">
                        <span class="name">${payload.user}:</span>
                        <p>${payload.msg}</p>
                    </div>`
                );

                //adjust the scroll
                const chatBox = document.querySelector(".chat-box");
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        },

        sendMsg() {
            if (!this.msg) return;

            //for sender
            $(".chat-box-msg").append(
                `<div class="me">
                    <p>${this.msg}</p>
                </div>`
            );

            //for receivers
            const payload = {
                user: this.$store.getters.name,
                msg: this.msg
            };
            this.socket.emit("newMsg", payload);

            //
            const chatBox = document.querySelector(".chat-box");
            chatBox.scrollTop = chatBox.scrollHeight;
            this.msg = "";
        }
    }
};
</script>

<style lang="scss">
.chat {
    .chat-icon {
        position: absolute;
        left: 0px;
        top: 103px;
        cursor: pointer;
        padding: 5px;
        background-color: #aaa;
        border-radius: 0 15% 15% 0;
        z-index: 1;
        box-shadow: 17px 1px 16px -13px rgba(0, 0, 0, 0.34);
        .dot {
            width: 10px;
            height: 10px;
            background-color: transparent;
            position: absolute;
            left: 38px;
            border-radius: 50%;
            &.active {
                background-color: #ef3b5d;
            }
        }
    }
    .chat-box {
        position: fixed;
        width: 350px;
        top: 0;
        bottom: 0;
        left: -350px;
        z-index: 3;
        @extend .main-transition;
        background-color: #f9f9f9;
        color: gray;
        &.open {
            left: 0;
            box-shadow: 8px 0px 36px 8px var(--shadow);
            overflow-y: auto;
            .chat-box-header {
                left: 0 !important;
            }
            form {
                left: 0 !important;
            }
        }
        .chat-box-header {
            position: fixed;
            height: 40px;
            background-color: var(--gray-light);
            left: -350px;
            top: 0;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            @extend .main-transition;
            padding: 5px 10px;
            z-index: 1;
            .online {
                font-weight: 700;
                .green-dot {
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    background-color: #20c320;
                    border-radius: 50%;
                    margin-bottom: 2px;
                    margin-left: 2px;
                }
            }
            .chat-box-header-close {
                cursor: pointer;
                font-weight: 600;
                font-size: 20px;
            }
        }
        .chat-box-msg {
            padding: 5px 5px 0;
            margin-top: 40px;
            margin-bottom: 50px;
            div {
                text-align: left;
                & p {
                    margin: 0 0 5px;
                    border: 2px solid;
                    max-width: 90%;
                    padding: 5px 10px;
                    font-weight: 400;
                    overflow-wrap: break-word;
                }
                &.notification {
                    text-align: center;
                    p {
                        font-weight: 600;
                        border: none;
                        font-style: italic;
                        padding-bottom: 0;
                    }
                }
                &.me p {
                    border-radius: 8px 15px 0 8px;
                    margin-left: auto;
                    background-color: rgba(105, 215, 230, 0.5);
                    border-color: var(--main-color);
                }
                &.others {
                    span {
                        margin-left: 15px;
                        font-weight: 500;
                    }
                    p {
                        border-radius: 15px 8px 8px 0;
                        background-color: #f1f1f1;
                        border-color: #e9e9e9;
                    }
                }
            }
        }
        form {
            padding: 3px;
            position: fixed;
            bottom: 0;
            width: inherit;
            left: -350px;
            @extend .main-transition;
            input[type="text"] {
                border-radius: 5px;
            }
            button {
                position: absolute;
                right: 7px;
                top: 7px;
                border: 0;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                padding-right: 9px;
                cursor: pointer;
                outline: none;
            }
        }
    }
    .main-transition {
        transition: all 0.4s ease-in-out;
    }
}
//nicescroll adjustment
.nicescroll-rails {
    left: 0 !important;
    & > .nicescroll-cursors {
        left: 345px !important;
    }
}

@media (max-width: 700px) {
    .chat {
        .chat-box {
            @extend .mobile-transition;
            .chat-box-header {
                @extend .mobile-transition;
            }
            form {
                @extend .mobile-transition;
                button {
                    cursor: none;
                }
            }
        }
    }
    .mobile-transition {
        transition: all 0.2s linear !important;
    }
}
</style>
