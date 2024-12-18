// Function to open tabs
function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach((content) => (content.style.display = "none"));

    const tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach((link) => link.classList.remove("active"));

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Handle sign-up
function handleSignUp(event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
        alert("Username already exists!");
    } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign-up successful! Please log in.");
        openTab({ currentTarget: document.querySelector("[onclick=\"openTab(event, 'loginPage')\"]") }, 'loginPage');
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username] === password) {
        alert("Login successful!");
        document.querySelectorAll("#homeTab, #fitnessTab, #nutritionTab, #logoutTab").forEach((tab) => (tab.style.display = "inline-block"));
        openTab({ currentTarget: document.querySelector("[onclick=\"openTab(event, 'homePage')\"]") }, 'homePage');
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Logout functionality
function logout() {
    alert("You have been logged out.");
    document.querySelectorAll("#homeTab, #fitnessTab, #nutritionTab, #logoutTab").forEach((tab) => (tab.style.display = "none"));
    openTab({ currentTarget: document.querySelector("[onclick=\"openTab(event, 'loginPage')\"]") }, 'loginPage');
}

// Example workout and meal data
const workouts = {
    "2024-12-13": "Full-body strength training",
    "2024-12-14": "Cardio and core workout",
};

const meals = {
    "2024-12-13": {
        breakfast: "Oatmeal and fruits",
        lunch: "Grilled chicken salad",
        dinner: "Baked salmon with veggies",
    },
    "2024-12-14": {
        breakfast: "Smoothie bowl",
        lunch: "Quinoa salad",
        dinner: "Turkey meatballs with spaghetti squash",
    },
};

function showWorkout() {
    const date = document.getElementById("workout-date").value;
    const workoutPlanDiv = document.getElementById("workout-plan");
    if (workouts[date]) {
        workoutPlanDiv.innerHTML = `<h3>Workout for ${date}</h3><p>${workouts[date]}</p>`;
    } else {
        workoutPlanDiv.innerHTML = `<p>No workout plan found for ${date}.</p>`;
    }
}

function showMealPlan() {
    const date = document.getElementById("meal-date").value;
    const mealPlanDiv = document.getElementById("meal-plan");
    if (meals[date]) {
        const { breakfast, lunch, dinner } = meals[date];
        mealPlanDiv.innerHTML = `
            <h3>Meal Plan for ${date}</h3>
            <p><strong>Breakfast:</strong> ${breakfast}</p>
            <p><strong>Lunch:</strong> ${lunch}</p>
            <p><strong>Dinner:</strong> ${dinner}</p>
        `;
    } else {
        mealPlanDiv.innerHTML = `<p>No meal plan found for ${date}.</p>`;
    }
}
