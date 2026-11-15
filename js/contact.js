// Contact form validation
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const fields = ["name", "email", "phone", "message"];

function check(id) {
  const el = document.getElementById(id);
  const value = el.value.trim();
  let msg = "";

  if (value === "") {
    msg = "This field cannot be empty.";
  } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    msg = "Enter a valid email, like name@example.com.";
  } else if (id === "phone" && !/^\d+$/.test(value)) {
    msg = "Phone number must contain digits only.";
  }

  document.getElementById(id + "-error").textContent = msg;
  el.classList.toggle("invalid", msg !== "");
  return msg === "";
}

fields.forEach(id => {
  document.getElementById(id).addEventListener("blur", () => check(id));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = fields.map(check).every(Boolean);
  status.textContent = allValid ? "Thanks! Your message has been sent." : "";
  if (allValid) form.reset();
});