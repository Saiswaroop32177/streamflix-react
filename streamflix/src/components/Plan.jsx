const plans = [
  {
    name: "Basic", price: 149,
    features: ["1 Device", "HD Quality", "Unlimited Movies & Shows"],
  },
  {
    name: "Standard", price: 299, popular: true,
    features: ["2 Devices", "Full HD Quality", "Download & Watch Offline"],
  },
  {
    name: "Premium", price: 499,
    features: ["4 Devices", "4K + HDR Quality", "Spatial Audio & Priority Support"],
  },
];

export default function Plans({ onBuy }) {
  return (
    <section id="plans" className="plans-section">
      <h2><i className="fas fa-credit-card"></i> Choose Your Plan</h2>
      <p className="plans-subtitle">Flexible plans. Cancel anytime.</p>
      <div className="plans">
        {plans.map((p) => (
          <div key={p.name} className={`plan ${p.popular ? "popular" : ""}`}>
            {p.popular && <div className="badge">MOST POPULAR</div>}
            <h3>{p.name.toUpperCase()}</h3>
            <div className="price">₹{p.price} <small>/month</small></div>
            <ul>
              {p.features.map((f) => (
                <li key={f}><i className="fas fa-check"></i> {f}</li>
              ))}
            </ul>
            <button onClick={() => onBuy(p.name, p.price)}>Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
}