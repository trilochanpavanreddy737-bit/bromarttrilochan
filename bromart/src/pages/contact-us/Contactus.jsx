import "./Contactus.css";

function Contact() {
  document.title = "Bro's-Mart | Contact Us";

  return (
    <div className="contact-page">
      <form className="contact" onSubmit={(e) => e.preventDefault()}>
        <div className="contact-logo">📩</div>
        <h1>Contact Us</h1>
        <p className="contact-sub">Have an issue or question? We're here to help you!</p>
        <input type="text" placeholder="Your Full Name" required />
        <input type="email" placeholder="Your Email Address" required />
        <input type="text" placeholder="Subject" required />
        <textarea placeholder="Describe your issue or message here..." rows={4} required></textarea>
        <button type="submit">Send Message →</button>
        <p className="contact-note">We usually respond within 24 hours.</p>
      </form>
    </div>
  );
}

export default Contact;