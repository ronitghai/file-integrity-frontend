const backendBaseUrl = "https://file-integrity-backend.azurewebsites.net/api";


// Upload File
fetch(`${backendBaseUrl}/uploadFile`, {
  method: "POST",
  body: formData,
})
.then(response => response.json())
.then(data => {
  console.log("Upload Success:", data);
})
.catch(error => {
  console.error("Upload Error:", error);
});

// Verify File
fetch(`${backendBaseUrl}/verifyFile`, {
  method: "POST",
  body: formData,
})
.then(response => response.json())
.then(data => {
  console.log("Verify Success:", data);
})
.catch(error => {
  console.error("Verify Error:", error);
});