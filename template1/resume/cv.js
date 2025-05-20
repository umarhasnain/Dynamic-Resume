// Sample data, aap apne localStorage se ise parse kar sakte hain
const data = JSON.parse(localStorage.getItem('resumeData'));


// Set profile image
document.getElementById('resumeImage').src = data.profilePic;

// Set full name
document.getElementById('resumeName').textContent = data.fullName;
document.getElementById('resumeName1').textContent = data.fullName;

// Set contact info
document.getElementById('resumeNumber').textContent = data.phone;
document.getElementById('resumeEmail').textContent = data.email;

// Set career objective / summary
document.getElementById('resumeIntro').textContent = data.summary;

// Set certifications (first 5 only)
const certIds = ['firstCer', 'secondCer', 'thirdCer', 'forthCer', 'fifthCer'];
certIds.forEach((id, i) => {
  document.getElementById(id).textContent = data.certifications[i] || '';
});

// Set social links (phone, linkedin, email) with icons
document.getElementById('resumeLink1').innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i> ${data.phone}`;
document.getElementById('resumeLink2').innerHTML = `<i class="fa fa-linkedin-square" aria-hidden="true"></i> <a href="${data.linkedin}" target="_blank" style="color: white;">LinkedIn</a>`;
document.getElementById('resumeLink3').innerHTML = `<i class="fa fa-envelope" aria-hidden="true"></i> ${data.email}`;

// Set Education (first 3 entries)
document.getElementById('resumeEdu').innerHTML = `<b>${data.education[0]?.degree || ''}:</b><br/>${data.education[0]?.university || ''}, ${data.education[0]?.years || ''}`;
document.getElementById('resumeEdu2').textContent = data.education[1] ? `${data.education[1].degree}, ${data.education[1].university}, ${data.education[1].years}` : '';
document.getElementById('resumeEdu3').textContent = data.education[2] ? `${data.education[2].degree}, ${data.education[2].university}, ${data.education[2].years}` : '';

// Set Experience (first 3 entries)
document.getElementById('resumeExp1').textContent = `${data.experience[0]?.jobTitle} at ${data.experience[0]?.company} (${data.experience[0]?.duration}) - ${data.experience[0]?.jobDesc}`;
document.getElementById('resumeExp2').textContent = data.experience[1] ? `${data.experience[1].jobTitle} at ${data.experience[1].company} (${data.experience[1].duration}) - ${data.experience[1].jobDesc}` : '';
document.getElementById('resumeExp3').textContent = data.experience[2] ? `${data.experience[2].jobTitle} at ${data.experience[2].company} (${data.experience[2].duration}) - ${data.experience[2].jobDesc}` : '';

// Set Skills (top 6 software skills)
const skillIds = ['resumeSkill1', 'resumeSkill2', 'resumeSkill3', 'resumeSkill4', 'resumeSkill5', 'resumeSkill6'];
skillIds.forEach((id, i) => {
  document.getElementById(id).textContent = data.software[i] || '';
  
});

 document.getElementById("downloadPdfBtn").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const resume = document.querySelector(".parent_container");

    html2canvas(resume, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    });
  });
