module.exports = (email) => {
  return `
  <div style="margin:0;padding:20;background:#ffffff;font-family:Arial,sans-serif;">

    <!-- Outer Container -->
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.2);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#ff9800,#ff5722);padding:30px;text-align:center;color:#fff;">
        <h1 style="margin:0;font-size:28px;">✨ Diwali Special Offer ✨</h1>
        <p style="margin-top:8px;font-size:14px;">Celebrate the Festival of Lights with Exclusive Deals</p>
      </div>

      <!-- Body -->
      <div style="padding:30px;color:#333;">

        <h2 style="margin-top:0;color:#ff5722;">Hello ${email},</h2>

        <p style="font-size:15px;line-height:1.6;">
          This Diwali, we bring you amazing travel discounts and exclusive holiday packages.
          Light up your journey with unforgettable experiences 🌍✈️
        </p>

        <!-- Offer Box -->
        <div style="background:#fff7e6;border:1px solid #ffd699;padding:20px;border-radius:12px;margin:20px 0;">
          <h3 style="margin:0;color:#e65100;">🔥 Flat 40% OFF on All Tour Packages</h3>
          <p style="margin-top:8px;font-size:14px;">
            Limited time offer for Diwali season. Book now and save big!
          </p>
        </div>

        <!-- CTA Button -->
        <div style="text-align:center;margin:30px 0;">
          <a href="https://your-website.com"
             style="background:linear-gradient(135deg,#ff9800,#ff5722);
             color:#fff;padding:14px 26px;border-radius:30px;
             text-decoration:none;font-weight:bold;display:inline-block;">
            🎁 Book Your Offer Now
          </a>
        </div>

        <p style="font-size:13px;color:#777;line-height:1.5;">
          Hurry! Offers are valid for a limited time only. Don’t miss your chance to travel at the best prices.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#f5f5f5;padding:15px;text-align:center;font-size:12px;color:#777;">
        © 2026 Travel Agency | Happy Diwali 🪔
      </div>

    </div>
  </div>
  `;
};