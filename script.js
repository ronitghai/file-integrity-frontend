const backendBaseUrl = "https://file-integrity-backend.azurewebsites.net/api";

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const verifyForm = document.getElementById("verifyForm");

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("uploadFile");
    const resultBox = document.getElementById("upload-result");
    resultBox.textContent = "Uploading...";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch(`${backendBaseUrl}/uploadFile`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      resultBox.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      resultBox.textContent = `❌ Upload failed: ${err.message}`;
    }
  });

  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("verifyFile");
    const resultBox = document.getElementById("verify-result");
    resultBox.textContent = "Verifying...";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch(`${backendBaseUrl}/verifyFile`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.valid) {
        resultBox.textContent = `✅ File is valid!\nExpected: ${data.expected}\nGot: ${data.got}`;
      } else {
        resultBox.textContent = `❌ Invalid file!\nExpected: ${data.expected}\nGot: ${data.got}`;
      }
    } catch (err) {
      resultBox.textContent = `❌ Verification failed: ${err.message}`;
    }
  });
});
