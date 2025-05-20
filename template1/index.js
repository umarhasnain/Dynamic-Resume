// const handleSubmit = () => {
//     let profilepic = document.getElementById("profilepic");

//     let formData = {
//         name: document.getElementById("name").value,
//         number: document.getElementById("number").value,
//         email: document.getElementById("email").value,
//         edu1: document.getElementById("edu-1").value,
//         edu2: document.getElementById("edu-2").value,
//         edu3: document.getElementById("edu-3").value,
//         intro: document.getElementById("intro").value,
//         exp1: document.getElementById("exp-1").value,
//         exp2: document.getElementById("exp-2").value,
//         exp3: document.getElementById("exp-3").value,
//         skills: [
//             document.getElementById("ski-1").value,
//             document.getElementById("ski-2").value,
//             document.getElementById("ski-3").value,
//             document.getElementById("ski-4").value,
//             document.getElementById("ski-5").value,
//             document.getElementById("ski-6").value,
//         ],
//         certifications: [
//             document.getElementById("first-1").value,
//             document.getElementById("sec-2").value,
//             document.getElementById("third-3").value,
//             document.getElementById("forth-4").value,
//             document.getElementById("fifth-5").value,
//         ],
//         links: [
//             document.getElementById("link-1").value,
//             document.getElementById("link-2").value,
//             document.getElementById("link-3").value,
//         ]
//     };

//     // If a profile image is uploaded, store its URL
//     if (profilepic.files[0]) {
//         formData.profileImage = URL.createObjectURL(profilepic.files[0]);
//     }

//     // Save data to localStorage
//     localStorage.setItem("cvData", JSON.stringify(formData));

//     // Redirect to CV page
//     window.location.href = "./resume/cv.html";  // Replace with your actual CV page name
// };


// Add dynamic education field
function addEducationField() {
  const container = document.getElementById("educationContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter Qualification";
  input.className = "education-input";
  container.appendChild(input);
}

// Add dynamic experience field
function addExperienceField() {
  const container = document.getElementById("experienceContainer");
  const textarea = document.createElement("textarea");
  textarea.rows = 3;
  textarea.placeholder = "Enter Experience";
  textarea.className = "experience-input";
  container.appendChild(textarea);
}

// Add dynamic skill field
function addSkillField() {
  const container = document.getElementById("skillsContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter Skill";
  input.className = "skill-input";
  container.appendChild(input);
}

// Convert image to base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject("Failed to read file");
    reader.readAsDataURL(file);
  });
}

// Submit handler
async function handleSubmit() {
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const email = document.getElementById("email").value;
  const intro = document.getElementById("intro").value;

  const education = Array.from(document.querySelectorAll(".education-input")).map(el => el.value);
  const experience = Array.from(document.querySelectorAll(".experience-input")).map(el => el.value);
  const skills = Array.from(document.querySelectorAll(".skill-input")).map(el => el.value);

  const certification = [
    document.getElementById("first-1").value,
    document.getElementById("sec-2").value,
    document.getElementById("third-3").value,
    document.getElementById("forth-4").value,
    document.getElementById("fifth-5").value
  ];

  const links = [
    document.getElementById("link-1").value,
    document.getElementById("link-2").value,
    document.getElementById("link-3").value
  ];

  let profilePic = null;
  const fileInput = document.getElementById("profilepic");
  if (fileInput.files.length > 0) {
    profilePic = await convertImageToBase64(fileInput.files[0]);
  }

  const resumeData = {
    name,
    number,
    email,
    intro,
    education,
    experience,
    skills,
    certification,
    links,
    profilePic
  };

  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  alert("Data saved to localStorage!");
}
