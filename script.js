document.getElementById("loginForm").addEventListener("submit", async function(event)
{
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (email === "" || password === "")
    {
        message.style.color = "red";
        message.textContent = "Fill the Blanks";
        return;
    }

    message.style.color = "gray";
    message.textContent = "Signing in...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error)
    {
        message.style.color = "red";
        message.textContent = "Invalid Email or Password";
        return;
    }

    message.style.color = "green";
    message.textContent = "Login Successfully";

    setTimeout(function() {
        window.location.href = "dashboard.html";
    }, 1000);
})

const showPassword = document.getElementById("showPassword");
const password = document.getElementById("password");

    showPassword.addEventListener("change", () => {
        password.type = showPassword.checked ? "text" : "password";
    });
