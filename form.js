function createSnowflakes() {
    const snowContainer = document.querySelector('.snow');
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 7 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowContainer.appendChild(snowflake);
    }
}
createSnowflakes();

function registerUser(newUser) {
    fetch("http://localhost:3000/users", { method: "GET" })
    .then(response => response.json())
    .then(users => {
        let existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
            document.getElementById('message').innerText = "User with this email already exists!";
            return; 
        }
        return fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });
    })
    .then(response => {
        if (response && response.status === 201) {
            alert("User registered successfully!");
            document.getElementById('campForm').reset();
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = "Error: " + error;
    });
}

function validateForm() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    let isValid = true;
    const newUser = {};

    const name = document.getElementById('name').value;
    if (!name) {
    document.getElementById('nameError').textContent = 'Full name is required.';
    isValid = false;
    } else {
    newUser.name = name;
    }

    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Valid email is required.';
    isValid = false;
    } else {
    newUser.email = email;
    }

    const phone = document.getElementById('phone').value;
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
    document.getElementById('phoneError').textContent = 'Valid 10-digit phone number is required.';
    isValid = false;
    } else {
    newUser.phone = phone;
    }

    const dob = document.getElementById('dob').value;
    if (!dob) {
    document.getElementById('dobError').textContent = 'Date of birth is required.';
    isValid = false;
    } else {
    newUser.dob = dob;
    }

    const gender = document.getElementById('gender').value;
    if (!gender) {
    document.getElementById('genderError').textContent = 'Please select gender.';
    isValid = false;
    } else {
    newUser.gender = gender;
    }

    const activities = document.querySelectorAll('input[name="activities"]:checked');
    if (activities.length === 0) {
    document.getElementById('activitiesError').textContent = 'Please select at least one activity.';
    isValid = false;
    } else {
    newUser.activities = Array.from(activities).map(activity => activity.value);
    }

    const bloodGroup = document.getElementById('bloodGroup').value;
    if (!bloodGroup) {
    document.getElementById('bloodGroupError').textContent = 'Please select a blood group.';
    isValid = false;
    } else {
    newUser.bloodGroup = bloodGroup;
    }

    const parentGuidelines = document.querySelectorAll('input[name="parentGuidelines"]:checked');
    if (parentGuidelines.length !== 2) {
    document.getElementById('parentGuidelinesError').textContent = 'Please agree to both parent guidelines.';
    isValid = false;
    } else {
    newUser.parentGuidelines = Array.from(parentGuidelines).map(guideline => guideline.value);
    }

    if (isValid) {
    registerUser(newUser);
    }
}

function typeText(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = ''; 
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            if (callback) callback();
        }
    }
    typeWriter();
}

function revealDescription() {
    const description = document.getElementById('descriptionText');
    description.style.opacity = 1; 
}

const firstLineText = "Chase Snowflakes, Create Memories, and Make Friends!";
typeText(firstLineText, "typingText", 100, revealDescription);