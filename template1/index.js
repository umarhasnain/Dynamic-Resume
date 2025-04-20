const handleSubmit = () => {
    let profilepic = document.getElementById("profilepic");

    let formData = {
        name: document.getElementById("name").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
        edu1: document.getElementById("edu-1").value,
        edu2: document.getElementById("edu-2").value,
        edu3: document.getElementById("edu-3").value,
        intro: document.getElementById("intro").value,
        exp1: document.getElementById("exp-1").value,
        exp2: document.getElementById("exp-2").value,
        exp3: document.getElementById("exp-3").value,
        skills: [
            document.getElementById("ski-1").value,
            document.getElementById("ski-2").value,
            document.getElementById("ski-3").value,
            document.getElementById("ski-4").value,
            document.getElementById("ski-5").value,
            document.getElementById("ski-6").value,
        ],
        certifications: [
            document.getElementById("first-1").value,
            document.getElementById("sec-2").value,
            document.getElementById("third-3").value,
            document.getElementById("forth-4").value,
            document.getElementById("fifth-5").value,
        ],
        links: [
            document.getElementById("link-1").value,
            document.getElementById("link-2").value,
            document.getElementById("link-3").value,
        ]
    };

    // If a profile image is uploaded, store its URL
    if (profilepic.files[0]) {
        formData.profileImage = URL.createObjectURL(profilepic.files[0]);
    }

    // Save data to localStorage
    localStorage.setItem("cvData", JSON.stringify(formData));

    // Redirect to CV page
    window.location.href = "./resume/cv.html";  // Replace with your actual CV page name
};
