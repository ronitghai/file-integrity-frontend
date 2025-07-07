const backendBaseUrl = "https://file-integrity-backend.azurewebsites.net/api";

// Handle Upload
document.getElementById("uploadForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const fileInput = document.getElementById("uploadFile");
  const status = document.getElementById("uploadStatus");

  if (!fileInput.files.length) {
    status.textContent = "❌ Please select a file to upload.";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch(`${backendBaseUrl}/uploadFile`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      status.innerHTML = `✅ <strong>File uploaded successfully!</strong><br>SHA256 Hash: <code>${result.hash}</code>`;
    } else {
      status.textContent = `❌ Upload failed: ${result.message || response.statusText}`;
    }
  } catch (error) {
    status.textContent = `❌ Upload error: ${error.message}`;
  }
});

// Handle Verify
document.getElementById("verifyForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const fileInput = document.getElementById("verifyFile");
  const status = document.getElementById("verifyStatus");

  if (!fileInput.files.length) {
    status.textContent = "❌ Please select a file to verify.";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch(`${backendBaseUrl}/verifyFile`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.valid) {
      status.innerHTML = `✅ <strong>File is valid!</strong><br>Expected & Got Hash: <code>${result.expected}</code>`;
    } else if (response.ok && !result.valid) {
      status.innerHTML = `❌ <strong>File does NOT match!</strong><br>Expected: <code>${result.expected}</code><br>Got: <code>${result.got}</code>`;
    } else {
      status.textContent = `❌ Verification failed: ${result.message || response.statusText}`;
    }
  } catch (error) {
    status.textContent = `❌ Verification error: ${error.message}`;
  }
});
