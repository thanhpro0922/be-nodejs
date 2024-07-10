//@ Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");

            socket.emit("CLIENT_ADD_FRIEND", userId);
        });
    });
}
//@ End Chức năng gửi yêu cầu

//@ Chức năng hủy gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");

            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        });
    });
}
//@ End Chức năng hủy gửi yêu cầu

//@ Chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-refuse-friend");

            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        });
    });
}
//@ End Chức năng từ chối kết bạn

//@ Chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");

            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        });
    });
}
//@ End Chức năng chấp nhận kết bạn

//@ SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");

    if (userId == data.userId) {
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
});
//@ End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

//@ SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    //@@ Page friend request
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if (dataUsersAccept) {
        const userId = dataUsersAccept.getAttribute("data-users-accept");
        if (userId == data.userId) {
            //@@@ Draw the user to the interface
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-6");
            newBoxUser.setAttribute("user-id", data.infoUserA._id);

            newBoxUser.innerHTML = `<div class="box-user">
                    <div class="inner-avatar">
                        <img src="/images/Avatar.png" alt="${data.infoUserA.fullName}"> 
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.infoUserA.fullName}</div>
                        <div class="inner-buttons">
                            <button
                                class="btn btn-sm
                                btn-primary mr-1"
                                btn-accept-friend="${data.infoUserA._id}">Chấp nhận
                            </button>
                            <button
                                class="btn btn-sm
                                btn-secondary mr-1"
                                btn-refuse-friend="${data.infoUserA._id}">Xóa
                            </button>
                            <button
                                class="btn
                                btn-sm btn-secondary mr-1"
                                btn-deleted-friend="" disabled="">Đã xóa
                            </button>
                            <button
                                class="btn
                                btn-sm btn-primary mr-1"
                                btn-accepted-friend=""
                                disabled="">Đã chấp nhận
                            </button>
                        </div>
                    </div>
                </div>`;

            dataUsersAccept.appendChild(newBoxUser);

            //@@@ End Draw the user to the interface

            //@@@ Delete friend request
            const btnRefuseFriend = newBoxUser.querySelector(
                "[btn-refuse-friend]"
            );
            btnRefuseFriend.addEventListener("click", () => {
                btnRefuseFriend.closest(".box-user").classList.add("refuse");
                const userId =
                    btnRefuseFriend.getAttribute("btn-refuse-friend");

                socket.emit("CLIENT_REFUSE_FRIEND", userId);
            });
            //@@ End Delete friend request

            //@@ Accept friend request
            const btnAcceptFriend = newBoxUser.querySelector(
                "[btn-accept-friend]"
            );
            btnAcceptFriend.addEventListener("click", () => {
                btnAcceptFriend.closest(".box-user").classList.add("accepted");
                const userId =
                    btnAcceptFriend.getAttribute("btn-accept-friend");

                socket.emit("CLIENT_ACCEPT_FRIEND", userId);
            });
            //@@ End Accept friend request
        }
    }
    //@@ End Page friend request

    //@@ Page list user
    const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
    if (dataUserNotFriend) {
        const userId = dataUserNotFriend.getAttribute("data-users-not-friend");

        if (userId == data.userId) {
            //@@@ Delete A from list of B
            const boxUserRemove = dataUserNotFriend.querySelector(
                `[user-id="${data.infoUserA._id}"]`
            );
            if (boxUserRemove) {
                dataUserNotFriend.removeChild(boxUserRemove);
            }
        }
    }
    //@@ End Page list user
});
//@ End SERVER_RETURN_INFO_ACCEPT_FRIEND

//@ SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept");

    if (userId == data.userId) {
        // Delete A from list B
        const boxUserRemove = dataUsersAccept.querySelector(
            `[user-id="${data.userIdA}"]`
        );
        if (boxUserRemove) {
            dataUsersAccept.removeChild(boxUserRemove);
        }
    }
});

//@ End SERVER_RETURN_USER_ID_CANCEL_FRIEND

//@ FUNCTION RETURN STATUS
const statusOnline = (userId, status) => {
    const dataUsersFriend = document.querySelector("[data-users-friend]");
    if (dataUsersFriend) {
        const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"]`);
        if (boxUser) {
            boxUser.querySelector("[status]").setAttribute("status", status);
        }
    }
};
//@ End FUNCTION RETURN STATUS

//@ SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
    statusOnline(userId, "online");
});

//@ End SERVER_RETURN_USER_ONLINE

//@ SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (userId) => {
    statusOnline(userId, "offline");
});
//@ End SERVER_RETURN_USER_OFFLINE
