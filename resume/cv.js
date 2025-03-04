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

// ✅ Generate Word Document with inline images (converted to base64).
function generateWord() {
    let cvElement = document.querySelector(".parent_container");
    // Clone the resume container to avoid modifying the live DOM.
    let clonedElement = cvElement.cloneNode(true);
    
    // Find all images within the cloned content and convert them to base64 if needed.
    let imgElements = clonedElement.querySelectorAll("img");
    let promises = [];
    
    imgElements.forEach(img => {
        if (!img.src.startsWith("data:")) {
            promises.push(new Promise((resolve) => {
                let image = new Image();
                image.crossOrigin = "anonymous";
                image.src = img.src;
                image.onload = function () {
                    let canvas = document.createElement("canvas");
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0);
                    let dataURL = canvas.toDataURL("image/png");
                    img.src = dataURL;
                    resolve();
                };
                image.onerror = function () {
                    // If conversion fails, leave the src unchanged.
                    resolve();
                };
            }));
        }
    });
    
    Promise.all(promises).then(() => {
        let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                     "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                     "xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export Resume to Word</title></head><body>";
        let footer = "</body></html>";
        let sourceHTML = header + clonedElement.innerHTML + footer;
        
        let blob = new Blob(['\ufeff', sourceHTML], {
            type: 'application/msword'
        });
        let url = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "Professional_Resume.doc";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}
