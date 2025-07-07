const backendBaseUrl = "https://file-integrity-backend.azurewebsites.net/api";


async function handleForm(endpoint, fileInputId, resultId) {
  const fileInput = document.getElementById(fileInputId);
  const resultPre = document.getElementById(resultId);
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  resultPre.textContent = "⏳ Processing...";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    resultPre.textContent = JSON.stringify(result, null, 2);
  } catch (err) {
    resultPre.textContent = `❌ Error: ${err.message}`;
  }
}

document.getElementById("upload-form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleForm("/upload", "upload-file", "upload-result");
});

document.getElementById("verify-form").addEventListener("submit", (e) => {
  e.preventDefault();
  handleForm("/verify", "verify-file", "verify-result");
});
