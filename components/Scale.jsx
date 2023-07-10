/* eslint-disable react/prop-types */
export default function Scale() {
  // decoration with alternating colors
  let stripes_num = [0, 1, 0, 1, 0, 1, 0, 1, 0];
  
  return (
    <div className="score_scale">
      {stripes_num.map((stripe_num, index) =>
        stripe_num > 0 ? (
          <div key={index} className="score_scale_stripe"></div>
        ) : (
          <div key={index} className="score_scale_stripe-dark"></div>
        )
      )}
    </div>
  );
}
