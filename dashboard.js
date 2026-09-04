// Route guard: redirect to login if there's no active Supabase session,
// then load the signed-in user's profile from the `profiles` table.
document.addEventListener("DOMContentLoaded", async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        window.location.href = "index.html";
        return;
    }

    const { data: profile, error } = await supabaseClient
        .from("profiles")
        .select("full_name, username, email, phone, role, created_at")
        .eq("id", session.user.id)
        .single();

    document.getElementById("loadingState").classList.add("hidden");
    document.getElementById("dashboardContent").classList.remove("hidden");

    if (error || !profile) {
        document.getElementById("userFullName").textContent = session.user.email;
        return;
    }

    document.getElementById("userFullName").textContent = profile.full_name;
    document.getElementById("userRoleLine").textContent =
        profile.role === "employer" ? "Employer account" : "Job Seeker account";
    document.getElementById("userUsername").textContent = "@" + profile.username;
    document.getElementById("userEmail").textContent = profile.email;
    document.getElementById("userPhone").textContent = profile.phone || "Not provided";
    document.getElementById("userCreatedAt").textContent =
        new Date(profile.created_at).toLocaleDateString();
});

// Logout flow (confirm modal -> supabase.auth.signOut -> redirect)
document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("logoutModal").classList.remove("hidden");
    document.getElementById("logoutModal").classList.add("flex");
});

document.getElementById("cancelLogoutBtn").addEventListener("click", () => {
    document.getElementById("logoutModal").classList.add("hidden");
    document.getElementById("logoutModal").classList.remove("flex");
});

document.getElementById("confirmLogoutBtn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
});
