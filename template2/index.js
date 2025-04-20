const handleSubmit = () => {
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

    // Save data to localStorage
    localStorage.setItem("cvData", JSON.stringify(formData));

    // Redirect to CV page
    window.location.href = "./resume/second_resume.html";  // Replace with your actual CV page name
};

// Load data from localStorage on page load
window.onload = function () {
    const data = JSON.parse(localStorage.getItem("resumeData")) || {
      skills: [],
      education: [],
      certifications: [],
      links: [],
    };
  
    // Render each section
    data.skills.forEach(skill => renderItem("skillsList", skill));
    data.education.forEach(edu => renderItem("educationList", edu));
    data.certifications.forEach(cert => renderItem("certList", cert));
    data.links.forEach(link => renderItem("linkList", link));
  };
  
  function renderItem(listId, value) {
    const li = document.createElement("li");
    li.textContent = value;
    document.getElementById(listId).appendChild(li);
  }
  
  // Add Skill
  function addSkill() {
    const skill = document.getElementById("skillInput").value.trim();
    if (skill) {
      renderItem("skillsList", skill);
      document.getElementById("skillInput").value = "";
    }
  }
  
  // Add Education
  function addEducation() {
    const edu = document.getElementById("eduInput").value.trim();
    if (edu) {
      renderItem("educationList", edu);
      document.getElementById("eduInput").value = "";
    }
  }
  
  // Add Certification
  function addCert() {
    const cert = document.getElementById("certInput").value.trim();
    if (cert) {
      renderItem("certList", cert);
      document.getElementById("certInput").value = "";
    }
  }
  
  // Add Social Link
  function addLink() {
    const link = document.getElementById("linkInput").value.trim();
    if (link) {
      renderItem("linkList", link);
      document.getElementById("linkInput").value = "";
    }
  }
  
  // Save All Data to LocalStorage
  function saveData() {
    const data = {
      skills: getListItems("skillsList"),
      education: getListItems("educationList"),
      certifications: getListItems("certList"),
      links: getListItems("linkList"),
    };
  
    localStorage.setItem("resumeData", JSON.stringify(data));
    alert("🎉 Resume data saved!");
  }
  
  function getListItems(listId) {
    return Array.from(document.getElementById(listId).children).map(li => li.textContent);
  }
  