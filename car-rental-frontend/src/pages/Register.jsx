import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    passwordHash: "",
    phone: "",
    licenseNo: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email";
    if (!form.passwordHash) newErrors.passwordHash = "Password is required";
    else if (form.passwordHash.length < 6) newErrors.passwordHash = "Password must be at least 6 characters";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.licenseNo.trim()) newErrors.licenseNo = "License number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleNext = () => {
    if (form.name.trim() && form.email.trim() && validateEmail(form.email)) {
      setFormStep(2);
    } else {
      if (!form.name.trim()) setErrors(prev => ({ ...prev, name: "Name is required" }));
      if (!form.email.trim()) setErrors(prev => ({ ...prev, email: "Email is required" }));
      if (form.email && !validateEmail(form.email)) setErrors(prev => ({ ...prev, email: "Invalid email" }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post("/users/register", {
        ...form,
        role: "customer",
      });

      setLoading(false);
      navigate("/", { state: { message: "Registration successful! 🎉" } });
    } catch (err) {
      setLoading(false);
      setErrors({ submit: err.response?.data?.message || "Registration failed. Please try again." });
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.bgCar}></div>
      <div className={styles.bgCircle1}></div>
      <div className={styles.bgCircle2}></div>

      <div className={styles.registerBox}>
        <div className={styles.header}>
          <h1 className={styles.logo}>RENTX</h1>
          <p className={styles.tagline}>Your Trusted Car Rental Partner</p>
        </div>

        <form onSubmit={handleRegister}>
          {/* Step 1: Personal Information */}
          {formStep === 1 && (
            <div className={styles.formStep}>
              <h2 className={styles.stepTitle}>Create Your Account</h2>
              <p className={styles.stepDescription}>Step 1 of 2 - Personal Details</p>

              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  />
                  <span className={styles.icon}>👤</span>
                </div>
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  />
                  <span className={styles.icon}>✉️</span>
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className={styles.btnNext}
              >
                Next <span>→</span>
              </button>

              <p className={styles.signInText}>
                Already have an account? <a href="/">Sign In</a>
              </p>
            </div>
          )}

          {/* Step 2: Security & Vehicle Information */}
          {formStep === 2 && (
            <div className={styles.formStep}>
              <h2 className={styles.stepTitle}>Secure Your Account</h2>
              <p className={styles.stepDescription}>Step 2 of 2 - Password & License</p>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="password"
                    name="passwordHash"
                    placeholder="••••••••"
                    value={form.passwordHash}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.passwordHash ? styles.inputError : ""}`}
                  />
                  <span className={styles.icon}>🔐</span>
                </div>
                {errors.passwordHash && <span className={styles.errorText}>{errors.passwordHash}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  />
                  <span className={styles.icon}>📱</span>
                </div>
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Driver's License Number</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="licenseNo"
                    placeholder="A123456789"
                    value={form.licenseNo}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.licenseNo ? styles.inputError : ""}`}
                  />
                  <span className={styles.icon}>🎫</span>
                </div>
                {errors.licenseNo && <span className={styles.errorText}>{errors.licenseNo}</span>}
              </div>

              {errors.submit && (
                <div className={styles.alertError}>{errors.submit}</div>
              )}

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setFormStep(1)}
                  className={styles.btnBack}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className={styles.btnRegister}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className={styles.terms}>
          <p>
            By registering, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
