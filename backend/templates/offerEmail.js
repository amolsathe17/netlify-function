const offerEmailTemplate = (email) => {
  return `
  <div style="font-family:Arial; background:#f4f4f4; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden;">

      <!-- IMAGE -->
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
           style="width:100%; height:250px; object-fit:cover;" />

      <!-- CONTENT -->
      <div style="padding:20px; text-align:center;">
        
        <h1 style="color:#0ea5e9;">🔥 Special Travel Offer!</h1>

        <p>Hi Traveler 👋</p>

        <p>Limited time offer — grab your dream vacation now!</p>

        <h2 style="color:#ef4444;">50% OFF on Goa Trips 🏝️</h2>

        <p>Hurry! Offer valid till this weekend only.</p>

        <a href="https://yourwebsite.com"
           style="background:#0ea5e9; color:white; padding:12px 25px;
                  text-decoration:none; border-radius:6px; display:inline-block; margin-top:15px;">
          Book Now ✈️
        </a>

      </div>

      <!-- FOOTER -->
      <div style="text-align:center; font-size:12px; color:#888; padding:10px;">
        <p>You are receiving this because you subscribed.</p>
        <p>© 2026 Travel Website</p>
      </div>

    </div>

  </div>
  `;
};

module.exports = offerEmailTemplate;