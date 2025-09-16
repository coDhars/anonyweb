const namePattern = /^[A-Za-z\s]+$/;
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const popup = document.getElementById("popup");

// Fungsi cek validasi input
function validateInputs() {
  const nama = nameInput.value.trim();
  const pesan = messageInput.value.trim();
  if (nama && pesan && namePattern.test(nama)) {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
}

// Event listener input untuk cek validasi secara real-time
nameInput.addEventListener("input", validateInputs);
messageInput.addEventListener("input", validateInputs);

sendBtn.addEventListener("click", async () => {
  const nama = nameInput.value.trim();
  const pesan = messageInput.value.trim();

  if (!nama || !pesan) {
    alert("Nama dan pesan wajib diisi!");
    return;
  }

  if (!namePattern.test(nama)) {
    alert("Nama hanya boleh huruf dan spasi!");
    return;
  }

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: nama, message: pesan})
    });

    const data = await res.json();

    if(data.status === "success") {
      popup.style.display = "block";
      setTimeout(() => { popup.style.display = "none"; }, 2000);
      messageInput.value = "";
      validateInputs(); // reset tombol disable
    } else {
      alert(data.message);
    }
  } catch(err) {
    alert("Terjadi error, pesan tidak terkirim.");
    console.error(err);
  }
});