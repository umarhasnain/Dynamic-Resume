window.onload = function () {
    let storedData = localStorage.getItem("cvData");

    if (storedData) {
        let data = JSON.parse(storedData);

        // Personal Info
        document.getElementById("resumeName").innerText = data.name || "";
        document.getElementById("resumeName1").innerText = data.name || "";
        document.getElementById("resumeNumber").innerText = data.number || "";
        document.getElementById("resumeEmail").innerText = data.email || "";
        document.getElementById("resumeIntro").innerText = data.intro || "";

        // Education
        document.getElementById("resumeEdu").innerText = data.edu1 || "";
        document.getElementById("resumeEdu2").innerText = data.edu2 || "";
        document.getElementById("resumeEdu3").innerText = data.edu3 || "";

        // Experience
        document.getElementById("resumeExp1").innerText = data.exp1 || "";
        document.getElementById("resumeExp2").innerText = data.exp2 || "";
        document.getElementById("resumeExp3").innerText = data.exp3 || "";

        // Skills
        let skillElements = ["resumeSkill1", "resumeSkill2", "resumeSkill3", "resumeSkill4", "resumeSkill5", "resumeSkill6"];
        data.skills?.forEach((skill, index) => {
            if (skillElements[index]) {
                document.getElementById(skillElements[index]).innerText = skill || "";
            }
        });

        // Certifications
        let certElements = ["firstCer", "secondCer", "thirdCer", "forthCer", "fifthCer"];
        data.certifications?.forEach((cert, index) => {
            if (certElements[index]) {
                document.getElementById(certElements[index]).innerText = cert || "";
            }
        });

        // Social Links
        let linkElements = ["resumeLink1", "resumeLink2", "resumeLink3"];
        data.links?.forEach((link, index) => {
            if (linkElements[index]) {
                document.getElementById(linkElements[index]).innerText = link || "";
            }
        });

        // ✅ Fix Image Handling: Use the profile image if valid; otherwise, fallback to default.
        if (data.profileImage && !data.profileImage.startsWith("blob:")) {
            document.getElementById("resumeImage").src = data.profileImage || "/images/cv-logo.png";
        } else {
            document.getElementById("resumeImage").src = "/images/cv-logo.png";
        }
    }
};

// ✅ Add Download Buttons for PDF and Word when DOM is loaded.
document.addEventListener("DOMContentLoaded", function () {
    // PDF Download Button
    let downloadPdfBtn = document.createElement("button");
    downloadPdfBtn.innerText = "Download PDF";
    downloadPdfBtn.style = "position: fixed; top: 10px; right: 10px; padding: 10px; background: blue; color: white; border: none; cursor: pointer;";
    document.body.appendChild(downloadPdfBtn);
    downloadPdfBtn.addEventListener("click", function () {
        generatePDF();
    });

    // Word Download Button
    let downloadWordBtn = document.createElement("button");
    downloadWordBtn.innerText = "Download Word";
    downloadWordBtn.style = "position: fixed; top: 80px; right: 10px; padding: 10px; background: green; color: white; border: none; cursor: pointer;";
    document.body.appendChild(downloadWordBtn);
    downloadWordBtn.addEventListener("click", function () {
        generateWord();
    });
});

// ✅ Generate A4 PDF using html2canvas and jsPDF.
function generatePDF() {
    let cvElement = document.querySelector(".parent_container");

    html2canvas(cvElement, {
        scale: 3, // High-quality output
        useCORS: true
    }).then(canvas => {
        const { jsPDF } = window.jspdf; // Ensure jsPDF is loaded

        let pdf = new jsPDF("p", "mm", "a4");
        let imgWidth = 210; // A4 width in mm
        let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        if (imgHeight > 297) {  // If content is taller than one A4 page, add pages
            let pageHeight = 297;
            let heightLeft = imgHeight;
            let position = 0;

            while (heightLeft > 0) {
                pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                position -= 297;
                if (heightLeft > 0) {
                    pdf.addPage();
                }
            }
        } else {
            pdf.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight);
        }

        pdf.save("Professional_Resume.pdf");
    }).catch(err => console.error("PDF Generation Error:", err));
}

