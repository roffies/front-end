<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-form-panel">
        <div class="form-container">
          <div class="auth-header">
            <div class="app-icon">
              <i class="pi pi-user" style="color: #8b5cf6; font-size: 1.5rem"></i>
            </div>
            <h1 class="app-title">SmartCare</h1>
          </div>

          <div class="welcome-section">
            <h2 class="welcome-title">Hola, Welcome Back</h2>
            <p class="welcome-subtitle">Hey, welcome back to your special place</p>
          </div>

          <div class="form-content">
            <slot name="form"></slot>
          </div>

          <div class="auth-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>

      <div class="illustration-panel">
        <div class="illustration-container">
          <div class="background-gradient">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>
            <div class="cloud cloud-4"></div>
            <div class="cloud cloud-5"></div>
          </div>

          <div class="character">
            <div class="character-body">
              <div class="jacket"></div>
              <div class="pants"></div>
              <div class="shoes"></div>
              <div class="bag"></div>
            </div>
          </div>

          <div class="smartphone">
            <div class="phone-screen">
              <div class="fingerprint-interface">
                <div class="fingerprint-icon">
                  <i class="pi pi-circle-fill" style="color: #8b5cf6; font-size: 3rem"></i>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <p class="instruction-text">Please tap your finger to your phone</p>
              </div>

              <div class="phone-icons">
                <i class="pi pi-sun" style="color: #fbbf24"></i>
                <i class="pi pi-bars" style="color: #6b7280"></i>
              </div>
            </div>
          </div>

          <div class="finger-touch">
            <div class="finger"></div>
          </div>

          <div class="success-bubble">
            <i class="pi pi-check" style="color: #8b5cf6; font-size: 1.5rem"></i>
          </div>

          <div class="security-lock">
            <i class="pi pi-lock" style="color: white; font-size: 3rem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.auth-form-panel {
  flex: 1;
  background: white;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #8b5cf6;
  margin: 0;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.form-content {
  margin-bottom: 2rem;
}

.auth-footer {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.illustration-panel {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.illustration-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.cloud {
  position: absolute;
  background: white;
  border-radius: 50px;
  opacity: 0.8;
}

.cloud:before {
  content: '';
  position: absolute;
  background: white;
  border-radius: 50px;
}

.cloud:after {
  content: '';
  position: absolute;
  background: white;
  border-radius: 50px;
}

.cloud-1 {
  width: 80px;
  height: 20px;
  top: 20%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.cloud-1:before {
  width: 50px;
  height: 50px;
  top: -25px;
  left: 10px;
}

.cloud-1:after {
  width: 60px;
  height: 40px;
  top: -15px;
  right: 10px;
}

.cloud-2 {
  width: 60px;
  height: 15px;
  top: 15%;
  right: 20%;
  animation: float 8s ease-in-out infinite reverse;
}

.cloud-2:before {
  width: 40px;
  height: 40px;
  top: -20px;
  left: 5px;
}

.cloud-2:after {
  width: 50px;
  height: 30px;
  top: -10px;
  right: 5px;
}

.cloud-3 {
  width: 100px;
  height: 25px;
  bottom: 30%;
  left: 5%;
  animation: float 7s ease-in-out infinite;
}

.cloud-3:before {
  width: 60px;
  height: 60px;
  top: -30px;
  left: 15px;
}

.cloud-3:after {
  width: 70px;
  height: 50px;
  top: -20px;
  right: 15px;
}

.cloud-4 {
  width: 70px;
  height: 18px;
  bottom: 20%;
  right: 15%;
  animation: float 9s ease-in-out infinite reverse;
}

.cloud-4:before {
  width: 45px;
  height: 45px;
  top: -22px;
  left: 8px;
}

.cloud-4:after {
  width: 55px;
  height: 35px;
  top: -12px;
  right: 8px;
}

.cloud-5 {
  width: 50px;
  height: 12px;
  top: 60%;
  left: 70%;
  animation: float 5s ease-in-out infinite;
}

.cloud-5:before {
  width: 30px;
  height: 30px;
  top: -15px;
  left: 5px;
}

.cloud-5:after {
  width: 40px;
  height: 25px;
  top: -8px;
  right: 5px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.character {
  position: absolute;
  z-index: 10;
  animation: characterFloat 4s ease-in-out infinite;
}

.character-body {
  position: relative;
  width: 80px;
  height: 120px;
}

.jacket {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 80px;
  background: #fbbf24;
  border-radius: 30px 30px 15px 15px;
}

.pants {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 40px;
  background: white;
  border-radius: 0 0 25px 25px;
}

.shoes {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 55px;
  height: 15px;
  background: #1f2937;
  border-radius: 0 0 8px 8px;
}

.bag {
  position: absolute;
  top: 20px;
  right: -15px;
  width: 20px;
  height: 30px;
  background: #1f2937;
  border-radius: 5px;
}

@keyframes characterFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.smartphone {
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%) rotate(-15deg);
  width: 120px;
  height: 200px;
  background: #1f2937;
  border-radius: 20px;
  z-index: 5;
  animation: phoneFloat 3s ease-in-out infinite;
}

.phone-screen {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: #8b5cf6;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.fingerprint-interface {
  text-align: center;
  color: white;
}

.fingerprint-icon {
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.progress-bar {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 1rem 0;
  overflow: hidden;
}

.progress-fill {
  width: 60%;
  height: 100%;
  background: white;
  border-radius: 2px;
  animation: progress 3s ease-in-out infinite;
}

.instruction-text {
  font-size: 0.75rem;
  margin: 0;
  opacity: 0.9;
}

.phone-icons {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

@keyframes phoneFloat {
  0%,
  100% {
    transform: translateY(-50%) rotate(-15deg);
  }
  50% {
    transform: translateY(-60px) rotate(-15deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 60%;
  }
  100% {
    width: 100%;
  }
}

.finger-touch {
  position: absolute;
  right: 25%;
  top: 45%;
  z-index: 15;
  animation: fingerTouch 2s ease-in-out infinite;
}

.finger {
  width: 20px;
  height: 30px;
  background: #fbbf24;
  border-radius: 10px 10px 5px 5px;
  position: relative;
}

.finger:before {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #1f2937;
  border-radius: 50%;
}

@keyframes fingerTouch {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

.success-bubble {
  position: absolute;
  left: 15%;
  top: 30%;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12;
  animation: bubbleFloat 3s ease-in-out infinite;
}

@keyframes bubbleFloat {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

.security-lock {
  position: absolute;
  right: 10%;
  bottom: 20%;
  z-index: 8;
  animation: lockFloat 5s ease-in-out infinite;
}

@keyframes lockFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    min-height: auto;
  }

  .auth-form-panel {
    padding: 2rem;
  }

  .illustration-panel {
    min-height: 300px;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .smartphone {
    width: 80px;
    height: 140px;
    right: 10%;
  }

  .character {
    transform: scale(0.8);
  }
}

@media (max-width: 480px) {
  .auth-layout {
    padding: 1rem;
  }

  .auth-form-panel {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 1.25rem;
  }

  .illustration-panel {
    min-height: 200px;
  }
}
</style>
