const logoutButton = document.querySelector("#logout")


const signout = async () => {

    const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    });

    if (response.ok || response.status === 404){
        document.location.replace("/signin");
    } else {
        const resData = await response.json();
        alert(resData.message);
    }

};

logoutButton.addEventListener("click", signout);
