<template>
  <div class="default-layout">
    <div class="app-container">
      <aside class="left-sidebar">
        <div class="user-profile-section">
          <div class="app-header">
            <div class="app-icon">
              <i class="pi pi-car" style="font-size: 2rem; color: #3b82f6"></i>
            </div>
            <h2 class="app-title">SmartCare</h2>
          </div>

          <!-- User Contact Info -->
          <div class="user-contact">
            <label class="contact-label">Phone</label>
            <div class="phone-display">111-333-5566</div>
          </div>

          <!-- User Stats -->
          <div class="user-stats">
            <div class="stat-item">
              <i class="pi pi-star-fill" style="color: #fbbf24"></i>
              <span>4.8 Point</span>
            </div>
            <div class="stat-item">
              <i class="pi pi-car" style="color: #3b82f6"></i>
              <span>126 Trips</span>
            </div>
            <div class="stat-item">
              <i class="pi pi-clock" style="color: #10b981"></i>
              <span>3 Years</span>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="navigation-menu">
            <div class="menu-item">
              <i class="pi pi-wallet"></i>
              <span>Wallet</span>
              <pv-badge value="$29" severity="warning" />
              <i class="pi pi-angle-right"></i>
            </div>
            <div class="menu-item">
              <i class="pi pi-clock"></i>
              <span>History</span>
              <i class="pi pi-angle-right"></i>
            </div>
            <div class="menu-item">
              <i class="pi pi-credit-card"></i>
              <span>Payment</span>
              <i class="pi pi-angle-right"></i>
            </div>
            <div class="menu-item">
              <i class="pi pi-car"></i>
              <span>Become a Driver</span>
              <i class="pi pi-angle-right"></i>
            </div>
            <div class="menu-item">
              <i class="pi pi-cog"></i>
              <span>Settings</span>
              <i class="pi pi-angle-right"></i>
            </div>
            <div class="menu-item">
              <i class="pi pi-user-plus"></i>
              <span>Invite Friends</span>
              <i class="pi pi-angle-right"></i>
            </div>
          </nav>
        </div>
      </aside>

      <!-- Central Content Area -->
      <main class="central-content">
        <!-- Top Bar -->
        <div class="top-bar">
          <div class="saved-places">
            <i class="pi pi-bookmark"></i>
            <span>Saved Places</span>
            <i class="pi pi-angle-right"></i>
          </div>
          <div class="car-icon">
            <i class="pi pi-car"></i>
          </div>
        </div>

        <!-- Map View Placeholder -->
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-content">
              <div class="street-names">
                <div class="street">Mt Prospect Ave</div>
                <div class="street">Brighton Rd</div>
                <div class="street">Van Houten Ave</div>
                <div class="street">Speer Ave</div>
              </div>

              <!-- Pickup Location Marker -->
              <div class="pickup-marker">
                <i class="pi pi-map-marker" style="color: #8b5cf6; font-size: 2rem"></i>
              </div>

              <!-- Route Path -->
              <div class="route-path"></div>

              <!-- Vehicle Icons -->
              <div class="vehicle-1">
                <i class="pi pi-car" style="color: #3b82f6"></i>
              </div>
              <div class="vehicle-2">
                <i class="pi pi-car" style="color: #3b82f6"></i>
                <span class="eta">3 min</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction History Cards -->
        <div class="transaction-cards">
          <div class="transaction-card">
            <div class="card-header">
              <h4>AR Shakir</h4>
              <span class="card-number">**** **** 3561</span>
            </div>
            <div class="card-status paid">Paid</div>
            <div class="card-details">
              <div>Fee: $4.56</div>
              <div>Date: 24 Sep 2020</div>
              <div>Total: $55.00</div>
            </div>
          </div>

          <div class="transaction-card">
            <div class="card-header">
              <h4>AR Shakir</h4>
              <span class="card-number">**** **** 5404</span>
            </div>
            <div class="card-status failed">Failed</div>
            <div class="card-details">
              <div>Fee: $3.51</div>
              <div>Date: 12 Aug 2020</div>
              <div>Total: $125.00</div>
            </div>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - Ride Booking -->
      <aside class="right-sidebar">
        <!-- Arrival Info -->
        <div class="arrival-section">
          <div class="arrival-header">
            <span>Arriving</span>
            <span class="arrival-time">5 min</span>
          </div>

          <!-- Driver Info -->
          <div class="driver-info">
            <pv-avatar image="https://via.placeholder.com/60x60" size="large" shape="circle" />
            <div class="driver-details">
              <h4>Joe Smith</h4>
              <p>Skoda Octavia</p>
            </div>
            <div class="driver-rating">
              <i class="pi pi-star-fill" style="color: #fbbf24"></i>
              <span>4.3</span>
              <div class="license-plate">22 A 228 10</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="action-btn cancel">
              <i class="pi pi-times"></i>
            </button>
            <button class="action-btn chat">
              <i class="pi pi-comments"></i>
            </button>
            <button class="action-btn call">
              <i class="pi pi-phone"></i>
            </button>
          </div>
        </div>

        <!-- Ride Type Selection -->
        <div class="ride-types">
          <div class="ride-type bike">
            <i class="pi pi-car"></i>
            <span>5 nearby</span>
            <span class="price">$5.63</span>
          </div>
          <div class="ride-type standard selected">
            <i class="pi pi-car"></i>
            <span>2 nearby</span>
            <span class="price">$8.92</span>
          </div>
          <div class="ride-type premium">
            <i class="pi pi-crown"></i>
            <span>1 nearby</span>
            <span class="price">$9.46</span>
          </div>
        </div>

        <!-- Ride Summary -->
        <div class="ride-summary">
          <div class="summary-item">
            <i class="pi pi-map-marker"></i>
            <span>3.1 km</span>
          </div>
          <div class="summary-item">
            <i class="pi pi-clock"></i>
            <span>8 min</span>
          </div>
          <div class="summary-item">
            <i class="pi pi-dollar"></i>
            <span>$8.92</span>
          </div>
        </div>

        <!-- Location Inputs -->
        <div class="location-inputs">
          <div class="input-group">
            <label>Pickup point</label>
            <div class="input-field">
              <input type="text" placeholder="Current location" />
              <i class="pi pi-map-marker" style="color: #8b5cf6"></i>
            </div>
          </div>

          <div class="input-group">
            <label>Drop Off</label>
            <div class="input-field">
              <input type="text" placeholder="Where you want to go?" />
            </div>
          </div>
        </div>

        <!-- Saved Places -->
        <div class="saved-places-section">
          <div class="section-header">
            <span>Saved Places</span>
            <i class="pi pi-angle-right"></i>
          </div>

          <div class="saved-place-card">
            <i class="pi pi-building"></i>
            <div class="place-info">
              <h5>Work (10 min, 2.9 km)</h5>
              <p>Studio 08 Jake Stream</p>
            </div>
            <i class="pi pi-pencil"></i>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
// Layout component for the main mobile app interface
</script>

<style scoped>
.default-layout {
  height: 100vh;
  background-color: #f3f4f6;
}

.app-container {
  display: flex;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Left Sidebar */
.left-sidebar {
  width: 25%;
  background: white;
  padding: 2rem 1.5rem;
  border-right: 1px solid #e5e7eb;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-icon {
  margin-bottom: 0.5rem;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.user-contact {
  margin-bottom: 1.5rem;
}

.contact-label {
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.phone-display {
  font-size: 1rem;
  color: #1f2937;
  font-weight: 500;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
}

.stat-item i {
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
}

.navigation-menu {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f9fafb;
}

.menu-item i:first-child {
  margin-right: 0.75rem;
  color: #6b7280;
}

.menu-item span {
  flex: 1;
  color: #374151;
  font-weight: 500;
}

.menu-item i:last-child {
  color: #9ca3af;
}

/* Central Content */
.central-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.saved-places {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  cursor: pointer;
}

.car-icon {
  color: #3b82f6;
  font-size: 1.5rem;
}

.map-container {
  flex: 1;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  position: relative;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
}

.map-content {
  position: relative;
  height: 100%;
  padding: 1rem;
}

.street-names {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #6b7280;
  font-size: 0.75rem;
}

.street {
  margin-bottom: 0.5rem;
}

.pickup-marker {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
}

.route-path {
  position: absolute;
  bottom: 30%;
  left: 50%;
  width: 2px;
  height: 40%;
  background: #8b5cf6;
  transform: translateX(-50%);
}

.vehicle-1 {
  position: absolute;
  bottom: 35%;
  left: 45%;
  font-size: 1.5rem;
}

.vehicle-2 {
  position: absolute;
  top: 20%;
  right: 30%;
  font-size: 1.5rem;
}

.eta {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #374151;
}

.transaction-cards {
  display: flex;
  gap: 1rem;
}

.transaction-card {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.card-header h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
  font-size: 0.875rem;
}

.card-number {
  font-size: 0.75rem;
  color: #6b7280;
}

.card-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0.5rem 0;
}

.card-status.paid {
  background: #fef3c7;
  color: #d97706;
}

.card-status.failed {
  background: #fee2e2;
  color: #dc2626;
}

.card-details {
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

/* Right Sidebar */
.right-sidebar {
  width: 30%;
  background: white;
  padding: 1.5rem;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.arrival-section {
  text-align: center;
}

.arrival-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #1f2937;
}

.arrival-time {
  color: #10b981;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.driver-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.driver-details p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.driver-rating {
  text-align: right;
}

.driver-rating span {
  margin-left: 0.25rem;
  color: #1f2937;
  font-weight: 500;
}

.license-plate {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn.cancel {
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.action-btn.chat {
  background: #f59e0b;
  color: white;
}

.action-btn.call {
  background: #8b5cf6;
  color: white;
}

.ride-types {
  display: flex;
  gap: 0.5rem;
}

.ride-type {
  flex: 1;
  text-align: center;
  padding: 1rem 0.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.ride-type.selected {
  background: #8b5cf6;
  color: white;
  border-color: #8b5cf6;
}

.ride-type i {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.ride-type span {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.price {
  font-weight: 600;
  font-size: 0.875rem;
}

.ride-summary {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
}

.summary-item i {
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.location-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-field {
  position: relative;
}

.input-field input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
}

.input-field i {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.saved-places-section {
  flex: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #1f2937;
}

.saved-place-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.saved-place-card i:first-child {
  color: #6b7280;
  font-size: 1.25rem;
}

.place-info {
  flex: 1;
}

.place-info h5 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
  font-size: 0.875rem;
}

.place-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.75rem;
}

.saved-place-card i:last-child {
  color: #9ca3af;
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    height: auto;
  }

  .left-sidebar,
  .right-sidebar {
    width: 100%;
  }

  .central-content {
    order: -1;
  }
}
</style>
